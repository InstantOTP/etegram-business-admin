'use client';

import { cn, formatDate, formatter, truncateText } from '@/lib/utils';
import { Admin, User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Check, Eye, MoreVertical, CornerUpLeft, X } from 'lucide-react';
import { ProfileDelete } from 'iconsax-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { updateUserStatus } from '@/app/actions/users-management';
import { useToast } from '@/components/ui/use-toast';
import { UpdateAdminModal } from '@/components/modals/admin/edit-admin';
import DeleteAdmin from '@/components/modals/admin/delete-admin';
// import { ViewUserModal } from './table-actions';

export const adminColumns: ColumnDef<Admin>[] = [
  {
    id: 'Fullname',
    header: 'Fullname',
    cell: ({ row }) => {
      const admin = row.original;
      const fullname: string = `${admin?.firstname} ${admin?.lastname}`;
      return <div className='text-primary'>{fullname}</div>;
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
            `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-2 capitalize w-fit`,
            {
              'bg-[#EC0E0E1A] text-[#EC0E0E]': status === 'restrict',
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
      const admin = row.original;
      // console.log(admin);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'h-8 w-8 p-0'
              )}
              // className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreVertical className='h-4 w-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='flex flex-col'
          >
            <DropdownMenuItem asChild>
              <UpdateAdminModal admin={admin} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteAdmin admin={admin} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
