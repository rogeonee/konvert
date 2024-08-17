import React from 'react';
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
    value: 'balanced',
    label: 'Balanced',
    description: 'Neither fish nor meat.',
  },
  {
    value: 'fast',
    label: 'Fast',
    description: 'I am speed.',
  },
];

const SelectQuality = () => {
  return (
    <Select defaultValue="high">
      <SelectTrigger
        id="quality"
        className="w-[180px] [&_[data-description]]:hidden"
      >
        <SelectValue placeholder="Select a quality level" />
      </SelectTrigger>
      <SelectContent>
        {qualities.map((quality) => (
          <SelectItem key={quality.value} value={quality.value}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">{quality.label}</p>
                <p className="text-xs" data-description>
                  {quality.description}
                </p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuality;
