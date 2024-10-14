'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminSidebarLinks } from '@/lib/static-data';
import { cn, findUpper } from '@/lib/utils';
import { Notification, Setting2 } from 'iconsax-react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import Logout from '../common/buttons/logout';
import Logo from '../common/logo';
import { Sheet, SheetContent } from '../ui/sheet';
import { ModeToggle } from '../ui/toggle-theme';

export interface User {
  adminID: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  twoFactorAuthentication: boolean;
  createdAt: string;
  updatedAt: string;
  role: {
    title: string;
    permissions: string[];
  };
}

const PageTitle = ({ username }: { username: string }) => {
  return (
    <div className='flex space-x-2 items-center'>
      <h2 className='text-gradient font-semibold font-manrope text-xl lg:text-2xl'>
        Hi, {username || 'User'}
      </h2>
      <div>
        <Image
          src={'/hand.png'}
          alt='welcome'
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export const DashboardHeader = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // console.log(user);
  // const pageTitle = useMemo(() => {
  //   return sidebarLinks.find((item) => item.path === pathname)?.label;
  // }, [pathname, sidebarLinks]);

  return (
    <header className='bg-background p-5 lg:p-6 flex w-full fixed lg:sticky top-0 left-0 border-b justify-between items-center gap-x-3 z-50'>
      <div className='relative z-10 bg-transparent block lg:hidden'>
        <div className='flex items-center gap-x-1'>
          <button
            className='relative h-8 w-8 bg-transparent focus:outline-none z-50'
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='flex items-center justify-center absolute w-full'>
              <span
                aria-hidden='true'
                className={`absolute mb-2 block h-0.5 w-5 transform rounded bg-hamburger transition duration-500 ease-in-out ${
                  isNavOpen && 'translate-y-1 -rotate-45'
                }`}
              />
              <span
                aria-hidden='true'
                className={`absolute block h-0.5 w-5 transform rounded bg-hamburger transition duration-500 ease-in-out ${
                  isNavOpen && 'opacity-0 '
                }`}
              />
              <span
                aria-hidden='true'
                className={`absolute mt-2 block h-0.5 w-5 transform rounded bg-hamburger transition duration-500 ease-in-out ${
                  isNavOpen && '-translate-y-1 rotate-45'
                } `}
              />
            </div>
          </button>
          <div className='block lg:hidden'>
            {/* <PageTitle username={user?.username} /> */}
          </div>
        </div>
        {/* MObile sidebar */}
        <Sheet
          open={isNavOpen}
          onOpenChange={setIsNavOpen}
        >
          {/* <SheetOverlay className='md:hidden' /> */}
          <SheetContent
            side={'left'}
            className='lg:hidden bg-background px-0 pt-0 max-w-[250px]'
          >
            {/* <CustomSheetClose /> */}
            <div className='flex flex-col gap-y-4'>
              <div className='px-3 py-4 border-y border-border'>
                <div className='flex justify-between items-center gap-x-4'>
                  <Logo />
                  <button
                    onClick={() => setIsNavOpen(false)}
                    className='w-5 h-5 bg-[#F4F4F4] rounded-full grid place-items-center '
                  >
                    <X className='w-4 h-4 font-bold text-black' />
                  </button>
                </div>
              </div>
              <ul className='flex flex-col gap-y-3 text-lg py-3'>
                {adminSidebarLinks.map((item, index) => (
                  <li key={index}>
                    <h6 className='px-6 font-medium text-xs text-foreground'>
                      {item.heading}
                    </h6>
                    <ul>
                      {item.links.map((link) => {
                        const { icon: Icon } = link;

                        return (
                          <li
                            key={link.path}
                            className={cn(
                              'bg-background px-6 text-sm relative',
                              {
                                'bg-primary/10  hover:bg-primary/80 text-primary  font-bold':
                                  pathname === link.path,
                                hidden: hideLinks(link.permission),
                              }
                            )}
                          >
                            {pathname === link.path && (
                              <span
                                aria-hidden='true'
                                className='w-2 h-full absolute left-0 bg-primary rounded-r-[8px]'
                              />
                            )}
                            <Link
                              href={link.path}
                              className='flex items-center py-3 gap-x-4'
                              onClick={() => setIsNavOpen(false)}
                            >
                              <Icon className='w-4 h-4' />

                              <span>{link.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>

              <ul className='mt-5'>
                <li
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
                </li>
                <li
                  className={cn(
                    'w-full text-destructive-foreground/90 font-medium transition-colors'
                  )}
                >
                  {/* <button className='flex w-full items-center gap-x-3  py-3 pl-6 '>
                    <Login className='w-5 h-5' />
                    <span>Log Out</span>
                  </button> */}

                  {/* <Logout position='sidebar' /> */}
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className='hidden lg:block'>
        {/* <PageTitle username={user?.username} /> */}
      </div>

      <div className='flex gap-x-3 items-center'>
        <ModeToggle />
        <button className='relative after:absolute after:w-2 after:h-2 after:bg-destructive-foreground after:right-0.5 after:top-0 after:rounded-full'>
          <span className='sr-only'>Notifications</span>
          <Notification className='w-5 h-5' />
        </button>
        <DropdownMenu
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='relative h-8 w-8 px-0 rounded-full'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={user?.avatar}
                  alt={`@${user?.firstname}${user?.lastname}`}
                  className='object-cover'
                />
                <AvatarFallback>
                  {user
                    ? findUpper(`${user?.firstname}${user?.lastname}`)
                    : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {user?.firstname} {user?.lastname}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={'/settings'}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              className='text-destructive-foreground'
            >
              <Logout position='header' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
