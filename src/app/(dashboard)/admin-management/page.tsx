import { getAllAdmin } from '@/app/data/admin-management';
import { DataTable } from '@/components/ui/data-table';
import { Admin } from '@/types/user';
import { Suspense } from 'react';
import { adminColumns } from './columns';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { CreateAdminModal } from '@/components/modals/admin/create-admin';
import { rolesResponseType } from '../roles-management/page';
import { getAllRoles } from '@/app/data/roles-and-permissions';
// import { usersFilter } from './data';

type responseType = {
  data: Admin[];
  currentPage: string;
  totalPages: number;
  totalDocuments: number;
};

export default async function AdminManagementPage({
  searchParams,
}: {
  searchParams: { query: string; status: string; page: string; limit: string };
}) {
  const search = searchParams.query ?? '';
  const status = searchParams.status ?? '';
  const limit = searchParams.limit ?? 100;
  const page = searchParams.page ?? 1;
  const admins: responseType = await getAllAdmin(page, limit, search, status);
  const roles: rolesResponseType = await getAllRoles();
  return (
    <section className='space-y-6'>
      <div className='flex justify-end'>
        <CreateAdminModal roles={roles?.data} />
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <DataTable
          title='Admins List'
          columns={adminColumns}
          data={admins?.data || []}
          totalPages={admins?.totalPages || 0}
          // filterOptions={usersFilter}
          searchPlaceholder='Search username...'
        />
      </Suspense>
    </section>
  );
}
