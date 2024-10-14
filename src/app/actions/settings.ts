'use server';
import { getTokens, http } from './httpConfig';
import { revalidateTag } from 'next/cache';
import { PrevStateProps } from './auth';
import { ServiceChargeSchema } from '@/lib/form-schema/auth';

export interface UpdateServiceChargeState extends PrevStateProps {
  errors?: {
    minimumWithdrawalAmount?: string[];
    withdrawalCharges?: string[];
    referralBonus?: string[];
  };
}

export async function updateServiceCharge(
  prevState: UpdateServiceChargeState | undefined,
  formData: FormData
) {
  //   console.log('clicked');
  const data = Object.fromEntries(formData.entries());
  // console.log(data);
  const validatedFields = ServiceChargeSchema.safeParse(data);

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
    const response = await http('/configuration', {
      method: 'PUT',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('service-charges');
    // console.log(data);

    return {
      ...prevState,
      message: 'Service charge updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Service Charge update failed',
        status: 'failed',
      };
    }
  }
  // redirect(`/auth/select-service?${redirectUrl}`);
}
