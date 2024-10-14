import { getAllUsers } from '@/app/data/user-management';
import { DataTable } from '@/components/ui/data-table';
import { User } from '@/types/user';
import { userColumns } from './columns';
import { usersFilter } from './data';
import StatsCard from './stats-cards';

type responseType = {
  users: {
    data: User[];
    currentPage: string;
    totalPages: number;
    totalDocuments: number;
  };
  userCounts: { totalUsers: number; inactiveUsers: number };
  message?: string;
};

export default async function UsersSection({
  search,
  status,
  limit,
  page,
}: {
  search: string;
  status: string;
  limit: string;
  page: string;
}) {
  const users: responseType = await getAllUsers(page, limit, search, status);

  if (users?.message) {
    return (
      <section>
        <h1>{users?.message}</h1>
        <p>Please, refresh</p>
      </section>
    );
  }

  return (
    <section className='space-y-12'>
      <StatsCard count={users?.userCounts} />
      <DataTable
        title='Users List'
        columns={userColumns}
        data={users?.users?.data || []}
        totalPages={users?.users?.totalPages || 0}
        filterOptions={usersFilter}
        searchPlaceholder='Search username...'
      />
    </section>
  );
}
