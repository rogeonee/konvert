import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex gap-4 h-min w-60 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:mr-2 file:border-0 file:rounded-md file:bg-primary file:text-primary-foreground file:font-medium file:py-2 file:px-2 file:text-center file:justify-center file:gap-2 hover:file:bg-primary/90 placeholder:text-muted-foreground placeholder:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
