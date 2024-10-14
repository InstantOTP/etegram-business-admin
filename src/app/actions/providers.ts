'use server';
import { http } from './httpConfig';
import { PrevStateProps } from './auth';
import {
  providerDetailsSchema,
  providerKeySchema,
} from '@/lib/form-schema/auth';
import { revalidateTag } from 'next/cache';

export interface UpdateProviderState extends PrevStateProps {
  errors?: {
    description?: string[];
    providerName?: string[];
    providerIcon?: string[];
    charges?: string[];
  };
  providerID?: string;
}

export interface UpdateProviderKeyState extends PrevStateProps {
  errors?: {
    providerKey?: string[];
  };
  providerID?: string;
}

export async function updateProvider(
  prevState: UpdateProviderState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = providerDetailsSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = {
    providerID: prevState?.providerID,
    ...dataToSubmit,
  };

  try {
    // console.log(dataToSend);
    const response = await http('/provider', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    // console.log(data);
    revalidateTag('allProviders');

    return {
      ...prevState,
      message: 'Provider details Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Failed to update details.',
        status: 'failed',
      };
    }
  }
}

export async function updateProviderKey(
  prevState: UpdateProviderKeyState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = providerKeySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = {
    providerID: prevState?.providerID,
    ...dataToSubmit,
  };

  try {
    // console.log(dataToSend);
    const response = await http('/provider', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    // console.log(data);
    revalidateTag('allProviders');

    return {
      ...prevState,
      message: 'Provider details Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Failed to update details.',
        status: 'failed',
      };
    }
  }
}
