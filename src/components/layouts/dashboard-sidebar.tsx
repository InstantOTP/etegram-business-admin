'use client';

import { adminSidebarLinks } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import Logout from '../common/buttons/logout';
import Logo from '../common/logo';

const DashboardSidebar = ({ user }: { user: any }) => {
  const pathname = usePathname();
  const hideLinks = useCallback(
    (permission: string) => {
      if (permission === 'All') {
        return false;
      } else if (user?.role?.permissions.includes(permission)) {
        return false;
      } else {
        return true;
      }
    },
    [user]
  );

  return (
    <aside className='hidden lg:block w-full max-w-[15.625rem] h-svh shadow-md bg-background overflow-y-auto pb-8  border-r styled-scrollbar'>
      <div className='px-5 sticky top-0 left-0 pt-8 z-10 bg-background'>
        <Logo small />
      </div>

      <ul className='mt-6 grid gap-y-3'>
        {adminSidebarLinks.map((item, index) => {
          return (
            <li key={index}>
              <h6 className='py-3 pl-6 font-manrope text-foreground font-medium'>
                {item.heading}
              </h6>
              <ul>
                {item.links.map((item, index) => {
                  const { icon: Icon } = item;
                  return (
                    <li
                      key={index}
                      className={cn(
                        'w-full hover:bg-primary/10 text-foreground/60 font-medium  transition-colors relative before:absolute before:w-[6px] before:h-full before:bg-transparent before:left-0 before:top-0',
                        {
                          'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary before:bg-primary':
                            item.path === pathname,
                          hidden: hideLinks(item.permission),
                        }
                      )}
                    >
                      <Link
                        href={item.path}
                        className='flex w-full items-center gap-x-3  py-3 pl-6'
                      >
                        <Icon className='w-5 h-5' />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <ul className='mt-7'>
        {/* <li
          className={cn(
            'w-full hover:bg-primary/10 text-foreground/60 font-medium  transition-colors relative before:absolute before:w-[6px] before:h-full before:bg-transparent before:left-0 before:top-0',
            {
              'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary before:bg-primary':
                '/dashboard/settings' === pathname,
            }
          )}
        >
          <Link
            href={'/dashboard/settings'}
            className='flex w-full items-center gap-x-3  py-3 pl-6'
          >
            <Setting2 className='w-5 h-5' />
            <span>Settings</span>
          </Link>
        </li> */}
        <li
          className={cn(
            'w-full text-destructive-foreground/90 font-medium transition-colors'
          )}
        >
          {/* <button className='flex w-full items-center gap-x-3  py-3 pl-6 '>
            <Login className='w-5 h-5' />
            <span>Log Out</span>
          </button> */}
          <Logout position='sidebar' />
        </li>
      </ul>
    </aside>
  );
};

export { DashboardSidebar };
