import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const qualities = [
  {
    value: 'high',
    label: 'High Quality',
    description: 'As sharp as possible.',
  },
  {
    value: 'medium',
    label: 'Balanced',
    description: 'Neither fish nor meat.',
  },
  {
    value: 'low',
    label: 'Fast',
    description: 'I am speed.',
  },
];

interface SelectQualityProps {
  control: Control<any>;
  name: string;
}

const SelectQuality: React.FC<SelectQualityProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-[150px] [&_[data-description]]:hidden">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent>
            {qualities.map((quality) => (
              <SelectItem key={quality.value} value={quality.value}>
                {' '}
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="grid gap-0.5">
                    <p className="font-medium text-foreground">
                      {quality.label}
                    </p>
                    <p className="text-xs" data-description>
                      {quality.description}
                    </p>
                  </div>
                </div>{' '}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectQuality;
