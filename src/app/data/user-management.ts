'use server';
import { http, getTokens } from '../actions/httpConfig';

export async function getAllUsers(
  page = '1',
  limit = '100',
  search = '',
  status = ''
) {
  const { access_token } = await getTokens();
  let searchTerm = search ? `&search=${search}` : '';
  let statusTerm = status ? `&status=${status}` : '';

  if (access_token) {
    try {
      const response = await http(
        `/all-users?page=${page}&limit=${limit}${searchTerm}${statusTerm}`,
        {
          next: {
            tags: [`allUsers-${search}-${status}-${page}-${limit}`, 'allUsers'],
          },
        }
      );
      // console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        return { message: data };
      }
      return data;
    } catch (error) {
      if (error) {
        // console.log(error);
        console.error(error);
        return { message: 'Failed to fetch Users' };
      }
      return null;
    }
  }
  return null;
}

export async function getSingleUser(userID: string) {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/user?userID=${userID}`, {
        next: {
          tags: [`single-user-${userID}`],
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
