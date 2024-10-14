'use client';
import { Input, PasswordInput } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { SignupState } from '@/app/actions/auth';
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
import { updatePassword, updateProfile } from '@/app/actions/profile';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size={'xl'}
      className=''
      disabled={pending}
      type='button'
    >
      {/* <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] opacity-0', {
          'opacity-100': pending,
        })}
      />{' '} */}
      <span>Update Profile</span>
    </Button>
  );
}

function UpdatePasswordButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size={'xl'}
      className=''
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />{' '}
      <span>Update Password</span>
    </Button>
  );
}

function UpdatePasswordForm() {
  const { toast } = useToast();

  const [state, dispatch] = useFormState(updatePassword, undefined);
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Successful',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <form
      action={dispatch}
      className='w-full space-y-3 lg:space-y-8 mt-7 border-t'
    >
      <div className='space-y-4 !mt-6'>
        <h3 className='font-manrope font-semibold text-foreground text-base lg:text-2xl mb-1'>
          Password
        </h3>

        <p className='text-base text-light'>Update your account password</p>
        <div className='form-control'>
          <label
            htmlFor='current_password'
            className='!text-base'
          >
            Current Password
          </label>
          <PasswordInput
            id='oldPassword'
            name='oldPassword'
            placeholder='Enter current password'
            view={viewPassword}
            setView={setViewPassword}
          />
          {state?.errors?.oldPassword ? (
            <div
              id='current_password-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.oldPassword.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label
            htmlFor='new_password'
            className='!text-base'
          >
            New Password
          </label>
          <PasswordInput
            id='newPassword'
            name='newPassword'
            placeholder='Enter new password'
            view={viewPassword}
            setView={setViewPassword}
          />
          {state?.errors?.newPassword ? (
            <div
              id='password-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.newPassword.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label
            htmlFor='confirmNewPassword'
            className='!text-base'
          >
            Confirm New Password
          </label>

          <PasswordInput
            id='confirmNewPassword'
            name='confirmNewPassword'
            placeholder='Enter password'
            view={viewPassword}
            setView={setViewPassword}
          />
          {state?.errors?.confirmNewPassword ? (
            <div
              id='confirmpassword-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.confirmNewPassword.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <UpdatePasswordButton />
    </form>
  );
}

export default function PersonalDetailsForm({ user }: { user: any }) {
  const initalState = { message: null, errors: {} };
  const { toast } = useToast();
  const [state, dispatch] = useFormState(updateProfile, undefined);
  const [viewPassword, setViewPassword] = useState(false);

  //   console.log(state);

  const formRef = useRef<HTMLFormElement>(null);

  //   useEffect(() => {
  //     if (state && state?.message) {
  //       toast({
  //         description: state?.message || 'Registrations Successful',
  //         variant: state?.status !== 'failed' ? 'default' : 'destructive',
  //       });
  //     }
  //   }, [state, toast]);
  return (
    <div className=''>
      <div className=''>
        <form
          //   action={dispatch}
          ref={formRef}
          className='w-full space-y-3 lg:space-y-8'
        >
          <div className='space-y-4'>
            <h3 className='font-manrope font-semibold text-foreground text-base lg:text-2xl mb-1'>
              Profile
            </h3>

            <p className='text-base text-light'>
              This information will be displayed on your profile
            </p>

            <div className='form-control'>
              <label
                htmlFor='firstName'
                className='!text-base'
              >
                Firstname
              </label>
              <Input
                id='firstname'
                name='firstname'
                type='text'
                placeholder='Enter your firstname'
                defaultValue={user?.firstname}
                disabled
              />
              {state?.errors?.firstname ? (
                <div
                  id='firstname-error'
                  aria-live='polite'
                  className='error'
                >
                  {state.errors.firstname.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
            <div className='form-control'>
              <label
                htmlFor='lastname'
                className='!text-base'
              >
                Lastname
              </label>
              <Input
                id='lastname'
                name='lastname'
                type='text'
                placeholder='Enter your Lastname'
                defaultValue={user?.lastname}
                disabled
              />
              {state?.errors?.lastname ? (
                <div
                  id='username-error'
                  aria-live='polite'
                  className='error'
                >
                  {state.errors.lastname.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
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
                defaultValue={user?.email}
                disabled
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
                htmlFor='phone'
                className='!text-base'
              >
                Phone
              </label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='e.g 08012345678'
                defaultValue={user?.phone}
                disabled
              />
              {state?.errors?.phone ? (
                <div
                  id='phone-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.phone[0]}</p>
                  {/* {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))} */}
                </div>
              ) : null}
            </div>
          </div>

          {/* <div className='!mt-14'>
            <SubmitButton />
          </div> */}
        </form>

        <UpdatePasswordForm />
      </div>
    </div>
  );
}
