import { getTransactions } from '@/app/data/transactions';
import { getAllUsers } from '@/app/data/user-management';
import { DataTable } from '@/components/ui/data-table';
import { rolesColumns } from './columns';
import { Admin, Roles, User } from '@/types/user';
import { Suspense } from 'react';
import { getAllAdmin } from '@/app/data/admin-management';
import { getAllRoles } from '@/app/data/roles-and-permissions';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
// import { usersFilter } from './data';

export type rolesResponseType = {
  data: Roles[];
  currentPage: string;
  totalPages: number;
  totalDocuments: number;
};

export default async function RolesManagementPage({
  searchParams,
}: {
  searchParams: { query: string; status: string; page: string; limit: string };
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const limit = searchParams.limit ?? 100;
  const page = searchParams.page ?? 1;
  const roles: rolesResponseType = await getAllRoles(
    page,
    limit,
    search,
    status
  );
  return (
    <section className='space-y-6'>
      <div className='flex justify-end'>
        <Link
          href={'/roles-management/create-role'}
          className={buttonVariants({ size: 'xl' })}
        >
          Create Role
        </Link>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <DataTable
          title='Roles'
          columns={rolesColumns}
          data={roles?.data || []}
          totalPages={roles?.totalPages || 0}
          hideSearch
          searchPlaceholder='Search username...'
        />
      </Suspense>
    </section>
  );
}
