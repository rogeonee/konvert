import React from 'react';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SelectQuality from '@/components/select-quality';
import SelectFormat from '@/components/select-format';
import type { FormData } from '@/app/page';

type HeaderProps = {
  fields: FieldArrayWithId<FormData, 'images'>[];
  control: Control<FormData>;
  handleAddMore: () => void;
};

const Header: React.FC<HeaderProps> = ({ fields, control, handleAddMore }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center sm:gap-8">
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <div className="flex w-full md:w-auto items-center justify-start gap-2">
          <h1 className="text-lg font-semibold md:text-2xl">Konvert in</h1>
          <SelectQuality control={control} name="quality" />
        </div>
        <div className="flex w-full md:w-auto items-center justify-start gap-2">
          <h1 className="text-lg font-semibold md:text-2xl">to</h1>
          <SelectFormat control={control} name="format" />
        </div>
      </div>
      {fields.length > 0 && (
        <div className="flex md:justify-end">
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              handleAddMore();
            }}
            type="button"
          >
            Add more...
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
