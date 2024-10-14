'use server';
import { getTokens, http } from '../actions/httpConfig';

export async function getAllProviders() {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/provider`, {
        next: {
          tags: [`allProviders`],
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return { message: data };
      }
      return data;
    } catch (error) {
      if (error) {
        console.log(error);
        console.error(error);
      }
      return null;
    }
  }
  return null;
}
