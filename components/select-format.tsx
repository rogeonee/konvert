import React from 'react';
import { Control, Controller } from 'react-hook-form';
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
  // { value: 'svg', label: 'SVG' },
  // { value: 'webp', label: 'WEBP' },
  // { value: 'gif', label: 'GIF' },
];

interface SelectFormatProps {
  control: Control<any>;
  name: string;
  disabled?: boolean;
}

const SelectFormat: React.FC<SelectFormatProps> = ({
  control,
  name,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={disabled}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue defaultValue="jpg" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => e.preventDefault();
            }}
            className="w-full"
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
