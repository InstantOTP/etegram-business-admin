import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full bg-primary/5 rounded-[0.625rem] border border-input p-3 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#80808052] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, view, setView, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={view ? 'text' : 'password'}
          className={cn(
            'flex w-full bg-primary/5 rounded-[0.625rem] border border-input p-3 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#80808052] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        <button
          type='button'
          className='absolute right-3 top-1/2 -translate-y-1/2'
          onClick={() => setView(!view)}
        >
          {view ? <EyeOff /> : <Eye />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
