import React from 'react';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SelectQuality from '@/components/select-quality';
import type { FormData } from '@/app/page';

type HeaderProps = {
  fields: FieldArrayWithId<FormData, 'images'>[];
  control: Control<FormData>;
  handleAddMore: () => void;
};

const Header: React.FC<HeaderProps> = ({ fields, control, handleAddMore }) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between sm:items-center sm:gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="flex w-full md:w-auto items-center justify-start gap-2">
          <h1 className="text-lg font-semibold md:text-2xl">Convert in</h1>
          <SelectQuality control={control} name="quality" />
        </div>
      </div>
      {fields.length > 0 && (
        <div className="flex mt-2 md:justify-end md:mt-0">
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
