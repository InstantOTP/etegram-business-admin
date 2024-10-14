import {
  getPermissions,
  getSingleRole,
} from '@/app/data/roles-and-permissions';
import RolesForm from '@/components/forms/roles';
import { Permissions, Roles } from '@/types/user';

export default async function EditRolePage({
  params,
}: {
  params: { id: string };
}) {
  const permissions: Permissions[] = await getPermissions();
  const role: Roles = await getSingleRole(params.id);
  //   console.log(role);
  return (
    <section className='bg-background w-full rounded-md p-5'>
      <h2 className='text-3xl font-bold mb-5'>Edit role</h2>
      <RolesForm
        permissions={permissions}
        role={role}
        isEditing
        id={params.id}
      />
    </section>
  );
}
