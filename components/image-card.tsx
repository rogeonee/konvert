'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type ImageProps = {
  filename: string;
  filesize: number;
  // onRemove: () => void;
};

const ImageCard: React.FC<ImageProps> = ({ filename, filesize }) => {
  // Helper function to format the file size
  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' B';
    if (size < 1048576) return (size / 1024).toFixed(2) + ' KB';
    return (size / 1048576).toFixed(2) + ' MB';
  };

  return (
    <Card className="flex flex-row justify-between items-center w-full h-20 p-4">
      <CardHeader>
        <div>
          <CardTitle className="text-md font-medium sm:text-md md:text-lg">
            {filename}
          </CardTitle>
          <CardDescription>{formatFileSize(filesize)}</CardDescription>
        </div>
      </CardHeader>
      <Button variant="outline" size="icon" className="hover:border-red-500">
        <X />
      </Button>
    </Card>
  );
};

export default ImageCard;
