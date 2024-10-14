'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getTokens() {
  const access_token = cookies().get('access_token')?.value;
  const refresh_token = cookies().get('refresh_token')?.value;
  return {
    access_token,
    refresh_token,
  };
}

//CUSTOM FETCH REQUEST WITH ACCESS TOKEN INCLUDED IF AVAILABLE
export async function http(url: string, options?: any) {
  const { access_token } = await getTokens();

  let headerOptions = {
    headers: {},
  };

  if (access_token) {
    headerOptions = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  return fetch(`${process.env.API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headerOptions?.headers,
    },
  });
}
