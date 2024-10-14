import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';
import { walletTransactionColumns } from './columns';
import { transactionsFilter } from '../request-sms-transactions/data';

export default async function WalletTransactionPage({
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
    'topUp',
    '',
    startDate,
    endDate
  );
  return (
    <section>
      <Suspense fallback={<h3>Loading...</h3>}>
        <DataTable
          title='Wallet Transactions'
          columns={walletTransactionColumns}
          data={transactions?.data || []}
          totalPages={transactions?.totalPages || 0}
          filterOptions={transactionsFilter}
          searchPlaceholder='Search Transaction ID...'
          showAdvanced
        />
      </Suspense>
    </section>
  );
}
