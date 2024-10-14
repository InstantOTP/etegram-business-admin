'use server';

import {
  createOnDemandAppProfileSchema,
  createOnDemandAppSchema,
  RoleSchema,
  updateOnDemandAppSchema,
  updateOnDemandAppProfileSchema,
} from '@/lib/form-schema/auth';
import { PrevStateProps } from './auth';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { http } from './httpConfig';

export interface CreateOnDemandAppState extends PrevStateProps {
  errors?: {
    icon?: string[];
    name?: string[];
    amount?: string[];
  };
}

export interface UpdateOnDemandAppState extends PrevStateProps {
  errors?: {
    icon?: string[];
    name?: string[];
    amount?: string[];
    status?: string[];
  };
  onDemandApplicationID?: string;
}

export interface CreateOnDemandAppProfileState extends PrevStateProps {
  errors?: {
    icon?: string[];
    number?: string[];
    password?: string[];
    description?: string[];
  };
  onDemandApplicationID?: string;
}

export interface UpdateOnDemandAppProfileState extends PrevStateProps {
  errors?: {
    icon?: string[];
    number?: string[];
    password?: string[];
    description?: string[];
  };
  onDemandNumberID?: string;
}

// CREATE ROLE ACTION
export async function createOnDemandApp(
  prevState: CreateOnDemandAppState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = createOnDemandAppSchema.safeParse(data);

  //   const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  const dataToSubmit = validatedFields.data;

  try {
    // console.log(dataToSubmit);
    const response = await http('/on-demand', {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('allApps');
    return {
      status: 'success',
      message: 'App added successfully',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'App creation failed',
        status: 'failed',
      };
    }
  }

  // redirect(`/roles-management`);
}

export async function updateOnDemandApp(
  prevState: UpdateOnDemandAppState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = updateOnDemandAppSchema.safeParse(data);

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
    onDemandApplicationID: prevState?.onDemandApplicationID,
    ...dataToSubmit,
  };

  try {
    // console.log(dataToSend);
    const response = await http('/on-demand', {
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
    revalidateTag('allApps');

    return {
      ...prevState,
      message: 'App details Updated',
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

export async function createOnDemandAppProfile(
  prevState: CreateOnDemandAppProfileState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = createOnDemandAppProfileSchema.safeParse(data);

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
    onDemandApplicationID: prevState?.onDemandApplicationID,
    ...dataToSubmit,
  };

  try {
    // console.log(dataToSend);
    const response = await http('/on-demand-number', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('all-apps-profile');
    return {
      ...prevState,
      message: 'App profile created',
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

export async function updateOnDemandAppProfile(
  prevState: UpdateOnDemandAppProfileState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  const validatedFields = updateOnDemandAppProfileSchema.safeParse(data);

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
    onDemandNumberID: prevState?.onDemandNumberID,
    ...dataToSubmit,
  };

  try {
    // console.log(dataToSend);
    const response = await http('/on-demand-number', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('all-apps-profile');
    return {
      ...prevState,
      message: 'App profile updated',
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

export async function getPassword(id: string) {
  try {
    if (id) {
      const response = await http(
        `/on-demand/view-password?onDemandNumberID=${id}`,
        {
          next: { tags: [`view-password-${id}`] },
        }
      );

      // console.log(response);
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        return { message: data };
      }

      return data;
    } else {
      return null;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
    return null;
  }
}
