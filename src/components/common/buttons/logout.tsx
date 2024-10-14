'use client';

import { logout } from '@/app/actions/auth';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Login } from 'iconsax-react';
import { LucideLoader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className='flex w-full'
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      Continue
    </Button>
  );
}

export default function Logout({
  position,
}: {
  position: 'header' | 'sidebar';
}) {
  const [state, dispatch] = useFormState(logout, undefined);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {position === 'sidebar' ? (
          <div className='flex w-full items-center gap-x-3 py-3 pl-6 '>
            <Login className='w-5 h-5' />
            <p className=' '>
              <span>Log Out</span>
            </p>
          </div>
        ) : (
          <p className='text-sm text-destructive-foreground px-2 pb-1'>
            Logout
          </p>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=''>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            action={dispatch}
            className='w-full lg:w-fit'
          >
            <LogoutButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
