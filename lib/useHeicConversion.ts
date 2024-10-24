import { useState } from 'react';
import decode from 'heic-decode';

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

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

      // Download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}.${
        format === 'jpg' ? 'jpeg' : format
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return;
    } catch (error) {
      console.error('Conversion failed:', error);
      throw error;
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return { convertHeicToFormat, isConverting, progress };
};
