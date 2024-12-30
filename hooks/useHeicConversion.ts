import { useState, useCallback, useRef, useEffect } from 'react';
import * as zip from '@zip.js/zip.js';
import { setupWorker } from '@/lib/worker-setup';

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
  const [activeConversions, setActiveConversions] = useState(0);

  // Store the single worker instance in a ref.
  const workerRef = useRef<Worker | null>(null);

  const progressRef = useRef<FileProgress>({});
  const progressUpdateTimer = useRef<NodeJS.Timeout | null>(null);

  // Update progress for a single file
  const updateProgress = useCallback((filename: string, progress: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [filename]: progress,
    }));
  }, []);

  // 1) Initialize Worker if not already
  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      const worker = setupWorker();
      if (!worker) return; // SSR or no window

      workerRef.current = worker;
    }
  }, []);

  // Create a ZIP file from multiple converted Blobs
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

  // Initialize worker on mount
  useEffect(() => {
    initWorker();
  }, [initWorker]);

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
        // Decrement active conversions
        setActiveConversions((count) => Math.max(0, count - 1));

        // Store this newly converted file
        const { id, blob, format, filename } = data;
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
  const convertHeicToFormat = useCallback(
    async (file: File, format: string, quality: number): Promise<void> => {
      setActiveConversions((count) => count + 1);
      // setIsConverting(true);
      try {
        // Make sure worker is initialized
        initWorker();
        if (!workerRef.current) {
          setActiveConversions((count) => Math.max(0, count - 1));
          return;
        }

        // Reset progress to 0 for this file
        updateProgress(file.name, 0);

        // 1) Read file as ArrayBuffer
        const fileBuffer = await file.arrayBuffer();
        // 2) Wrap in a Uint8Array so that decode sees typed data
        const typedArray = new Uint8Array(fileBuffer);

        // Post to worker (transfer typedArray.buffer)
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
        // setIsConverting(false);
      }

      // setIsConverting(false);
    },
    [initWorker, updateProgress],
  );

  // Download a single file
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

  // Download all converted files, or zip them
  const downloadAll = useCallback(async () => {
    if (convertedFiles.length > 3) {
      // Always re-create the zip from the current final list
      const blob = await createZipFile(convertedFiles);
      setZipBlob(blob);

      // Download the zip
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_images.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For 3 or fewer, just download individually
      convertedFiles.forEach(downloadFile);
    }
  }, [convertedFiles, createZipFile, downloadFile]);

  // Remove one file from the list
  const removeConvertedFile = useCallback((filename: string) => {
    setConvertedFiles((prev) => {
      const newFiles = prev.filter((file) => file.originalName !== filename);
      // If we drop below 4 files, we no longer have a valid zip
      if (newFiles.length <= 3) {
        setZipBlob(null);
      }
      return newFiles;
    });

    // Clean up progress
    setProgressMap((prev) => {
      const newMap = { ...prev };
      delete newMap[filename];
      return newMap;
    });
  }, []);

  // Clear all
  const clearConvertedFiles = useCallback(() => {
    setConvertedFiles([]);
    setZipBlob(null);
    setProgressMap({});
    setActiveConversions(0);
    progressRef.current = {};
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
