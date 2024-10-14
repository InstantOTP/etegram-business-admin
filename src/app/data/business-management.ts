'use server';
import { getTokens, http } from '../actions/httpConfig';

export async function getAllBusinesses() {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/business`, {
        next: {
          tags: [`allBusinesses`],
        },
      });
      console.log(response);
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

export async function getSingleBusiness(businessID: string) {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/business?businessID=${businessID}`, {
        next: {
          tags: [`business-${businessID}`],
        },
      });
      console.log(response);
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
