'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import SelectQuality from '@/components/select-quality';
import ImageCard from '@/components/image-card';

const sampleImages = [
  { name: 'image1.jpg', size: 204800 },
  { name: 'image2.png', size: 512000 },
  { name: 'image3.gif', size: 1048576 },
  { name: 'image44.webp', size: 256000 },
  /*
  { name: 'image5.svg', size: 102400 },
  { name: 'image6.webp', size: 256000 },
  { name: 'image7.svg', size: 102400 },
   */
];

interface ImageFile {
  name: string;
  size: number;
  file: File;
}

export default function Home() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      file: file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    noClick: true,
  });

  const handleAddMore = () => {
    (document.getElementById('fileInput') as HTMLInputElement)!.click();
  };

  const handleRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <div className="flex min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)] flex-col gap-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-2 md:flex-row justify-between sm:items-center sm:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="flex w-full md:w-auto items-center justify-start gap-2">
                <h1 className="text-lg font-semibold md:text-2xl">
                  Convert in
                </h1>
                <SelectQuality />
              </div>
            </div>
            {/* Shows when images are not empty */}
            {images.length > 0 && (
              <div className="flex mt-2 md:justify-end md:mt-0">
                <Button variant="default" onClick={handleAddMore}>
                  Add more...
                </Button>
              </div>
            )}
          </div>

          {/* Drop files section */}
          <div
            {...getRootProps()}
            className={`flex flex-1 bg-muted/50 rounded-lg border-2 border-dashed shadow-sm p-2 md:p-4 ${
              isDragActive ? 'border-primary' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} id="fileInput" />
            {images.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {isDragActive
                      ? 'Drop the files here'
                      : 'Drop files or pick manually'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Max size 100MB
                  </p>
                  <Button
                    variant="default"
                    className="mt-4"
                    onClick={handleAddMore}
                  >
                    Choose files
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {images.map((image, index) => (
                  <ImageCard
                    key={index}
                    filename={image.name}
                    filesize={image.size}
                    onRemove={() => handleRemove(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button disabled={images.length === 0} className="w-60">
              {images.length > 1 ? 'Konvert all' : 'Konvert'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
