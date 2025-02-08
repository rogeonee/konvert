import { usePathname } from 'next/navigation';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { AnimatePresence, motion } from 'motion/react';
import SelectQuality from '@/components/select-quality';
import SelectFormat from '@/components/select-format';
import MotionButton from '@/components/ui/motion-button';
import type { FormData } from '@/components/converter';

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
  const pathname = usePathname();
  const formatFromPath = pathname.replace('/', '').toUpperCase();

  return (
    <div className="flex flex-row justify-between sm:items-center sm:gap-8">
      {/* Selects */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="flex w-full md:w-auto items-center justify-start gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl whitespace-nowrap">
            {formatFromPath} to
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
      <div className="flex flex-col gap-4 items-end md:flex-row-reverse sm:justify-end md:items-center w-full md:w-auto">
        <AnimatePresence mode="wait">
          {['start-add', 'end'].includes(currentState) && (
            <motion.div
              key="clear"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <MotionButton
                variant="outline"
                onClick={handleReset}
                type="button"
                disabled={currentState === 'converse'}
                className="w-[70px] hover:border-[#A80115]"
              >
                Clear
              </MotionButton>
            </motion.div>
          )}

          {currentState === 'start-add' && (
            <motion.div
              key="add-more"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <MotionButton
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddMore();
                }}
                type="button"
                className="w-[100px]"
              >
                Add more
              </MotionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Options;
