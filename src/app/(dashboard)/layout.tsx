import { DashboardHeader } from '@/components/layouts/dashboard-header';
import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { getUser } from '../data/user';
import { User } from '@/components/layouts/dashboard-header';
import IsAuthenticated from './auth-layout';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User = await getUser();
  return (
    <ThemeProvider
      storageKey='theme'
      attribute='class'
      defaultTheme='light'
      enableSystem
    >
      <IsAuthenticated user={user}>
        <section className='bg-accent flex w-full min-h-svh overflow-y-hidden'>
          <DashboardSidebar user={user} />
          <section className='relative flex-1 w-full'>
            <DashboardHeader user={user} />
            <main className='w-full lg:h-[85.1svh] overflow-y-auto px-5 pt-28 pb-8 lg:pt-8'>
              {children}
            </main>
          </section>
        </section>
      </IsAuthenticated>
    </ThemeProvider>
  );
}
