'use server';
import { getTokens, http } from '../actions/httpConfig';

export async function getServiceCharges() {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/configuration`, {
        next: {
          tags: ['service-charges'],
        },
      });
      //   console.log(response);
      const data = await response.json();
      if (!response.ok) {
        return { message: data };
      }
      //   console.log(data);
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
