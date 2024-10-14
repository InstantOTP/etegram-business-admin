'use client';

import { Sort } from 'iconsax-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/date-picker';
import { useState } from 'react';
import { formatDate, formatDateNumeric } from '@/lib/utils';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function AdvanceFilters() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const start = searchParams.get('startDate');
  const end = searchParams.get('endDate');

  //   console.log(end);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (startDate && endDate) {
      const start = formatDateNumeric(startDate.toLocaleString());
      const end = formatDateNumeric(endDate.toLocaleString());
      params.set('startDate', start);
      params.set('endDate', end);

      replace(`${pathname}?${params.toString()}`);
      setIsOpen(false);
    }
  };

  const resetFilter = () => {
    let params = new URLSearchParams(searchParams);
    params.delete('startDate');
    params.delete('endDate');

    replace(`${pathname}?${params}`);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='ml-auto'
        >
          <Sort className='w-4 h-4 mr-1 font-inter' />
          Advanced
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[350px]'>
        <DialogHeader>
          <DialogTitle className='text-foreground text-xl'>
            Advanced Filter
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <div>
            <p className='text-foreground text-base font-medium mb-2'>
              Select Start Date
            </p>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
            />
          </div>
          <div>
            <p className='text-foreground text-base font-medium mb-2'>
              Select End Date
            </p>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
            />
          </div>
        </div>
        <Button
          disabled={!startDate || !endDate}
          onClick={handleFilter}
        >
          Filter
        </Button>
        {start && end && (
          <Button
            variant={'destructive'}
            onClick={resetFilter}
            className='hover:bg-destructive'
          >
            Clear
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
