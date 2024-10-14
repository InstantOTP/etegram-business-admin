import Image from 'next/image';
import { getAllProfits } from '../data/dashboard';
import { ProfitsChart } from '@/components/dashboard/profits';
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateNumeric, formatter } from '@/lib/utils';
import { getUser } from '../data/user';
import { User } from '@/components/layouts/dashboard-header';

export default async function Home() {
  const profit = await getAllProfits();
  const user: User = await getUser();
  if (!user?.role?.permissions.includes('GETPROFITS')) {
    return (
      <section className=''>
        <h1>Welcome to InstantOtp Dashboard</h1>
      </section>
    );
  }
  return (
    <section className='space-y-5'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm  text-foreground font-medium'>
              Today&apos;s Profit
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl text-primary font-bold'>
              {profit
                ? formatter().format(profit[7]?.totalAmount)
                : formatter().format(0)}
            </div>
            <p className='text-xs text-muted-foreground'>
              Total profits from today{' '}
              {profit ? profit[7].date : formatDateNumeric(new Date())}
            </p>
          </CardContent>
        </Card>
      </div>
      <Suspense>
        <ProfitsChart />
      </Suspense>
    </section>
  );
}
