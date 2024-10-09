import { graphQlClient } from '@/helpers/axios-client';
import { GET_MY_CHATS } from '@/lib/queries';
import { IChatLink } from '@/lib/types';

export const getMyChats = async (userId: string): Promise<IChatLink[]> => {
  const response = await graphQlClient(GET_MY_CHATS, { userId });
  return response?.data?.chat_rooms;
};
