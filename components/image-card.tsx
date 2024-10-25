'use client';

import React from 'react';
import { Control, Controller, useFormState } from 'react-hook-form';
import { Download, X } from 'lucide-react';
import SelectFormat from './select-format';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useMobile from '@/lib/useMobile';

type ImageProps = {
  filename: string;
  filesize: number;
  control: Control<any>;
  name: string;
  progress: number;
  onRemove: () => void;
  onDownload?: () => void;
  isConverted?: boolean;
};

const ImageCard: React.FC<ImageProps> = ({
  filename,
  filesize,
  control,
  name,
  progress,
  onRemove,
  onDownload,
  isConverted,
}) => {
  const isMobile = useMobile();
  const { errors } = useFormState({ control });

  // Format the file size
  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' B';
    if (size < 1048576) return (size / 1024).toFixed(2) + ' KB';
    return (size / 1048576).toFixed(2) + ' MB';
  };

  // Truncate the filename on mobile
  const truncateFilename = (name: string) => {
    const maxLength = 6; // 6 for filename + 5 for format
    return name.length > maxLength ? name.slice(0, maxLength - 3) + '..' : name;
  };

  // Split the filename and format
  const splitFilename = filename.split('.');
  const namePart = splitFilename[0];
  const formatPart = splitFilename[1]
    ? `.${splitFilename[1].toUpperCase()}`
    : ''.toUpperCase();

  return (
    <Card className="relative flex flex-row justify-between items-center w-full h-20 pl-0 pr-4">
      <div
        className="absolute bottom-0 left-[4px] h-0.5 bg-green-500"
        style={{
          width: `${progress}%`,
          borderBottomLeftRadius: '0.1rem', // Match Card's border radius
          borderBottomRightRadius: `${progress === 100 ? '0.5rem' : '0'}`, // Apply only when progress is 100%
        }}
      ></div>
      <CardHeader className="flex-1">
        <div>
          <CardTitle className="text-md font-medium sm:text-md md:text-lg">
            {isMobile
              ? truncateFilename(namePart) + formatPart
              : namePart + formatPart}{' '}
          </CardTitle>
          <CardDescription>{formatFileSize(filesize)}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex items-center gap-4">
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <SelectFormat
              value={field.value}
              onChange={field.onChange}
              error={fieldState.invalid}
            />
          )}
        />
        {isConverted && onDownload && (
          <Button
            variant="outline"
            size="icon"
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
          className="hover:border-red-500"
          onClick={onRemove}
        >
          <X />
        </Button>
      </div>
    </Card>
  );
};

export default ImageCard;
