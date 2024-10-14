'use server';
import { http } from './httpConfig';
import { revalidateTag } from 'next/cache';
import { PrevStateProps } from './auth';
import { CreateIndustrySchema } from '@/lib/form-schema/auth';
// LOGOIT ACTION

interface createIndustryState extends PrevStateProps {
  industryID?: string;
  errors?: {
    name?: string[];
    description?: string[];
  };
}

export async function createIndustry(
  prevState: createIndustryState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = CreateIndustrySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  try {
    const response = await http(`/industry`, {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { ...prevState, message: data?.message, status: 'failed' };
    }
    revalidateTag('industries');
    return { ...prevState, message: 'Industry created', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}

export async function updateIndustry(
  prevState: createIndustryState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = CreateIndustrySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  try {
    const response = await http(`/industry`, {
      method: 'PUT',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { ...prevState, message: data?.message, status: 'failed' };
    }
    revalidateTag('industries');
    return { ...prevState, message: 'Industry created', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}

export async function deleteIndustry(industryID: string) {
  try {
    const response = await http(`/industry`, {
      method: 'DELETE',
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { message: data?.message, status: 'failed' };
    }
    revalidateTag('industries');
    return { message: 'Industry created', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}
