'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import SelectFormat from '@/components/select-format';
import SelectQuality from '@/components/select-quality';
import ImageCard from '@/components/image-card';
import { Input } from '@/components/ui/input';

const sampleImages = [
  { name: 'image1.jpg', size: 204800 },
  { name: 'image2.png', size: 512000 },
  { name: 'image3.gif', size: 1048576 },
  { name: 'image4.webp', size: 256000 },
  { name: 'image5.svg', size: 102400 },
  { name: 'image6.webp', size: 256000 },
  { name: 'image7.svg', size: 102400 },
];

export default function Home() {
  const [images, setImages] = useState([]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <div className="flex min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)] flex-col gap-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">Konvert to</h1>
              <SelectFormat />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">in</h1>
              <SelectQuality />
            </div>
          </div>

          {/* Drop files section */}
          <div className="flex flex-1 bg-muted/50 rounded-lg border-2 border-dashed shadow-sm p-2 md:p-4">
            {images.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Drop files or pick manually
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Max size 100MB
                  </p>
                  <Input
                    id="picture"
                    type="file"
                    className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    placeholder="Choose files"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {images.map((image, index) => (
                  <ImageCard
                    key={index}
                    filename={image.name}
                    filesize={image.size}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button disabled={images.length === 0} className="w-60">
              Konvert
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
