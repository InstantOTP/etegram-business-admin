'use client';
import { useState } from 'react';
import { Input, PasswordInput } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { ForgotPasswordState } from '@/app/actions/auth';
import { login, forgotPassword } from '@/app/actions/auth';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className='max-w-[26.875rem] mx-auto !mt-12'>
      <Button
        size={'xl'}
        className='w-full'
        disabled={pending}
        type='submit'
      >
        <LucideLoader2
          className={cn(
            'animate-spin mr-1 w-[22px] h-[22px] opacity-0 hidden',
            {
              'opacity-100 block': pending,
            }
          )}
        />{' '}
        <span>Send Link</span>
      </Button>
    </div>
  );
}

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const initalState = { message: '', errors: {}, status: '' };
  const [state, dispatch] = useFormState<
    ForgotPasswordState | undefined,
    FormData
  >(forgotPassword, initalState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Email Sent',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className='bg-background rounded-xl py-8 px-4 lg:px-10 w-full max-w-[38.438rem] text-base'>
      <div className='max-w-[430px] mx-auto'>
        <h3 className='text-center font-manrope font-semibold text-foreground text-base lg:text-2xl mb-2'>
          Forgot password
        </h3>

        <p className='text-base text-center max-w-[20.313rem] mx-auto'>
          Enter the email address you registered with and we will send you a
          link to create a new password.
        </p>

        <form
          action={dispatch}
          ref={formRef}
          className='w-full space-y-3 lg:space-y-4 mt-14'
        >
          <div className='form-control'>
            <label
              htmlFor='email'
              className='!text-base'
            >
              Email Address
            </label>
            <Input
              id='email'
              name='email'
              //   type='email'
              placeholder='Enter your email address'
            />
            {state?.errors?.email ? (
              <div
                id='amount-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.email[0]}</p>
              </div>
            ) : null}
          </div>

          <SubmitButton />
        </form>
      </div>

      <p className='text-center mt-5 pb-16'>
        Remember password?{' '}
        <Link
          href={'/auth/sign-in'}
          className='text-primary'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
