import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { findUpper, formatter } from '@/lib/utils';
import { Providers } from '@/types/user';
import { Eye } from 'lucide-react';

export function ViewProvidersDetails({ provider }: { provider: Providers }) {
  return (
    <Dialog>
      <DialogTrigger className='rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground'>
        <div className='flex space-x-3 py-2.5 px-3.5 font-inter !text-xs'>
          <Eye className='w-4 h-4' />
          <span>View Details</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Provider Details
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <div>
            <h4 className='text-base font-semibold'>Avatar</h4>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={provider.providerIcon}
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

          <div>
            <h4 className='text-base font-semibold'>Provider Name</h4>
            <p className='text-primary font-medium'>{provider.providerName}</p>
          </div>
          <div>
            <h4 className='text-base font-semibold'>Description</h4>
            <p className='text-sm'>{provider.description}</p>
          </div>
          <div>
            <h4 className='text-base font-semibold'>Service Charge</h4>
            <p className='font-inter text-sm font-semibold'>
              {formatter().format(provider.charges)}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
