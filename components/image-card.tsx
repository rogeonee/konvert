'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { Download, X } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from './ui/progress';
import useMobile from '@/lib/useMobile';

type ImageProps = {
  filename: string;
  filesize: number;
  control: Control<any>;
  name: string;
  progress?: number;
  onRemove: () => void;
  onDownload?: () => void;
  isConverted?: boolean;
  currentState: 'start-emp' | 'start-add' | 'converse' | 'end' | 'impossible';
};

const ImageCard: React.FC<ImageProps> = ({
  filename,
  filesize,
  progress = 0,
  onRemove,
  onDownload,
  isConverted,
  currentState = 'start-add',
}) => {
  const isMobile = useMobile();
  // const progress = 80;

  // Format the file size
  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' B';
    if (size < 1048576) return (size / 1024).toFixed(2) + ' KB';
    return (size / 1048576).toFixed(2) + ' MB';
  };

  // 21 large
  // 20 medium
  // 14 small
  // Truncate the filename on mobile
  const truncateFilename = (name: string) => {
    let maxLength;

    switch (isMobile) {
      case 'large':
        maxLength = 21;
        break;
      case 'medium':
        maxLength = 19;
        break;
      case 'small':
        maxLength = 14;
        break;
      default:
        maxLength = 21; // default for larger screens
    }

    return name.length > maxLength ? name.slice(0, maxLength - 2) + '..' : name;
  };

  // Split the filename and format
  const splitFilename = filename.split('.');
  const namePart = splitFilename[0];
  const formatPart = splitFilename[1]
    ? `.${splitFilename[1].toUpperCase()}`
    : ''.toUpperCase();

  return (
    <Card className="relative flex flex-row justify-between items-center w-full h-20 pl-0 pr-4">
      {progress > 0 && (
        <Progress value={progress} className="animate-progress-pulse" />
      )}
      <CardHeader className="flex-1">
        <div>
          <CardTitle className="text-md font-medium sm:text-md md:text-lg">
            {isMobile !== 'not-mobile'
              ? truncateFilename(namePart) + formatPart
              : namePart + formatPart}{' '}
          </CardTitle>
          <CardDescription>{formatFileSize(filesize)}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex items-center gap-4">
        {isConverted && onDownload && (
          <Button
            variant="outline"
            size="icon"
            className="hover:border-[#029220]"
            disabled={currentState === 'converse'}
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              e.stopPropagation(); // Stop event bubbling

              onDownload();
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="hover:border-[#A80115]"
          disabled={currentState === 'converse'}
          onClick={onRemove}
        >
          <X />
        </Button>
      </div>
    </Card>
  );
};

export default ImageCard;
