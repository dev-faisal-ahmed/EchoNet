import { graphQlClient } from '@/helpers/axios-client';
import { SEND_MESSAGE } from '@/lib/queries';

interface IArgs {
  chatRoomId: string;
  body: string;
  imageUrl: string;
}

export const sendMessage = async (args: IArgs) => {
  const response = await graphQlClient(SEND_MESSAGE, { ...args });
  return response?.data?.insert_messages_one;
};
