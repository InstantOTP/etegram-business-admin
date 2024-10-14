import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn, formatter, truncateText } from '@/lib/utils';
import { User } from '@/types/user';
import { Eye } from 'lucide-react';
import { updateUserStatus } from '@/app/actions/users-management';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ProfileDelete } from 'iconsax-react';
const cardStyle =
  'flex flex-col justify-center items-center space-y-1 border rounded-[0.625rem] text-base p-5';

export function ViewUserModal({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
          <Eye className='w-4 h-4' />
          <span>View Details</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            User Details
          </DialogTitle>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <div className={cn(cardStyle)}>
              <p>Username</p>
              <p className='text-foreground font-semibold'>@{user?.username}</p>
            </div>
            <div className={cn(cardStyle)}>
              <p>Email</p>
              <p className='text-foreground font-semibold truncate text-sm'>
                {truncateText(user?.email, 15)}
              </p>
            </div>{' '}
            <div className={cn(cardStyle)}>
              <p>Phone</p>
              <p className='text-foreground font-semibold'>{user?.phone}</p>
            </div>{' '}
            <div className={cn(cardStyle)}>
              <p>Wallet Balance</p>
              <p className='text-foreground font-semibold'>
                {formatter().format(user?.wallet)}
              </p>
            </div>{' '}
            <div className={cn(cardStyle)}>
              <p>Referral Code</p>
              <p className='text-foreground font-semibold'>
                {user?.referralCode}
              </p>
            </div>{' '}
            <div className={cn(cardStyle)}>
              <p>Total Rented Numbers</p>
              <p className='text-foreground font-semibold'>
                {user?.rentedNumbers}
              </p>
            </div>{' '}
            <div className={cn(cardStyle)}>
              <p>Total Pushed Number</p>
              <p className='text-foreground font-semibold'>
                {user?.pushedNumbers}
              </p>
            </div>{' '}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateStatus({ user }: { user: User }) {
  const { toast } = useToast();
  async function updateStatus() {
    const data = await updateUserStatus({
      userID: user?.userID,
      status: user?.status === 'active' ? 'blocked' : 'active',
    });
    toast({
      description: data?.message,
      variant: data?.status === 'successful' ? 'default' : 'destructive',
    });
  }

  return (
    <DropdownMenuItem
      onClick={updateStatus}
      className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'
    >
      <ProfileDelete className='w-4 h-4' />
      <span>{user?.status === 'active' ? 'Block' : 'Unblock'} User</span>
    </DropdownMenuItem>
  );
}
