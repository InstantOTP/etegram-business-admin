import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { requestSMSColumns } from './columns';
import { transactionsFilter } from './data';

export default async function RequestSMSTransactionPage({
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

  const transactions = await getTransactions(
    page,
    limit,
    search,
    status,
    'requestSMS',
    '',
    startDate,
    endDate
  );
  return (
    <section>
      <Suspense fallback={<h3>Loading...</h3>}>
        <div>
          <DataTable
            title='Request SMS Transactions'
            columns={requestSMSColumns}
            data={transactions?.data || []}
            totalPages={transactions?.totalPages || 0}
            filterOptions={transactionsFilter}
            searchPlaceholder='Search Transaction ID...'
            showAdvanced={true}
          />
        </div>
      </Suspense>
    </section>
  );
}
