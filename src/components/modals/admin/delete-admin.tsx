'use client';

import { deleteAdmin } from '@/app/actions/admin-management';
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
import { Admin } from '@/types/user';
import { Login } from 'iconsax-react';
import { LucideLoader2, Trash } from 'lucide-react';
import { ProfileDelete } from 'iconsax-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

function DeleteButton() {
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

export default function DeleteAdmin({ admin }: { admin: Admin }) {
  const [state, dispatch] = useFormState(deleteAdmin, {
    message: '',
    status: '',
    id: admin?.adminID,
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
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogTrigger>
        <div className='flex text-destructive-foreground space-x-3 py-3 px-3.5 font-inter !text-xs'>
          <ProfileDelete className='w-4 h-4' />
          <span>Delete Admin</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete Admin?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=''>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            action={dispatch}
            className='w-full lg:w-fit'
          >
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
