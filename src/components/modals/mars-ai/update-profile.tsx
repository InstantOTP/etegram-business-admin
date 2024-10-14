'use client';

import {
  createOnDemandApp,
  createOnDemandAppProfile,
  updateOnDemandAppProfile,
  getPassword,
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
import { OnDemandAppNumbers } from '@/types/user';
import { LucideLoader2, Edit } from 'lucide-react';
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
      <span>Update Profile</span>
    </Button>
  );
}

export function UpdateOnAppProfileModal({
  number,
}: {
  number: OnDemandAppNumbers;
}) {
  let params = number.id;
  // console.log(number);
  const [state, dispatch] = useFormState(updateOnDemandAppProfile, {
    message: '',
    errors: {},
    status: '',
    onDemandNumberID: params,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appImage, setAppImage] = useState<string | undefined>(
    number.onDemandApplication.icon
  );
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [password, setPassword] = useState('');

  const { toast } = useToast();

  async function handleGetPasswordFunction() {
    try {
      setIsRetrieving(true);
      if (params) {
        const data = await await getPassword(number.id);
        // console.log(data);
        if (data?.message) {
          toast({
            description: data.message,
            variant: 'destructive',
          });
          return;
        } else {
          // console.log(data);
          setPassword(data?.password);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsRetrieving(false);
    }
  }

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
      <DialogTrigger className='rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground'>
        <div className='flex space-x-3 py-2.5 px-3.5 font-inter !text-xs'>
          <Edit className='w-4 h-4' />
          <span>Update Number</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Update Number
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
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
                  defaultValue={number?.number}
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
          <div className='flex flex-col md:flex-row items-center gap-5'>
            <div className='form-control'>
              <label
                htmlFor='password'
                className='!text-base'
              >
                Password
              </label>
              <div className='flex gap-x-2 items-center'>
                <Input
                  id='password'
                  name='password'
                  type='text'
                  placeholder='Enter password'
                  defaultValue={password}
                />
                <Button
                  type='button'
                  onClick={handleGetPasswordFunction}
                  disabled={isRetrieving}
                >
                  <LucideLoader2
                    className={cn(
                      'animate-spin mr-1 w-[22px] h-[22px] hidden',
                      {
                        'inline-block': isRetrieving,
                      }
                    )}
                  />{' '}
                  <span>Reveal</span>
                </Button>
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
                defaultValue={number.description}
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
