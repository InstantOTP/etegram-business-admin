'use server';
import {
  UpdatePasswordSchema,
  UpdatePinSchema,
  UpdateProfileSchema,
} from '@/lib/form-schema/auth';
import { PrevStateProps } from './auth';
import { http } from './httpConfig';
import { revalidateTag } from 'next/cache';

export interface UpdatePasswordState extends PrevStateProps {
  errors?: {
    oldPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
  };
}
export interface UpdateProfileState extends PrevStateProps {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    phone?: string[];
  };
}

export interface UpdatePinState extends PrevStateProps {
  errors?: {
    pin?: string[];
    confirmPin?: string[];
  };
}

// UPDATE PROFILE
export async function updateProfile(
  prevState: UpdateProfileState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = UpdateProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  try {
    const response = await http('/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    // console.log(data);

    return {
      ...prevState,
      message: 'Password Successfully Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Update Password failed',
        status: 'failed',
      };
    }
  }
  // redirect(`/auth/select-service?${redirectUrl}`);
}

// LOGIN ACTION
export async function updatePassword(
  prevState: UpdatePasswordState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = UpdatePasswordSchema.safeParse(data);

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
    oldPassword: dataToSubmit.oldPassword,
    newPassword: dataToSubmit.newPassword,
  };

  try {
    const response = await http('/change-password', {
      method: 'PATCH',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    // console.log(data);

    return {
      ...prevState,
      message: 'Password Successfully Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Update Password failed',
        status: 'failed',
      };
    }
  }
  // redirect(`/auth/select-service?${redirectUrl}`);
}

// LOGIN ACTION
export async function updatePin(
  prevState: UpdatePinState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = UpdatePinSchema.safeParse(data);

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
    withdrawalPIN: dataToSubmit.pin,
  };

  try {
    const response = await http('/user', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('user');
    return {
      ...prevState,
      message: 'Pin Updated Successful',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Update Password failed',
        status: 'failed',
      };
    }
  }
  // redirect(`/auth/select-service?${redirectUrl}`);
}
