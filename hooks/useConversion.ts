import { useState, useCallback, useRef, useEffect } from 'react';
import * as zip from '@zip.js/zip.js';

interface ConvertedFile {
  blob: Blob;
  originalName: string;
  format: string;
}

interface FileProgress {
  [filename: string]: number;
}

type SetupWorkerFn = () => Worker | null;

export const useImageConversion = (setupWorker: SetupWorkerFn) => {
  const [isConverting, setIsConverting] = useState(false);
  const [progressMap, setProgressMap] = useState<FileProgress>({});
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [activeConversions, setActiveConversions] = useState(0);

  // Reference to the single Worker instance
  const workerRef = useRef<Worker | null>(null);

  // Initialize Worker if not already
  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      const worker = setupWorker();
      if (worker) {
        workerRef.current = worker;
      }
    }
  }, [setupWorker]);

  // Initialize worker on mount
  useEffect(() => {
    initWorker();
  }, [initWorker]);

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

  // Reflect if "isConverting" is true whenever there's an active conversion
  useEffect(() => {
    setIsConverting(activeConversions > 0);
  }, [activeConversions]);

  // Listen to worker messages
  useEffect(() => {
    if (!workerRef.current) return;

    const handleWorkerMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'progress') {
        const { id, progress } = data;
        updateProgress(id, progress);
      } else if (data.type === 'result') {
        // Decrement the active conversions counter
        setActiveConversions((count) => Math.max(0, count - 1));

        // Store the newly converted file
        const { blob, format, filename } = data;
        setConvertedFiles((prev) => [
          ...prev,
          {
            blob,
            originalName: filename,
            format,
          },
        ]);
      }
    };

    workerRef.current.addEventListener('message', handleWorkerMessage);

    return () => {
      if (workerRef.current) {
        workerRef.current.removeEventListener('message', handleWorkerMessage);
      }
    };
  }, [updateProgress]);

  // Main conversion function
  const convertToFormat = useCallback(
    async (file: File, format: string, quality: number) => {
      setActiveConversions((count) => count + 1);
      try {
        initWorker();
        if (!workerRef.current) {
          setActiveConversions((count) => Math.max(0, count - 1));
          return;
        }

        // Reset progress for this file
        updateProgress(file.name, 0);

        const fileBuffer = await file.arrayBuffer();
        const typedArray = new Uint8Array(fileBuffer);

        workerRef.current.postMessage(
          {
            id: file.name,
            fileBuffer: typedArray,
            filename: file.name,
            format,
            quality,
          },
          [typedArray.buffer],
        );
      } catch (error) {
        console.error('Error during conversion:', error);
        setActiveConversions((count) => Math.max(0, count - 1));
      }
    },
    [initWorker, updateProgress],
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
    convertToFormat,
    downloadFile,
    downloadAll,
    removeConvertedFile,
    clearConvertedFiles,
    createZipFile,
    isConverting,
    progressMap,
    convertedFiles,
    zipBlob,
  };
};
