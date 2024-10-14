'use server';
import { redirect } from 'next/navigation';
import { getTokens, http } from '../actions/httpConfig';

export async function getUser() {
  const { access_token } = await getTokens();
  if (access_token) {
    try {
      const response = await http('/admin/profile', {
        next: { tags: ['user'] },
      });

      const data = await response.text();
      console.log(data);

      if (!response.ok) {
        return 'Failed to fetch User';
      }
      if (data === 'Unauthenticated: Invalid token') {
        // console.log('hello');
        redirect('/auth/sign-in');
      }
      // console.log(data);
      return data;
    } catch (error) {
      if (error) {
        console.error(error);
      }
      return null;
    }
  }
  return null;
}
