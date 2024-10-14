'use client';

import {
  createOnDemandApp,
  createOnDemandAppProfile,
} from '@/app/actions/on-demand';
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
import { Textarea } from '@/components/ui/textarea';
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
      <span>Add Profile</span>
    </Button>
  );
}

export function CreateOnAppProfileModal({ id }: { id: string }) {
  let params = id;
  const [state, dispatch] = useFormState(createOnDemandAppProfile, {
    message: '',
    errors: {},
    status: '',
    onDemandApplicationID: params,
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
        <Button size={'xl'}>Add Number</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Add Number
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3'
        >
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

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='form-control'>
              <label
                htmlFor='number'
                className='!text-base'
              >
                Number
              </label>
              <div>
                <Input
                  id='number'
                  name='number'
                  type='tel'
                  placeholder='Enter Number'
                />
              </div>
              {state?.errors?.number ? (
                <div
                  id='number-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.number[0]}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='form-control'>
              <label
                htmlFor='password'
                className='!text-base'
              >
                Password
              </label>
              <div>
                <Input
                  id='password'
                  name='password'
                  type='text'
                  placeholder='Enter password'
                />
              </div>
              {state?.errors?.password ? (
                <div
                  id='number-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.password[0]}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className='form-control'>
            <label
              htmlFor='description'
              className='!text-base'
            >
              Description
            </label>
            <div className='relative'>
              <Textarea
                placeholder='Enter description...'
                id='description'
                name='description'
                className='!text-base'
              />
            </div>
            {state?.errors?.description ? (
              <div
                id='description-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.description[0]}</p>
              </div>
            ) : null}
          </div>
          <div className='!mt-10'>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
