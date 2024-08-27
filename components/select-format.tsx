import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const formats = [
  { value: 'jpg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
  { value: 'svg', label: 'SVG' },
  { value: 'webp', label: 'WEBP' },
  { value: 'gif', label: 'GIF' },
];

const SelectFormat = () => {
  return (
    <Select>
      <SelectTrigger id="format" className="w-[120px]">
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
