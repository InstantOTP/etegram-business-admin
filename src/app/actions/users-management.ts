'use server';
import { getTokens, http } from './httpConfig';
import { revalidateTag } from 'next/cache';

export async function updateUserStatus(dataToSubmit: {
  userID: string;
  status: string;
}) {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/user`, {
        method: 'PATCH',
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();
      if (!response.ok) {
        return { message: data };
      }
      revalidateTag('allUsers');
      revalidateTag(`single-user-${dataToSubmit.userID}`);
      return {
        message:
          data?.status === 'active' ? 'User Restored' : 'User Restricted',
        status: 'successful',
      };
    } catch (error) {
      if (error) {
        console.error(error);
        return {
          message: 'User Update failed',
          status: 'failed',
        };
      }
      return null;
    }
  }
}
