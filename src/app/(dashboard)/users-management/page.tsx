import { Suspense } from 'react';
import UsersSection from './users-section';
import { LucideLoader2 } from 'lucide-react';

export default async function UsersManagementPage({
  searchParams,
}: {
  searchParams: { query: string; status: string; page: string; limit: string };
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const limit = searchParams.limit ?? 100;
  const page = searchParams.page ?? 1;

  return (
    <Suspense
      fallback={
        <section className='h-[60svh] flex justify-center items-center'>
          <div className='flex flex-col space-y-3 justify-center items-center'>
            <LucideLoader2 className='w-8 h-9 animate-spin text-primary' />
            <p>Fetching users</p>
          </div>
        </section>
      }
    >
      <UsersSection
        search={search}
        limit={limit}
        page={page}
        status={status}
      />
    </Suspense>
  );
}
