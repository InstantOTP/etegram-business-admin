'use server';
import { http, getTokens } from '../actions/httpConfig';

export async function getAllRoles(
  page = '1',
  limit = '100',
  search = '',
  status = ''
) {
  const { access_token } = await getTokens();
  let searchTerm = search ? `search=${search}` : '';
  let statusTerm = status ? `status=${status}` : '';

  if (access_token) {
    try {
      const response = await http(`/roles`, {
        next: {
          tags: ['allRoles'],
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

export async function getSingleRole(id: string) {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/roles?roleID=${id}`, {
        next: {
          tags: [`singleRole-${id}`],
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

export async function getPermissions() {
  const { access_token } = await getTokens();

  if (access_token) {
    try {
      const response = await http(`/role-permissions`, {
        next: {
          tags: ['allPermissions'],
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
