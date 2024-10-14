import { Suspense } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { getAllProviders } from '@/app/data/providers';
import { Providers } from '@/types/user';
import { providersColumns } from './columns';

export default async function ProvidersManagement() {
  const providers: Providers[] | undefined = await getAllProviders();
  // console.log(providers);
  return (
    <section>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title='Providers'
            columns={providersColumns}
            data={providers || []}
            totalPages={1}
            hideSearch
          />
        </div>
      </Suspense>
    </section>
  );
}
