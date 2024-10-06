import { graphQlClient } from '@/helpers/axios-client';
import { GET_FRIEND_REQUESTS } from '@/lib/queries';

interface IResponse {
  sender: { name: string; email: string };
}

export const getFriendRequests = async (
  email: string,
): Promise<IResponse[]> => {
  const response = await graphQlClient(GET_FRIEND_REQUESTS, { email });
  return response?.data?.friends;
};
