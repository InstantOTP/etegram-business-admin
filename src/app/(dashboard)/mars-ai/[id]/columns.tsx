'use client';

import { UpdateOnAppProfileModal } from '@/components/modals/mars-ai/update-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, formatDateWithTime } from '@/lib/utils';
import { OnDemandAppNumbers } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Check, MoreVertical, X } from 'lucide-react';

// import { ViewUserModal } from './table-actions';

export const onDemandAppNumberColumns: ColumnDef<OnDemandAppNumbers>[] = [
  {
    accessorKey: 'number',
    header: 'Phone Number',
    cell: ({ row }) => {
      const app = row.original;
      return (
        <div className='text-primary flex space-x-3 items-center'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={app?.onDemandApplication?.icon}
              alt={`${app?.onDemandApplication?.name}`}
              className='object-cover'
            />
            <AvatarFallback>{'AP'}</AvatarFallback>
          </Avatar>
          <span>{row.getValue('number')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Added',
    cell: ({ row }) => {
      const transaction_date = formatDateWithTime(row.getValue('createdAt'));

      return <div className=''>{transaction_date}</div>;
    },
  },
  {
    accessorKey: 'sold',
    header: 'Availability',
    cell: ({ row }) => {
      let sold: string = row.getValue('sold');

      return (
        <div
          className={cn(
            `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-1 capitalize w-fit`,
            {
              'bg-[#EC0E0E1A] text-[#EC0E0E]': sold,
            }
          )}
        >
          {!sold ? <Check className='w-3 h-3' /> : <X className='w-3 h-3' />}

          <span>{sold ? 'Sold' : 'Available'}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const number = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='flex flex-col'
          >
            <DropdownMenuItem asChild>
              <UpdateOnAppProfileModal number={number} />
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <CopyToClipBoardDropdown
                text={row.original.icon}
                title='Copy icon URL'
              />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
