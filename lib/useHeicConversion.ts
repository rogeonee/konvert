import { useState } from 'react';
import decode from 'heic-decode';

type ConvertedFile = {
  blob: Blob;
  originalName: string;
  format: string;
};

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);

  const convertHeicToFormat = async (
    file: File,
    format: string,
    quality: number,
  ) => {
    setIsConverting(true);
    setProgress(10);

    try {
      // Read file
      const arrayBuffer = await file.arrayBuffer();
      setProgress(15);

      // Decode the HEIC file
      const { width, height, data } = await decode({
        buffer: new Uint8Array(arrayBuffer),
      });
      setProgress(65);

      // Create canvas
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
      setProgress(75);

      // Create blob
      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;

      // Convert the canvas to the desired format
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          mimeType,
          quality,
        );
      });
      setProgress(100);

      // Store the file
      setConvertedFiles((prev) => [
        ...prev,
        {
          blob,
          originalName: file.name,
          format: format === 'jpg' ? 'jpeg' : format,
        },
      ]);

      return;
    } catch (error) {
      console.error('Conversion failed:', error);
      throw error;
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  const downloadFile = (file: ConvertedFile) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.originalName.split('.')[0]}.${file.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    convertedFiles.forEach((file) => {
      downloadFile(file);
    });
  };

  const removeConvertedFile = (filename: string) => {
    setConvertedFiles((prev) =>
      prev.filter((file) => file.originalName !== filename),
    );
  };

  const clearConvertedFiles = () => {
    setConvertedFiles([]);
  };

  return {
    convertHeicToFormat,
    downloadFile,
    downloadAll,
    removeConvertedFile,
    clearConvertedFiles,
    isConverting,
    progress,
    convertedFiles,
  };
};
