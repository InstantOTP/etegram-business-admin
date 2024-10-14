'use server';
import { http, getTokens } from '../actions/httpConfig';

export async function getAllProfits(startDate = '', endDate = '') {
  const { access_token } = await getTokens();
  //   let searchTerm = search ? `search=${search}` : '';
  //   let statusTerm = status ? `status=${status}` : '';

  if (access_token) {
    try {
      const response = await http(
        `/transaction-profits?startDate=${startDate}&endDate=${endDate}`,
        {
          next: {
            tags: [`profits-${startDate}-${endDate}`],
          },
        }
      );
      //   console.log(response);
      const data = await response.json();
      //   console.log(data);

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
