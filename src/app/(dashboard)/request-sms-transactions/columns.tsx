'use client';

import {
  cn,
  formatDate,
  formatDateWithTime,
  formatter,
  truncateText,
} from '@/lib/utils';
import { Transaction } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CornerUpLeft, X } from 'lucide-react';
import Link from 'next/link';
// import { ViewUserModal } from './table-actions';

export const requestSMSColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'transactionID',
    header: 'Transaction ID',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {truncateText(row.getValue('transactionID'), 15)}
        </div>
      );
    },
  },
  {
    accessorKey: 'userID',
    header: 'User ID',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          <Link href={`/users-management/${row.getValue('userID')}`}>
            {truncateText(row.getValue('userID'), 15)}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'countryName',
    header: 'Country Name',
  },
  {
    accessorKey: 'applicationName',
    header: 'App Name',
    cell: ({ row }) => {
      const appName: string = row.getValue('applicationName');

      return <div>{truncateText(appName, 12, 10)}</div>;
    },
  },
  {
    accessorKey: 'providerName',
    header: 'Provider Name',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => {
      const phone: string = row.getValue('phoneNumber');

      return <div>{phone ? `+${phone}` : 'No Number'}</div>;
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
              'bg-[#FFD2431A] text-[#FFD243]': status === 'pending',
            }
          )}
        >
          {status === 'successful' ? (
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
];
