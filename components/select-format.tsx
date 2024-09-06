import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const formats = [
  { value: 'jpg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
  { value: 'svg', label: 'SVG' },
  { value: 'webp', label: 'WEBP' },
  { value: 'gif', label: 'GIF' },
];

interface SelectFormatProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const SelectFormat: React.FC<SelectFormatProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        id="format"
        className={cn(
          'w-[120px]',
          error && 'border-red-500 focus:ring-red-500',
        )}
      >
        <SelectValue placeholder="Convert to" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem key={format.value} value={format.value}>
            <p className="font-medium text-foreground">{format.label}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFormat;
