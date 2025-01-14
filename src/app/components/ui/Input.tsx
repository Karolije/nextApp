import * as React from 'react';
import { cn } from '@/app/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const inputClasses = cn(
      'input-field flex w-full rounded-lg border px-4 py-2 text-sm placeholder-gray-500 shadow-sm transition-all duration-300 ease-in-out focus:outline-none',
      'text-gray-900 bg-white', 
      'focus:ring-2 focus:ring-blue-400', 
      'hover:border-blue-500 focus:border-blue-500', 
      'placeholder-gray-400', 
      className,
    );

    return <input ref={ref} className={inputClasses} {...props} />;
  },
);

Input.displayName = 'Input';
