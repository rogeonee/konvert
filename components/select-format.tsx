import React from 'react';
import { Control, Controller } from 'react-hook-form';
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
  // { value: 'svg', label: 'SVG' },
  // { value: 'webp', label: 'WEBP' },
  // { value: 'gif', label: 'GIF' },
];

interface SelectFormatProps {
  control: Control<any>;
  name: string;
}

const SelectFormat: React.FC<SelectFormatProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger
            className={cn(
              'w-[120px]',
              fieldState.invalid && 'border-red-500 focus:ring-red-500',
            )}
          >
            <SelectValue placeholder="Convert to" defaultValue="jpg" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => e.preventDefault();
            }}
          >
            {formats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                <p className="font-medium text-foreground">{format.label}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectFormat;
