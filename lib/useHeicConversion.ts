import { useState, useCallback } from 'react';
import decode from 'heic-decode';
import * as zip from '@zip.js/zip.js';

interface ConvertedFile {
  blob: Blob;
  originalName: string;
  format: string;
}

interface FileProgress {
  [filename: string]: number;
}

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progressMap, setProgressMap] = useState<FileProgress>({});
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const updateProgress = useCallback((filename: string, progress: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [filename]: progress,
    }));
  }, []);

  // create canvas context
  const createCanvasFromHeicData = useCallback(
    (width: number, height: number, data: ArrayBuffer) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const imageData = new ImageData(
        new Uint8ClampedArray(data),
        width,
        height,
      );
      ctx.putImageData(imageData, 0, 0);

      return canvas;
    },
    [],
  );

  // create blob from canvas
  const createBlobFromCanvas = useCallback(
    async (
      canvas: HTMLCanvasElement,
      format: string,
      quality: number,
    ): Promise<Blob> => {
      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          mimeType,
          quality,
        );
      });
    },
    [],
  );

  // create zip
  const createZipFile = useCallback(
    async (files: ConvertedFile[]): Promise<Blob> => {
      const zipWriter = new zip.ZipWriter(
        new zip.BlobWriter('application/zip'),
      );

      try {
        await Promise.all(
          files.map(async (file) => {
            const filename = `${file.originalName.split('.')[0]}.${
              file.format
            }`;
            await zipWriter.add(filename, new zip.BlobReader(file.blob));
          }),
        );

        const blob = await zipWriter.close();
        setZipBlob(blob);

        return blob;
      } catch (error) {
        console.error('Error creating zip file:', error);
        throw error;
      }
    },
    [],
  );

  // main conversion flow function
  const convertHeicToFormat = useCallback(
    async (file: File, format: string, quality: number): Promise<void> => {
      setIsConverting(true);
      updateProgress(file.name, 5);

      try {
        const arrayBuffer = await file.arrayBuffer();
        updateProgress(file.name, 20);

        const { width, height, data } = await decode({
          buffer: new Uint8Array(arrayBuffer),
        });
        updateProgress(file.name, 50);

        const canvas = createCanvasFromHeicData(width, height, data);
        updateProgress(file.name, 70);

        const blob = await createBlobFromCanvas(canvas, format, quality);
        updateProgress(file.name, 75);

        const newFile = {
          blob,
          originalName: file.name,
          format: format === 'jpg' ? 'jpeg' : format,
        };
        updateProgress(file.name, 80);

        setConvertedFiles((prev) => {
          const newFiles = [...prev, newFile];
          if (newFiles.length > 3) {
            void createZipFile(newFiles);
          }

          return newFiles;
        });
        updateProgress(file.name, 90);
      } catch (error) {
        console.error('Conversion failed:', error);
        throw error;
      } finally {
        setIsConverting(false);
        updateProgress(file.name, 100);
      }
    },
    [
      createCanvasFromHeicData,
      createBlobFromCanvas,
      createZipFile,
      updateProgress,
    ],
  );

  const downloadFile = useCallback((file: ConvertedFile) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${file.originalName.split('.')[0]}.${file.format}`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadAll = useCallback(async () => {
    // for more than 3 converted files, create a zip
    if (convertedFiles.length > 3) {
      const blob = zipBlob || (await createZipFile(convertedFiles));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'converted_images.zip';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // for 3 or less, download individually
      convertedFiles.forEach(downloadFile);
    }
  }, [convertedFiles, zipBlob, createZipFile, downloadFile]);

  const removeConvertedFile = useCallback(
    (filename: string) => {
      setConvertedFiles((prev) => {
        const newFiles = prev.filter((file) => file.originalName !== filename);

        if (newFiles.length <= 3) {
          setZipBlob(null);
        } else {
          void createZipFile(newFiles);
        }

        return newFiles;
      });

      // Clean up progress for removed file
      setProgressMap((prev) => {
        const newMap = { ...prev };
        delete newMap[filename];
        return newMap;
      });
    },
    [createZipFile],
  );

  const clearConvertedFiles = useCallback(() => {
    setConvertedFiles([]);
    setZipBlob(null);
    setProgressMap({});
  }, []);

  return {
    convertHeicToFormat,
    downloadFile,
    downloadAll,
    removeConvertedFile,
    clearConvertedFiles,
    createZipFile,
    isConverting,
    progressMap,
    convertedFiles,
  };
};
