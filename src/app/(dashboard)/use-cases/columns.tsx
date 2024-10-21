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
import { industryType } from '../industries/page';
import { IndustryModal } from '@/components/modals/generics/industries';
import { useCasesType } from './page';
// import { ViewUserModal } from './table-actions';

export const useCaseColumns: ColumnDef<useCasesType>[] = [
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
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {truncateText(row.getValue('name'), 15)}
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <div className='text-primary'>
          {truncateText(row.getValue('description'), 30)}
        </div>
      );
    },
  },

  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      let status: string = row.getValue('active');

      return (
        <div
          className={cn(
            `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-1 capitalize w-fit`,
            {
              'bg-[#EC0E0E1A] text-[#EC0E0E]': !status,
            }
          )}
        >
          {status ? <Check className='w-3 h-3' /> : <X className='w-3 h-3' />}

          <span>{status ? 'Active' : 'Inactive'}</span>
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
  //   {
  //     id: 'actions',
  //     header: 'Action',
  //     cell: ({ row }) => {
  //       const industry = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button
  //               variant='ghost'
  //               className='h-8 w-8 p-0'
  //             >
  //               <span className='sr-only'>Open menu</span>
  //               <MoreVertical className='h-4 w-4' />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent
  //             align='end'
  //             className=''
  //           >
  //             <DropdownMenuItem>
  //               <div className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'>
  //                 <Eye className='w-4 h-4' />
  //                 <span>View Details</span>
  //               </div>
  //             </DropdownMenuItem>

  //             <DropdownMenuItem asChild>
  //               <IndustryModal industry={industry} />
  //             </DropdownMenuItem>
  //             {/* <UpdateStatus user={user} /> */}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
