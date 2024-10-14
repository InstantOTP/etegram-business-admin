import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { industryColumns } from './columns';
import { getAllBusinesses } from '@/app/data/business-management';
import { IndustryModal } from '@/components/modals/generics/industries';
import { getAllIndustries } from '@/app/data/generics';

export type industryType = {
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export default async function IndustriesPage({
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

  const transactions = await getAllBusinesses();
  const industries = await getAllIndustries();
  console.log(industries);
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
        <IndustryModal />
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title='Industry List'
            columns={industryColumns}
            data={industries?.data || []}
            totalPages={industries?.totalPages || 0}
            hideSearch
            // filterOptions={transactionsFilter}
            // searchPlaceholder='Search Transaction ID...'
          />
        </div>
      </Suspense>
    </section>
  );
}
