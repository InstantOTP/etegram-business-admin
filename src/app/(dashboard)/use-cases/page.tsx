import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { useCaseColumns } from './columns';
import { getAllBusinesses } from '@/app/data/business-management';
import { transactionsFilter } from '../business/data';
import { getAllUseCases } from '@/app/data/generics';
import { UseCaseModal } from '@/components/modals/generics/useCases';

export type useCasesType = {
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export default async function UsesCasesPage({
  searchParams,
}: {
  searchParams: {
    query: string;
    status: string;
    page: string;
    limit: string;
    type: string;
    startDate: string;
    endDate: string;
  };
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const type = searchParams.type ?? '';
  const limit = searchParams.limit ?? 100;
  const page = searchParams.page ?? 1;
  const startDate = searchParams.startDate ?? '';
  const endDate = searchParams.endDate ?? '';

  // const transactions = await getAllBusinesses();
  const useCases = await getAllUseCases();
  console.log(useCases);
  // console.log(transactions);
  // page,
  // limit,
  // search,
  // status,
  // 'requestSMS',
  // '',
  // startDate,
  // endDate

  return (
    <section>
      <div className='flex justify-end'>
        <UseCaseModal />
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title='Use Cases'
            columns={useCaseColumns}
            data={useCases?.data || []}
            totalPages={useCases?.totalPages || 0}
            hideSearch
            // filterOptions={transactionsFilter}
            // searchPlaceholder='Search Transaction ID...'
          />
        </div>
      </Suspense>
    </section>
  );
}
