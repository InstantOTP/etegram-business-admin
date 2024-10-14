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
import { Check, CornerUpLeft, X, MoreVertical, Eye } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { updateBusiness } from '@/app/actions/business-management';
// import { ViewUserModal } from './table-actions';

export const requestSMSColumns: ColumnDef<Transaction>[] = [
  // {
  //   accessorKey: 'id',
  //   header: '',
  //   cell: ({ row }) => {
  //     return (
  //       <div className='text-primary'>
  //         {truncateText(row.getValue('transactionID'), 15)}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'name',
    header: 'Business Name',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {/* <Link href={`/users-management/${row.getValue('')}`}> */}
          {truncateText(row.getValue('name'), 15)}
          {/* </Link> */}
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {/* <Link href={`/users-management/${row.getValue('')}`}> */}
          {truncateText(row.getValue('username'), 15)}
          {/* </Link> */}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'kycApprovalStatus',
    header: 'KYC Approval',
    cell: ({ row }) => {
      let status: string = row.getValue('kycApprovalStatus');

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
          {status === 'verified' ? (
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
              'bg-[#EC0E0E1A] text-[#EC0E0E]': status === 'suspended',
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
      const business = row.original;
      const { toast } = useToast();

      async function updateBusinessStatus(businessID: string, data: any) {
        const res = await updateBusiness(businessID, data);
        if (res?.message) {
          toast({
            description: res?.message || 'Successful',
            variant: res?.status !== 'success' ? 'destructive' : 'default',
          });
        }
      }

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
              <Link href={`/business/${business.id}`}>
                <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
                  <Eye className='w-4 h-4' />
                  <span>View Details</span>
                </div>
              </Link>
            </DropdownMenuItem>

            {business?.kycApprovalStatus === 'pending' && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    updateBusinessStatus(business.id, {
                      kycApprovalStatus: 'verified',
                    })
                  }
                >
                  <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
                    <Eye className='w-4 h-4' />
                    <span>Approve KYC</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    updateBusinessStatus(business.id, {
                      kycApprovalStatus: 'rejected',
                    })
                  }
                >
                  <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
                    <Eye className='w-4 h-4' />
                    <span>Reject KYC</span>
                  </div>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              onClick={() =>
                updateBusinessStatus(business.id, {
                  status:
                    business?.status !== 'active' ? 'active' : 'suspended',
                })
              }
            >
              <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
                <Eye className='w-4 h-4' />

                <span>
                  {business?.status === 'pending'
                    ? 'Activate'
                    : business?.status === 'active'
                    ? 'Suspend'
                    : 'Restore'}{' '}
                  Business
                </span>
              </div>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <ViewUserModal user={user} />
            </DropdownMenuItem> */}
            {/* <UpdateStatus user={user} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
