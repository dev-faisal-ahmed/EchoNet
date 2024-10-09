import { graphQlClient } from '@/helpers/axios-client';
import { GET_MESSAGES } from '@/lib/queries';
import { IMessage } from '@/lib/types';

export const getMessages = async (chatRoomId: string): Promise<IMessage[]> => {
  const response = await graphQlClient(GET_MESSAGES, { chatRoomId });
  return response?.data?.messages;
};
