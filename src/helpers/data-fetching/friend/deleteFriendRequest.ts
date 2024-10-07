import { graphQlClient } from '@/helpers/axios-client';
import { DELETE_FRIEND_REQUEST } from '@/lib/queries';

export const deleteFriendRequest = async (id: string) => {
  const response = await graphQlClient(DELETE_FRIEND_REQUEST, { id });
  return response?.data?.delete_friends_by_pk;
};
