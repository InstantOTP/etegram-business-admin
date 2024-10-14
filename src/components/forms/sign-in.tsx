'use client';
import { useState } from 'react';
import { Input, PasswordInput } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { SignInState } from '@/app/actions/auth';
import { login } from '@/app/actions/auth';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import { useSearchParams } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={'xl'}
      className='w-full'
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      <span>Sign In</span>
    </Button>
  );
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('redirectUrl'));
  const initalState = {
    message: null,
    errors: {},
    status: '',
    redirectUrl: searchParams.get('redirectUrl') || '',
  };
  const { toast } = useToast();
  const [state, dispatch] = useFormState(login, initalState);

  // console.log(pending);
  const formRef = useRef<HTMLFormElement>(null);
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Login Successful',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className='bg-background rounded-xl py-6 px-5 lg:px-10 w-full max-w-[38.438rem] text-base'>
      <div className='max-w-[430px] mx-auto'>
        <h3 className='text-center font-manrope font-semibold text-foreground text-base lg:text-2xl mb-2'>
          Welcome Back to instantotp
        </h3>

        <p className='text-base text-center'>
          Sign into your account to continue
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
              type='email'
              defaultValue='admin@mail.com'
              placeholder='Enter your email address'
            />
            {state?.errors?.email ? (
              <div
                id='amount-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.email[0]}</p>
                {/* {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))} */}
              </div>
            ) : null}
          </div>

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
              defaultValue='1n5tan70tp!'
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

          <div className='flex justify-end items-center'>
            {/* <div className='flex items-center space-x-2'>
              <Checkbox id='remember' />
              <label
                htmlFor='remember'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Remember me
              </label>
            </div> */}

            <Link
              href={'/auth/forgot-password'}
              className='text-sm text-primary hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          <div className='max-w-[26.875rem] mx-auto !mt-14 '>
            <SubmitButton />
          </div>
        </form>
      </div>

      {/* <p className='text-center mt-8'>
        Don&apos;t have an account?{' '}
        <Link
          href={'/auth/sign-up'}
          className='text-primary font-semibold hover:underline'
        >
          Sign up
        </Link>
      </p> */}
    </div>
  );
}
