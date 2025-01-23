import { useState, useCallback, useEffect } from 'react';
import * as zip from '@zip.js/zip.js';

interface ConvertedFile {
  blob: Blob;
  originalName: string;
  format: string;
}

interface FileProgress {
  [filename: string]: number;
}

export const useWebpConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progressMap, setProgressMap] = useState<FileProgress>({});
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [activeConversions, setActiveConversions] = useState(0);

  const updateProgress = useCallback((filename: string, progress: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [filename]: progress,
    }));
  }, []);

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
        return await zipWriter.close();
      } catch (error) {
        console.error('Error creating zip file:', error);
        throw error;
      }
    },
    [],
  );

  useEffect(() => {
    setIsConverting(activeConversions > 0);
  }, [activeConversions]);

  const artificialDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const convertWebpToFormat = useCallback(
    async (file: File, format: string, quality: number): Promise<void> => {
      setActiveConversions((count) => count + 1);
      try {
        updateProgress(file.name, 0);

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context not available');
          }

          ctx.drawImage(img, 0, 0);

          await artificialDelay(500);

          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), `image/${format}`, quality);
          });

          if (!blob) {
            throw new Error('Failed to convert image');
          }

          setConvertedFiles((prev) => [
            ...prev,
            {
              blob,
              originalName: file.name,
              format,
            },
          ]);
        };

        img.onerror = () => {
          throw new Error('Failed to load image');
        };

        img.src = URL.createObjectURL(file);
      } catch (error) {
        console.error('Error during conversion:', error);
      } finally {
        setActiveConversions((count) => Math.max(0, count - 1));
        updateProgress(file.name, 100);
      }
    },
    [updateProgress],
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
    if (convertedFiles.length > 3) {
      const blob = await createZipFile(convertedFiles);
      setZipBlob(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_images.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      convertedFiles.forEach(downloadFile);
    }
  }, [convertedFiles, createZipFile, downloadFile]);

  const removeConvertedFile = useCallback((filename: string) => {
    setConvertedFiles((prev) =>
      prev.filter((file) => file.originalName !== filename),
    );
    setProgressMap((prev) => {
      const newMap = { ...prev };
      delete newMap[filename];
      return newMap;
    });
  }, []);

  const clearConvertedFiles = useCallback(() => {
    setConvertedFiles([]);
    setZipBlob(null);
    setProgressMap({});
    setActiveConversions(0);
  }, []);

  return {
    convertWebpToFormat,
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
