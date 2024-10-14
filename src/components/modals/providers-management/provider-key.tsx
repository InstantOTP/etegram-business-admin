'use client';

import { updateProvider, updateProviderKey } from '@/app/actions/providers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Providers } from '@/types/user';
import { Key, LucideLoader2 } from 'lucide-react';
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
      <span>Update Key</span>
    </Button>
  );
}

export function UpdateProvidersKey({ provider }: { provider: Providers }) {
  const [state, dispatch] = useFormState(updateProviderKey, {
    providerID: provider.providerID,
    message: '',
    status: '',
    errors: {},
  });
  const [isOpen, setIsOpen] = useState(false);
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
          <Key className='w-4 h-4' />
          <span>Update Key</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Update Key
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
        >
          <div className='form-control'>
            <label
              htmlFor='providerKey'
              className='!text-base'
            >
              Provider Key
            </label>
            <div className='relative'>
              <Textarea
                placeholder='Enter Provider Key'
                id='providerKey'
                name='providerKey'
                defaultValue={provider?.providerKey}
              />
            </div>
            {state?.errors?.providerKey ? (
              <div
                id='providerKey-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.providerKey[0]}</p>
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
