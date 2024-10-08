import { graphQlClient } from '@/helpers/axios-client';
import { ADD_FRIEND_REQUEST } from '@/lib/queries';

export const addFriend = async (receiverId: string) => {
  const response = await graphQlClient(ADD_FRIEND_REQUEST, { receiverId });
  const data = response?.data?.add_friend;
  if (!data?.success) throw new Error(data?.message);

  return data;
};
