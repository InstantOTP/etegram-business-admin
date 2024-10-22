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
import { createIndustry, createUseCase } from '@/app/actions/generics';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
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
      <span>{isEditing ? 'Edit' : 'Create'} Use Case</span>
    </Button>
  );
}

export function UseCaseModal({
  industry,
  isEditing = false,
}: {
  industry?: { name: string; description: string; id: string };
  isEditing?: boolean;
}) {
  const [state, dispatch] = useFormState(createUseCase, {
    industryID: industry?.id,
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
      <DialogTrigger asChild>
        {isEditing ? (
          <div className='flex space-x-3 py-2.5 px-3.5 font-inter !text-xs'>
            <Edit className='w-4 h-4' />
            <span>Edit Use Case</span>
          </div>
        ) : (
          <Button size={'xl'}>Create Use Case</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            {isEditing ? 'Edit' : 'Create'} Use case
          </DialogTitle>
        </DialogHeader>

        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
        >
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='form-control'>
              <label
                htmlFor='providerName'
                className='!text-base'
              >
                Name
              </label>
              <div>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  defaultValue={industry?.name}
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
                placeholder='Enter description'
                id='description'
                name='description'
                defaultValue={industry?.description}
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
            <SubmitButton isEditing={isEditing} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
