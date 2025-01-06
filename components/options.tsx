import React from 'react';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SelectQuality from '@/components/select-quality';
import SelectFormat from '@/components/select-format';
import type { FormData } from './home';

type OptionsProps = {
  fields: FieldArrayWithId<FormData, 'images'>[];
  control: Control<FormData>;
  handleAddMore: () => void;
  handleReset: (e: React.MouseEvent) => void;
  currentState: 'start-emp' | 'start-add' | 'converse' | 'end' | 'impossible';
  isPng?: boolean;
};

const Options: React.FC<OptionsProps> = ({
  fields,
  control,
  handleAddMore,
  handleReset,
  currentState = 'start-emp',
  isPng,
}) => {
  return (
    <div className="flex flex-row justify-between sm:items-center sm:gap-8">
      {/* Selects */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="flex w-full md:w-auto items-center justify-start gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl whitespace-nowrap">
            Konvert to
          </h1>
          <SelectFormat
            control={control}
            name="format"
            disabled={currentState === 'converse'}
          />
        </div>
        <div className="flex w-full md:w-auto items-center justify-start gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl whitespace-nowrap">
            in
          </h1>
          <SelectQuality
            control={control}
            name="quality"
            disabled={currentState === 'converse' || isPng}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 items-end md:flex-row sm:justify-end md:items-center w-full md:w-auto">
        {currentState !== 'start-emp' && (
          <Button
            variant="outline"
            onClick={handleReset}
            type="button"
            disabled={currentState === 'converse'}
            className="w-[70px] hover:border-[#A80115]"
          >
            Clear
          </Button>
        )}
        {currentState === 'start-add' && (
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              handleAddMore();
            }}
            type="button"
            className="w-[100px]"
          >
            Add more
          </Button>
        )}
      </div>
    </div>
  );
};

export default Options;
