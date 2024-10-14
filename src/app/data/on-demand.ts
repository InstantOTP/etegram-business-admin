'use server';
import { http, getTokens } from '../actions/httpConfig';

export async function getOnDemandApps(
  page = '1',
  limit = '100',
  search = '',
  status = '',
  appID = ''
  //   startDate = '',
  //   endDate = ''
) {
  const searchTerm = search ? `&name=${search}` : '';
  const statusTerm = status ? `&status=${status}` : '';
  const appIDTerm = appID ? `&onDemandApplicationID=${appID}` : '';
  //   const startDateTerm = startDate ? `&start=${startDate}` : '';
  //   const endDateTerm = endDate ? `&end=${endDate}` : '';

  // console.log(statusTerm);

  const { access_token } = await getTokens();
  if (access_token) {
    try {
      const response = await http(
        `/on-demand?page=${page}&limit=${limit}${searchTerm}${statusTerm}${appIDTerm}`,
        {
          next: {
            tags: [
              `on-demand-${page}-${limit}-${status}-${search}-${appID}`,
              'all-apps',
            ],
          },
        }
      );
      // console.log(response);
      const data = await response.json();
      if (!response.ok) {
        return { message: data };
      }
      // console.log(data);
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

export async function getOnDemandAppsProfiles(
  page = '1',
  limit = '100',
  appID = '',
  search = '',
  status = ''
  //   startDate = '',
  //   endDate = ''
) {
  const searchTerm = search ? `&name=${search}` : '';
  const statusTerm = status ? `&status=${status}` : '';
  const appIDTerm = appID ? `&onDemandApplicationID=${appID}` : '';
  //   const startDateTerm = startDate ? `&start=${startDate}` : '';
  //   const endDateTerm = endDate ? `&end=${endDate}` : '';

  // console.log(statusTerm);

  const { access_token } = await getTokens();
  if (access_token) {
    try {
      const response = await http(
        `/on-demand-number?page=${page}&limit=${limit}${searchTerm}${statusTerm}${appIDTerm}`,
        {
          next: {
            tags: [
              `on-demand-profile-${page}-${limit}-${status}-${search}-${appID}`,
              'all-apps-profile',
            ],
          },
        }
      );
      // console.log(response);
      const data = await response.json();
      if (!response.ok) {
        return { message: data };
      }
      // console.log(data);
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
