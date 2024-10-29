'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'absolute bottom-0 left-[8px] right-[8px] h-0.5 overflow-hidden bg-transparent',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[#029220] transition-transform duration-300 ease-in-out"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: value === 100 ? '0.5rem' : '0',
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
