import { getTransactions } from '@/app/data/transactions';
import { transactionParams } from '../page';
import { DataTable } from '@/components/ui/data-table';
import { userRequestSMSColumns } from '../table-columns/receive-sms-columns';

export default async function UserSMSTransactions({
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
  const userSMSTransactions = await getTransactions(
    page,
    limit,
    search,
    status,
    'requestSMS',
    userID
  );
  return (
    <div>
      <DataTable
        columns={userRequestSMSColumns}
        data={userSMSTransactions?.data || []}
        totalPages={userSMSTransactions?.totalPages || 0}
        hideSearch
      />
    </div>
  );
}
