import { getSingleUser } from '@/app/data/user-management';
import CopyToClipBoard from '@/components/common/buttons/copy';
import GoBackButton from '@/components/common/buttons/go-back';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  UsersTabs,
} from '@/components/ui/tabs';
import { cn, findUpper, formatDateWithTime, formatter } from '@/lib/utils';
import { User } from '@/types/user';
import { Coin, Wallet } from 'iconsax-react';
import { Suspense } from 'react';
import UserSMSTransactions from './tab-contents/sms';
import UserWalletTransactions from './tab-contents/wallet';

export type transactionParams = {
  query: string;
  status: string;
  page: string;
  limit: string;
  type: string;
};

export default async function UserDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: transactionParams;
}) {
  const user: User | undefined = await getSingleUser(params.id);

  return (
    <section className='space-y-10'>
      <GoBackButton />
      <section className='section-grid text-sm gap-5 w-full font-inter'>
        <div className='card-sm w-full'>
          <div className='flex space-x-5'>
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src={''}
                alt={`@${user?.username}`}
                className='object-cover'
              />
              <AvatarFallback>
                {user ? findUpper(`${user?.username}`) : 'U'}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className='font-semibold text-primary'>@{user?.username}</p>
              <div>
                <p className='italic'>
                  <span className='font-semibold'>Joined Since: </span>{' '}
                  {user && formatDateWithTime(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center mt-3'>
            <div className='space-y-1'>
              <p className='font-medium'>Phone Number</p>
              <div className='flex items-center space-x-2'>
                <p>{user?.phone}</p>
                {user?.phone && (
                  <CopyToClipBoard
                    text={user.phone}
                    className='w-4 h-4'
                  />
                )}
              </div>
            </div>
            <div className='space-y-1'>
              <p className='font-medium'>Status</p>
              <p
                className={cn(
                  `py-0.5 px-2 rounded-2xl bg-[#ECFDF3] text-[#027A48] font-inter text-xs font-medium flex items-center space-x-1 capitalize w-fit`,
                  {
                    'bg-[#EC0E0E1A] text-[#EC0E0E]':
                      user?.status === 'restricted',
                    'bg-[#FFD2431A] text-[#FFD243]': user?.status === 'pending',
                  }
                )}
              >
                {user?.status}
              </p>
            </div>
          </div>
          <div className='mt-3 space-y-1'>
            <p className='font-medium'>Email</p>
            <div className='flex items-center space-x-2'>
              <p>{user?.email}</p>
              {user?.email && (
                <CopyToClipBoard
                  text={user.email}
                  className='w-4 h-4 font-medium'
                />
              )}
            </div>
          </div>
        </div>
        <div className='card-xs'>
          <div className='flex flex-col justify-between w-full h-full'>
            <div>
              <Coin className='bg-accent text-primary rounded' />
              <h3 className='text-lg font-semibold mt-1'>Referral</h3>
            </div>
            <div>
              <p>
                <span className='font-medium'>Referral Wallet:</span>{' '}
                {user && formatter().format(user?.referralWallet)}
              </p>
              <p>
                {' '}
                <span className='font-medium'>Referral Code:</span>{' '}
                {user?.referralCode}
              </p>
            </div>
          </div>
        </div>
        <div className='card-2xs w-full'>
          <div className='flex flex-col justify-between w-full h-full'>
            <div>
              <Wallet className='bg-accent text-primary rounded' />
              <h3 className='text-lg font-semibold mt-1'>Wallet Balance</h3>
            </div>
            <p className='text-3xl'>
              {user && formatter().format(user?.wallet)}
            </p>
          </div>
        </div>

        {/* <div className='card-3xs'>
          <Wallet />
          <h3>Total Transactions</h3>
          <p>{user ? user?.pushedNumbers + user?.rentedNumbers : 0}</p>
        </div> */}
      </section>
      <section>
        <h3 className='lg:text-2xl font-bold mb-4'>User&apos;s Transactions</h3>
        <UsersTabs defaultValue='sms'>
          {/* <Tabs
          defaultValue='sms'
          className='w-full bg-background max-w-[72.5rem] rounded-[0.625rem]'
        > */}
          <TabsList>
            <TabsTrigger value='sms'>Receive SMS</TabsTrigger>
            <TabsTrigger value='wallet'>Wallet</TabsTrigger>
          </TabsList>
          <TabsContent value='sms'>
            <Suspense fallback={<h3>Loading...</h3>}>
              <UserSMSTransactions
                searchParams={searchParams}
                userID={params.id}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value='wallet'>
            <Suspense fallback={<h3>Loading...</h3>}>
              <UserWalletTransactions
                searchParams={searchParams}
                userID={params.id}
              />
            </Suspense>{' '}
          </TabsContent>
        </UsersTabs>

        {/* </Tabs> */}
      </section>
    </section>
  );
}
