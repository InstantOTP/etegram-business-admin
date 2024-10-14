'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceCharges } from '@/types/user';
import { updateServiceCharge } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';

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
      <span>Update Service Charges</span>
    </Button>
  );
}

export function UpdateServiceCharge({
  serviceCharges,
}: {
  serviceCharges: ServiceCharges;
}) {
  const [state, dispatch] = useFormState(updateServiceCharge, undefined);
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
      <DialogTrigger className={buttonVariants({ size: 'xl' })}>
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Update Service charge
          </DialogTitle>
        </DialogHeader>
        <form
          action={dispatch}
          className='w-full space-y-3 lg:space-y-4'
        >
          <div className='form-control'>
            <label
              htmlFor='minimumWithdrawalAmount'
              className='!text-base'
            >
              Minimum Withdrawal Amount
            </label>
            <div className='relative'>
              <Input
                id='minimumWithdrawalAmount'
                name='minimumWithdrawalAmount'
                type='tel'
                defaultValue={serviceCharges?.minimumWithdrawalAmount}
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
            {/* {state?.errors?.amount ? (
              <div
                id='amount-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.amount[0]}</p>
           
              </div>
            ) : null} */}
          </div>

          <div className='form-control'>
            <label
              htmlFor='referralBonus"'
              className='!text-base'
            >
              Referral Bonus
            </label>
            <div className='relative'>
              <Input
                id='referralBonus'
                name='referralBonus'
                type='tel'
                defaultValue={serviceCharges?.referralBonus}
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
            {/* {state?.errors?.amount ? (
              <div
                id='amount-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.amount[0]}</p>
           
              </div>
            ) : null} */}
          </div>
          <div className='form-control'>
            <label
              htmlFor='withdrawalCharges'
              className='!text-base'
            >
              Withdrawal Charges
            </label>
            <div className='relative'>
              <Input
                id='withdrawalCharges'
                name='withdrawalCharges'
                type='tel'
                defaultValue={serviceCharges?.withdrawalCharges}
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
            {/* {state?.errors?.amount ? (
              <div
                id='amount-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.amount[0]}</p>
           
              </div>
            ) : null} */}
          </div>

          <div className='!mt-10'>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
