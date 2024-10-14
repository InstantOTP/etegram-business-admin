'use client';

import { updateProfile } from '@/app/actions/profile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Roles } from '@/types/user';
import { createAdmin } from '@/app/actions/admin-management';

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
      />{' '}
      <span>Create Admin</span>
    </Button>
  );
}

export function CreateAdminModal({ roles }: { roles: Roles[] }) {
  const initalState = { message: null, errors: {} };
  const { toast } = useToast();
  const [state, dispatch] = useFormState(createAdmin, undefined);
  const [isOpen, setIsOpen] = useState(false);

  const adminRoles = useMemo(() => {
    return roles?.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  }, [roles]);
  //   console.l
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Successful',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
    if (state?.status === 'success') {
      setIsOpen(false);
    }
  }, [state, toast]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button size={'xl'}>Create Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Create Admin
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          ref={formRef}
          className='w-full space-y-3 lg:space-y-8'
        >
          <div className='space-y-4'>
            <div className='form-control w-full'>
              <label
                htmlFor='role'
                className='!text-base'
              >
                Select Role
              </label>

              <Select name='role'>
                <SelectTrigger className='w-full'>
                  <SelectValue
                    placeholder='Select Role'
                    id='role'
                  />
                </SelectTrigger>
                <SelectContent>
                  {adminRoles.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {state?.errors?.role ? (
                <div
                  id='role-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.role[0]}</p>
                </div>
              ) : null}
            </div>
            <div className='flex gap-3'>
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

          <div className='!mt-7'>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
