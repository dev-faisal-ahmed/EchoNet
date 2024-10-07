import { graphQlClient } from '@/helpers/axios-client';
import { ACCEPT_FRIEND_REQUEST } from '@/lib/queries';

export const acceptFriendRequest = async (requestId: string) => {
  const response = await graphQlClient(ACCEPT_FRIEND_REQUEST, { requestId });
  return response?.data?.update_friends_by_pk;
};
