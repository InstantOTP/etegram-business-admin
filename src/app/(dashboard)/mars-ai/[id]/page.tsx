import { getOnDemandAppsProfiles } from '@/app/data/on-demand';
import GoBackButton from '@/components/common/buttons/go-back';
import { CreateOnAppProfileModal } from '@/components/modals/mars-ai/create-profile';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { transactionsFilter } from '../data';
import { onDemandAppNumberColumns } from './columns';

export default async function MarsAIDetailPage({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
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

  const onDemandApps = await getOnDemandAppsProfiles(
    page,
    limit,
    params.id,
    search
    // status
  );

  let appName = onDemandApps?.data[0]?.onDemandApplication?.name || 'App';

  // console.log(onDemandApps);
  return (
    <section className='space-y-5'>
      <div className='flex justify-end'>
        <div className='flex items-center space-x-6'>
          <GoBackButton className='!bg-background !text-foreground border border-border shadow-lg' />
          <CreateOnAppProfileModal id={params.id} />
        </div>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title={`${appName} numbers`}
            columns={onDemandAppNumberColumns}
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
