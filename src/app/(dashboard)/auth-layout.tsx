'use client';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function IsAuthenticated({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (
      user === null ||
      user?.message?.includes('Unauthenticated') ||
      user?.message?.includes('The stream or file')
    ) {
      console.log(user);
      // Cookies.remove('access_token');
      // router.push(`/auth/sign-in?redirectUrl=${pathname}`);
    }
  }, [user, router, pathname]);
  return user ? children : null;
}
