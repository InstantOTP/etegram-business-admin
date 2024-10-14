import { getAllRoles } from '@/app/data/roles-and-permissions';
import AdminForm from '@/components/forms/admin';
import { rolesResponseType } from '../../roles-management/page';

export default async function CreateAdminPage() {
  const roles: rolesResponseType = await getAllRoles();
  return (
    <section className='bg-background w-full rounded-md p-5'>
      <AdminForm roles={roles.data} />
    </section>
  );
}
