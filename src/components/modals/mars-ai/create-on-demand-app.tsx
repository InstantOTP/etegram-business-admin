'use client';

import { createOnDemandApp } from '@/app/actions/on-demand';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

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
        className={cn('animate-spin mr-1 w-[22px] h-[22px] opacity-0', {
          'opacity-100': pending,
        })}
      />{' '}
      <span>Add App</span>
    </Button>
  );
}

export function CreateOnDemandAppModal() {
  const [state, dispatch] = useFormState(createOnDemandApp, {
    message: '',
    status: '',
    errors: {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appImage, setAppImage] = useState<string | undefined>(undefined);
  const { toast } = useToast();

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
        <Button size={'xl'}>Add App</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>Add App</DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
        >
          <div className=''>
            <div className='form-control '>
              <label
                htmlFor='icon'
                className='!text-base'
              >
                App Icon
              </label>
              <div className='flex items-center gap-x-4'>
                <Input
                  id='icon'
                  name='icon'
                  type='url'
                  value={appImage}
                  onChange={(e) => setAppImage(e.target.value)}
                  placeholder='Paste Image Url'
                  className='flex-1'
                />
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src={appImage}
                    alt={`add app image`}
                    className='object-cover'
                  />
                  <AvatarFallback>{'IM'}</AvatarFallback>
                </Avatar>
              </div>
              {state?.errors?.icon ? (
                <div
                  id='icon-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.icon[0]}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='form-control'>
              <label
                htmlFor='name'
                className='!text-base'
              >
                App name
              </label>
              <div>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Enter Name'
                />
              </div>
              {state?.errors?.name ? (
                <div
                  id='name-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.name[0]}</p>
                </div>
              ) : null}
            </div>
            <div className='form-control'>
              <label
                htmlFor='amount'
                className='!text-base'
              >
                Amount
              </label>
              <div className='relative'>
                <Input
                  id='amount'
                  name='amount'
                  type='tel'
                  // defaultValue={provider.charges}
                  placeholder='Enter Amount'
                  className='pl-9'
                />
                <p
                  aria-hidden={true}
                  className='absolute top-1/2 -translate-y-1/2 left-4'
                >
                  &#x20A6;
                </p>
              </div>
              {state?.errors?.amount ? (
                <div
                  id='amount-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.amount[0]}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='!mt-10'>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
