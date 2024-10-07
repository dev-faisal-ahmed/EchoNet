import { graphQlClient } from '@/helpers/axios-client';
import { GET_FRIEND_REQUESTS } from '@/lib/queries';

interface IFriendRequest {
  id: string;
  sender: { name: string; email: string };
}

export const getFriendRequests = async (
  id: string,
): Promise<IFriendRequest[]> => {
  const response = await graphQlClient(GET_FRIEND_REQUESTS, { id });
  return response?.data?.friends;
};
