'use client';

import { CopyToClipBoardDropdown } from '@/components/common/buttons/copy';
import { UpdateOnDemandAppModal } from '@/components/modals/mars-ai/update-on-demand';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, formatDateWithTime, formatter } from '@/lib/utils';
import { OnDemandApp } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CornerUpLeft, Eye, MoreVertical, X } from 'lucide-react';
import Link from 'next/link';

// import { ViewUserModal } from './table-actions';

export const onDemandAppColumns: ColumnDef<OnDemandApp>[] = [
  {
    accessorKey: 'name',
    header: 'App Name',
    cell: ({ row }) => {
      const app = row.original;
      return (
        <div className='text-primary flex space-x-3 items-center'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={app.icon}
              alt={`${app.name}`}
              className='object-cover'
            />
            <AvatarFallback>{'AP'}</AvatarFallback>
          </Avatar>
          <span>{row.getValue('name')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = formatter().format(row.getValue('amount'));

      return <div>{amount}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const transaction_date = formatDateWithTime(row.getValue('createdAt'));

      return <div className=''>{transaction_date}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      let status: string = row.getValue('status');

      return (
        <div
          className={cn(
            `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-1 capitalize w-fit`,
            {
              'bg-[#EC0E0E1A] text-[#EC0E0E]': status === 'failed',
              'bg-[#FFD2431A] text-[#FFD243]': status === 'suspended',
            }
          )}
        >
          {status === 'active' ? (
            <Check className='w-3 h-3' />
          ) : status === 'pending' ? (
            <CornerUpLeft className='w-3 h-3' />
          ) : (
            <X className='w-3 h-3' />
          )}

          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const app = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link
              href={'/'}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'h-8 w-8 p-0'
              )}
              // className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreVertical className='h-4 w-4' />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='flex flex-col'
          >
            <DropdownMenuItem asChild>
              <Link
                href={`/mars-ai/${app.id}`}
                className={buttonVariants({
                  variant: 'ghost',
                  className:
                    'rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground',
                })}
              >
                <div className='flex space-x-3  font-inter !text-xs '>
                  <Eye className='w-4 h-4' />
                  <span>View App numbers</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <UpdateOnDemandAppModal app={app} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <CopyToClipBoardDropdown
                text={row.original.icon}
                title='Copy icon URL'
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
