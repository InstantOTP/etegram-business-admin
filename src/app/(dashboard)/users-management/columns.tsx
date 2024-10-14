'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, formatDate, formatter, truncateText } from '@/lib/utils';
import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CornerUpLeft, MoreVertical, X, Eye } from 'lucide-react';
import { UpdateStatus, ViewUserModal } from './table-actions';
import Link from 'next/link';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'userID',
    header: 'User ID',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {truncateText(row.getValue('userID'), 15)}
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      return <div>{truncateText(row.getValue('username'), 15)}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return <div>{truncateText(row.getValue('email'), 18)}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'wallet',
    header: 'Wallet',
    cell: ({ row }) => {
      const wallet_balance = formatter().format(row.getValue('wallet'));

      return <div>{wallet_balance}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Joined',
    cell: ({ row }) => {
      const date_joined = formatDate(row.getValue('createdAt'));

      return <div className=''>{date_joined}</div>;
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
            `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-2 capitalize`,
            {
              'bg-[#EC0E0E1A] text-[#EC0E0E]': status === 'blocked',
              'bg-[#FFD2431A] text-[#FFD243]': status === 'pending',
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
      const user = row.original;

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
            className=''
          >
            <DropdownMenuItem>
              <Link href={`/users-management/${user.userID}`}>
                <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
                  <Eye className='w-4 h-4' />
                  <span>View Details</span>
                </div>
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <ViewUserModal user={user} />
            </DropdownMenuItem> */}
            <UpdateStatus user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
