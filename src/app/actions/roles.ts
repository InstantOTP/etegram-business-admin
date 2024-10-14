'use server';

import { RoleSchema } from '@/lib/form-schema/auth';
import { PrevStateProps } from './auth';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { http } from './httpConfig';

export interface CreateRoleState extends PrevStateProps {
  errors?: {
    title?: string[];
    permissions?: string[];
  };
  id?: string;
}
// CREATE ROLE ACTION
export async function createRole(
  prevState: CreateRoleState | undefined,
  formData: FormData
) {
  let dataToSend = {
    title: formData.get('title'),
    permissions: formData.getAll('permissions'),
  };

  const validatedFields = RoleSchema.safeParse(dataToSend);

  //   const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  try {
    const response = await http('/roles', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('allRoles');
  } catch (error) {
    if (error) {
      return {
        message: 'Role creation failed',
        status: 'failed',
      };
    }
  }

  redirect(`/roles-management`);
}

// EDIT ROLE ACTION
export async function editRole(
  prevState: CreateRoleState | undefined,
  formData: FormData
) {
  let dataToSend = {
    roleID: prevState?.id,
    title: formData.get('title'),
    permissions: formData.getAll('permissions'),
  };

  const validatedFields = RoleSchema.safeParse(dataToSend);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  try {
    // console.log(dataToSend);
    const response = await http('/roles', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('allRoles');
  } catch (error) {
    if (error) {
      return {
        message: 'Role creation failed',
        status: 'failed',
      };
    }
  }

  redirect(`/roles-management`);
}
