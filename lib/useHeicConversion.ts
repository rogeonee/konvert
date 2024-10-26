import { useState, useCallback } from 'react';
import decode from 'heic-decode';
import * as zip from '@zip.js/zip.js';

interface ConvertedFile {
  blob: Blob;
  originalName: string;
  format: string;
}

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

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
      setProgress(10);

      try {
        const arrayBuffer = await file.arrayBuffer();
        setProgress(15);

        const { width, height, data } = await decode({
          buffer: new Uint8Array(arrayBuffer),
        });
        setProgress(65);

        const canvas = createCanvasFromHeicData(width, height, data);
        setProgress(75);

        const blob = await createBlobFromCanvas(canvas, format, quality);
        setProgress(100);

        const newFile = {
          blob,
          originalName: file.name,
          format: format === 'jpg' ? 'jpeg' : format,
        };

        setConvertedFiles((prev) => {
          const newFiles = [...prev, newFile];
          if (newFiles.length > 3) {
            void createZipFile(newFiles);
          }

          return newFiles;
        });
      } catch (error) {
        console.error('Conversion failed:', error);
        throw error;
      } finally {
        setIsConverting(false);
        setProgress(0);
      }
    },
    [createCanvasFromHeicData, createBlobFromCanvas, createZipFile],
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
        // remove zip if it is less than 4 converted
        if (newFiles.length <= 3) {
          setZipBlob(null);
        } else {
          // recreate zip without deleted files (flow to be improved)
          void createZipFile(newFiles);
        }

        return newFiles;
      });
    },
    [createZipFile],
  );

  const clearConvertedFiles = useCallback(() => {
    setConvertedFiles([]);
    setZipBlob(null);
  }, []);

  return {
    convertHeicToFormat,
    downloadFile,
    downloadAll,
    removeConvertedFile,
    clearConvertedFiles,
    createZipFile,
    isConverting,
    progress,
    convertedFiles,
  };
};
