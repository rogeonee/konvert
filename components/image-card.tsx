'use client';

import React from 'react';
import { Control, Controller, useFormState } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SelectFormat from './select-format';
import { X } from 'lucide-react';
import useMobile from '@/lib/useMobile';

type ImageProps = {
  filename: string;
  filesize: number;
  onRemove: () => void;
  control: Control<any>;
  name: string;
};

const ImageCard: React.FC<ImageProps> = ({
  filename,
  filesize,
  onRemove,
  control,
  name,
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
  const formatPart = splitFilename[1] ? `.${splitFilename[1]}` : '';

  return (
    <Card className="flex flex-row justify-between items-center w-full h-20 pl-0 pr-4">
      <CardHeader className="flex-1">
        <div>
          <CardTitle className="text-md font-medium sm:text-md md:text-lg">
            {isMobile ? truncateFilename(namePart) + formatPart : filename}{' '}
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
