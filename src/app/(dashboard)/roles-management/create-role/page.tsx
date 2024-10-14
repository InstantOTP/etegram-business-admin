import { getPermissions } from '@/app/data/roles-and-permissions';
import RolesForm from '@/components/forms/roles';
import { Permissions } from '@/types/user';

export default async function CreateRolePage() {
  const permissions: Permissions[] = await getPermissions();
  return (
    <section className='bg-background w-full rounded-md p-5'>
      <RolesForm
        permissions={permissions}
        isEditing={false}
      />
    </section>
  );
}
