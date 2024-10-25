import { useState } from 'react';
import decode from 'heic-decode';
import * as zip from '@zip.js/zip.js';

type ConvertedFile = {
  blob: Blob;
  originalName: string;
  format: string;
};

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  const createZipFile = async (files: ConvertedFile[]) => {
    const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'));

    console.log('createZipFIle | files:', files);
    console.log('createZipFIle | convertedFiles:', convertedFiles);

    try {
      // Add each file to the zip
      await Promise.all(
        files.map(async (file) => {
          const filename = `${file.originalName.split('.')[0]}.${file.format}`;
          await zipWriter.add(filename, new zip.BlobReader(file.blob));
        }),
      );

      // Close and get the zip blob
      const blob = await zipWriter.close();
      setZipBlob(blob);
      return blob;
    } catch (error) {
      console.error('Error creating zip file:', error);
      throw error;
    }
  };

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

      // Store the converted file
      const newFile = {
        blob,
        originalName: file.name,
        format: format === 'jpg' ? 'jpeg' : format,
      };

      setConvertedFiles((prev) => {
        const newFiles = [...prev, newFile];
        // If we now have more than 3 files, create the zip
        if (newFiles.length > 3) {
          // We can't use async/await here, so we trigger zip creation on next tick
          Promise.resolve().then(() => createZipFile(newFiles));
        }
        return newFiles;
      });

      if (convertedFiles.length > 3) {
        await createZipFile(convertedFiles);
      }

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

  const downloadAll = async () => {
    if (convertedFiles.length > 3) {
      let blob = zipBlob;
      if (!blob) {
        // Create new zip if it doesn't exist
        blob = await createZipFile(convertedFiles);
      }

      // Download zip file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_images.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Download individual files for 3 or fewer files
      convertedFiles.forEach((file) => {
        downloadFile(file);
      });
    }
  };

  const removeConvertedFile = (filename: string) => {
    setConvertedFiles((prev) => {
      const newFiles = prev.filter((file) => file.originalName !== filename);
      // Clear zip blob if files count drops to 3 or below
      if (newFiles.length <= 3) {
        setZipBlob(null);
      } else {
        // Recreate zip with remaining files
        Promise.resolve().then(() => createZipFile(newFiles));
      }
      return newFiles;
    });
  };

  const clearConvertedFiles = () => {
    setConvertedFiles([]);
    setZipBlob(null);
  };

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
