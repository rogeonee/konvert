import { useState } from 'react';
import decode from 'heic-decode';

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);

  const convertHeicToFormat = async (
    file: File,
    format: string,
    quality: number,
  ) => {
    setIsConverting(true);
    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Create a Uint8Array from the ArrayBuffer
      const uint8Array = new Uint8Array(arrayBuffer);

      // Decode the HEIC image
      const { width, height, data } = await decode({ buffer: uint8Array });

      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // Get the canvas context and create an ImageData object
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      const imageData = new ImageData(
        new Uint8ClampedArray(data),
        width,
        height,
      );

      // Put the image data on the canvas
      ctx.putImageData(imageData, 0, 0);

      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
      const fileExtension = format === 'jpg' ? 'jpeg' : format;

      // Convert the canvas to the desired format
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          mimeType,
          quality,
        );
      });

      console.log(
        `useConversion | blob | format: ${format} mimeType: ${mimeType} quality: ${quality}`,
      );

      const originalName = file.name.split('.').slice(0, -1).join('.');

      // Create and trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${originalName}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Conversion failed:', error);
      throw error;
    } finally {
      setIsConverting(false);
    }
  };

  return { convertHeicToFormat, isConverting };
};
