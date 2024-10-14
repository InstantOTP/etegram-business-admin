'use client';

import { cn, formatDate, formatter, truncateText } from '@/lib/utils';
import { Admin, Roles, User } from '@/types/user';
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
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { updateUserStatus } from '@/app/actions/users-management';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
// import { ViewUserModal } from './table-actions';

export const rolesColumns: ColumnDef<Roles>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <div className='text-primary'>{row.getValue('title')}</div>;
    },
  },
  {
    id: 'permissionCount',
    header: 'PermissionCount',
    cell: ({ row }) => {
      const permission_count = row.original.permissions.length;
      return <div>{permission_count}</div>;
    },
  },
  {
    accessorKey: 'admins',
    header: 'No of Admins',
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
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
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
            <DropdownMenuItem asChild>
              <Link href={`/roles-management/edit-role/${row.original.id}`}>
                Edit Role
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
