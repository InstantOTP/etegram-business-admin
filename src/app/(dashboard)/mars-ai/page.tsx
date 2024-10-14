import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { onDemandAppColumns } from './columns';
import { transactionsFilter } from './data';
import { getOnDemandApps } from '@/app/data/on-demand';
import { CreateOnDemandAppModal } from '@/components/modals/mars-ai/create-on-demand-app';

export default async function MarsAIPage({
  searchParams,
}: {
  searchParams: {
    query: string;
    status: string;
    page: string;
    limit: string;
  };
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const limit = searchParams.limit ?? 100;
  const page = searchParams.page ?? 1;

  const onDemandApps = await getOnDemandApps(page, limit, search, status);
  return (
    <section className='space-y-5'>
      <div className='flex justify-end'>
        <CreateOnDemandAppModal />
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title='Mars AI services'
            columns={onDemandAppColumns}
            data={onDemandApps?.data || []}
            totalPages={onDemandApps?.totalPages || 0}
            filterOptions={transactionsFilter}
            searchPlaceholder='Search App name...'
          />
        </div>
      </Suspense>
    </section>
  );
}
