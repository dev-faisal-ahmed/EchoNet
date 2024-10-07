import { graphQlClient } from '@/helpers/axios-client';
import { ADD_FRIEND } from '@/lib/queries';

export const addFriend = async (receiverId: string) => {
  const response = await graphQlClient(ADD_FRIEND, { receiverId });
  const errors = response?.errors;

  if (errors?.length) return { error: errors[0] };
  return { success: 'Sent friend request successfully' };
};
