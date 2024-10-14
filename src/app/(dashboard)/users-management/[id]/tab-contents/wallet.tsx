import { getTransactions } from '@/app/data/transactions';
import { DataTable } from '@/components/ui/data-table';
import { transactionParams } from '../page';
import { userWalletTransactionColumns } from '../table-columns/wallet-columns';

export default async function UserWalletTransactions({
  searchParams,
  userID,
}: {
  searchParams: transactionParams;
  userID: string;
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const type = searchParams.type ?? '';
  const limit = searchParams.limit ?? 20;
  const page = searchParams.page ?? 1;
  const userWalletTransactions = await getTransactions(
    page,
    limit,
    search,
    status,
    'topUp',
    userID
  );
  return (
    <div>
      <DataTable
        columns={userWalletTransactionColumns}
        data={userWalletTransactions?.data || []}
        totalPages={userWalletTransactions?.totalPages || 0}
        hideSearch
      />
    </div>
  );
}
