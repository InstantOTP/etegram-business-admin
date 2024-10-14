'use server';
import { http } from './httpConfig';
import { revalidateTag } from 'next/cache';
// LOGOIT ACTION
export async function updateBusiness(businessID: string, dataToSend: any) {
  // console.log(prevState?.id);
  try {
    const response = await http(`/business/${businessID}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return { message: data?.message, status: 'failed' };
    }
    revalidateTag('allBusinesses');
    return { message: 'Business Updated', status: 'success' };
  } catch (error: any) {
    if (error) {
    }
  }
}
