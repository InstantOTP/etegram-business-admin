'use server';
import { http, getTokens } from '../actions/httpConfig';

export async function getTransactions(
  page = '1',
  limit = '100',
  search = '',
  status = '',
  type = '',
  userID = '',
  startDate = '',
  endDate = ''
) {
  const searchTerm = search ? `&transactionID=${search}` : '';
  const typeTerm = type ? `&type=${type}` : '';
  const statusTerm = status ? `&status=${status}` : '';
  const userIDTerm = userID ? `&userID=${userID}` : '';
  const startDateTerm = startDate ? `&start=${startDate}` : '';
  const endDateTerm = endDate ? `&end=${endDate}` : '';

  // console.log(statusTerm);

  const { access_token } = await getTokens();
  if (access_token) {
    try {
      const response = await http(
        `/transactions?page=${page}&limit=${limit}${searchTerm}${typeTerm}${statusTerm}${userIDTerm}${startDateTerm}${endDateTerm}`,
        {
          next: {
            tags: [
              `transactions-${type}-${page}-${limit}-${status}-${search}-${userID}-${startDate}-${endDate}`,
            ],
          },
        }
      );
      // console.log(response);
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
