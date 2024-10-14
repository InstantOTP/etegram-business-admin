'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Providers } from '@/types/user';
import { Edit, LucideLoader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { updateServiceCharge } from '@/app/actions/settings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findUpper } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { updateProvider } from '@/app/actions/providers';

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
      <span>Update Provider</span>
    </Button>
  );
}

export function EditProvidersDetails({ provider }: { provider: Providers }) {
  const [state, dispatch] = useFormState(updateProvider, {
    providerID: provider.providerID,
    message: '',
    status: '',
    errors: {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const [providerImage, setProviderImage] = useState(provider?.providerIcon);
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
      <DialogTrigger className='rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground'>
        <div className='flex space-x-3 py-2.5 px-3.5 font-inter !text-xs'>
          <Edit className='w-4 h-4' />
          <span>Edit Provider</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Edit Provider
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
        >
          <div className=''>
            <div className='form-control '>
              <label
                htmlFor='providerIcon'
                className='!text-base'
              >
                Provider Icon
              </label>
              <div className='flex items-center gap-x-4'>
                <Input
                  id='providerIcon'
                  name='providerIcon'
                  type='url'
                  value={providerImage}
                  onChange={(e) => setProviderImage(e.target.value)}
                  placeholder='Paste Image Url'
                  className='flex-1'
                />
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src={providerImage}
                    alt={`${provider.providerName}`}
                    className='object-cover'
                  />
                  <AvatarFallback>
                    {provider.providerName
                      ? findUpper(`${provider.providerName}`)
                      : 'PD'}
                  </AvatarFallback>
                </Avatar>
              </div>
              {state?.errors?.providerIcon ? (
                <div
                  id='providerIcon-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.providerIcon[0]}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-5'>
            <div className='form-control'>
              <label
                htmlFor='providerName'
                className='!text-base'
              >
                Provider name
              </label>
              <div>
                <Input
                  id='providerName'
                  name='providerName'
                  type='text'
                  defaultValue={provider?.providerName}
                  placeholder='Enter Name'
                />
              </div>
              {state?.errors?.providerName ? (
                <div
                  id='providerName-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.providerName[0]}</p>
                </div>
              ) : null}
            </div>
            <div className='form-control'>
              <label
                htmlFor='charges'
                className='!text-base'
              >
                Service Charge
              </label>
              <div className='relative'>
                <Input
                  id='charges'
                  name='charges'
                  type='tel'
                  defaultValue={provider.charges}
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
              {state?.errors?.charges ? (
                <div
                  id='charges-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.charges[0]}</p>
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
                placeholder='Enter Provider description'
                id='description'
                name='description'
                defaultValue={provider?.description}
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
