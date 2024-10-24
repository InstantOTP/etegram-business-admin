'use server';
import { http } from './httpConfig';
import { revalidateTag } from 'next/cache';
import { PrevStateProps } from './auth';
import { CreateIndustrySchema, UseCaseSchema } from '@/lib/form-schema/auth';
// LOGOIT ACTION

interface createIndustryState extends PrevStateProps {
  industryID?: string;
  errors?: {
    name?: string[];
    description?: string[];
  };
}
interface UseCasesStateProps extends PrevStateProps {
  id?: string;
  statusOnly?: boolean;
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

// *****************************USE CASES*************************************
export async function createUseCase(
  prevState: UseCasesStateProps | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UseCaseSchema.safeParse(data);

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
    const response = await http(`/use-case`, {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { ...prevState, message: data?.message, status: 'failed' };
    }
    revalidateTag('use-case');
    return { ...prevState, message: 'Industry created', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}
export async function updateUseCase(
  prevState: UseCasesStateProps | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  let dataToSubmit;

  if (!prevState?.statusOnly) {
    const validatedFields = UseCaseSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Missing fields. Try again',
        errors: validatedFields.error.flatten().fieldErrors,
        status: 'failed',
      };
    }
    dataToSubmit = validatedFields.data;
  } else {
    dataToSubmit = data;
  }

  //data to submit to database
  // console.log(dataToSubmit);
  try {
    const response = await http(`/use-case/${prevState?.id}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data?.message, status: 'failed' };
    }
    revalidateTag('use-case');
    return { ...prevState, message: 'Use Case Updated', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}

export async function deleteUseCase(id: string) {
  try {
    const response = await http(`/use-case`, {
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
