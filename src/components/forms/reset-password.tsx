'use client';
import { Input, PasswordInput } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { SignupState, resetPassword } from '@/app/actions/auth';
import { signup } from '@/app/actions/auth';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size={'xl'}
      className='w-full'
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />{' '}
      <span>Reset Password</span>
    </Button>
  );
}

export default function ResetPasswordForm({
  email,
  token,
}: {
  email?: string;
  token?: string;
}) {
  const initalState = {
    message: '',
    email: email?.toLocaleLowerCase(),
    token,
    errors: {},
    status: '',
  };
  const { toast } = useToast();
  const [state, dispatch] = useFormState(resetPassword, initalState);
  const [viewPassword, setViewPassword] = useState(false);

  //   console.log(initalState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Successful',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);
  return (
    <div className='bg-background rounded-xl py-6 px-4 lg:px-10 w-full max-w-[38.438rem] text-base'>
      <div className='max-w-[430px] mx-auto'>
        <h3 className='text-center font-manrope font-semibold text-foreground text-base lg:text-2xl mb-2'>
          Reset Password
        </h3>

        <p className='text-base text-center'>
          Hey there, type in your new password
        </p>

        <form
          action={dispatch}
          ref={formRef}
          className='w-full space-y-3 lg:space-y-4 mt-14'
        >
          <div className='form-control'>
            <label
              htmlFor='password'
              className='!text-base'
            >
              Password
            </label>
            <PasswordInput
              id='password'
              name='password'
              placeholder='Enter your password'
              view={viewPassword}
              setView={setViewPassword}
            />
            {state?.errors?.password ? (
              <div
                id='password-error'
                aria-live='polite'
                className='error'
              >
                {state.errors.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className='form-control'>
            <label
              htmlFor='confirmpassword'
              className='!text-base'
            >
              Confirm Password
            </label>

            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Enter password'
              view={viewPassword}
              setView={setViewPassword}
            />
            {state?.errors?.confirmPassword ? (
              <div
                id='confirmpassword-error'
                aria-live='polite'
                className='error'
              >
                {state.errors.confirmPassword.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className='max-w-[26.875rem] mx-auto !mt-14'>
            <SubmitButton />
          </div>
        </form>
      </div>

      <p className='text-center mt-8'>
        Already have an account?{' '}
        <Link
          href={'/auth/sign-in'}
          className='text-primary font-semibold hover:underline'
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
