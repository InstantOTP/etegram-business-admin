'use server';

import { CreateAdminSchema } from '@/lib/form-schema/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrevStateProps } from './auth';
import { http } from './httpConfig';

export interface CreateAdminState extends PrevStateProps {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    role?: string[];
    phone?: string[];
  };
  id?: string;
}

export interface DeleteAdminState {
  message?: string;
  status?: string;
  id?: string;
}

// CREATE ADMIN ACTION
export async function createAdmin(
  prevState: CreateAdminState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = CreateAdminSchema.safeParse(data);

  //   const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  try {
    const response = await http('/auth', {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('allAdmin');
    return {
      message: 'Admin Created',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Admin creation failed',
        status: 'failed',
      };
    }
  }
}

// CREATE ADMIN ACTION
export async function updateAdmin(
  prevState: CreateAdminState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = CreateAdminSchema.safeParse(data);

  //   const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  const dataToSend = {
    ...dataToSubmit,
    adminID: prevState?.id,
  };

  try {
    const response = await http('/', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('allAdmin');
    // console.log(dataToSend);
    return {
      ...prevState,
      message: 'Admin Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      // console.log(error);
      return {
        ...prevState,
        message: 'Admin creation failed',
        status: 'failed',
      };
    }
  }
}

// LOGOIT ACTION
export async function deleteAdmin(prevState: DeleteAdminState | undefined) {
  // console.log(prevState?.id);
  try {
    const response = await http(`?adminID=${prevState?.id}`, {
      method: 'DELETE',
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { ...prevState, message: data?.message, status: 'failed' };
    }
    revalidateTag('allAdmin');
    return { ...prevState, message: 'Admin Deleted', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}
