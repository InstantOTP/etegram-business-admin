'use client';

import { EditProvidersDetails } from '@/components/modals/providers-management/edit-provider';
import { UpdateProvidersKey } from '@/components/modals/providers-management/provider-key';
import { ViewProvidersDetails } from '@/components/modals/providers-management/view-details';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { findUpper, formatDate, formatter, truncateText } from '@/lib/utils';
import { Providers } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

// import { ViewUserModal } from './table-actions';

export const providersColumns: ColumnDef<Providers>[] = [
  {
    accessorKey: 'providerID',
    header: 'Provider ID',
  },
  {
    accessorKey: 'providerName',
    header: 'Provider name',
    cell: ({ row }) => {
      const provider = row.original;
      return (
        <div className='text-primary flex space-x-3 items-center'>
          <Avatar className='h-8 w-8'>
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
          <span>{row.getValue('providerName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'description',
    cell: ({ row }) => {
      return <div>{truncateText(row.getValue('description'), 40)}</div>;
    },
  },
  {
    accessorKey: 'charges',
    header: 'Service Charge',
    cell: ({ row }) => {
      const amount = formatter().format(row.getValue('charges'));

      return <div>{amount}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Added',
    cell: ({ row }) => {
      const transaction_date = formatDate(row.getValue('createdAt'));

      return <div className=''>{transaction_date}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const provider = row.original;

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
              <ViewProvidersDetails provider={provider} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditProvidersDetails provider={provider} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <UpdateProvidersKey provider={provider} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
