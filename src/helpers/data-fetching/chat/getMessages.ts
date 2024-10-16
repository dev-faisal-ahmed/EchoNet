import { graphQlClient } from '@/helpers/axios-client';
import { GET_MESSAGES } from '@/lib/queries';
import { IMessage } from '@/lib/types';

interface IResponse {
  messages: IMessage[];
  currentPage: number;
  hasNextPage: boolean;
}

const LIMIT = 20;

export const getMessages = async (
  chatRoomId: string,
  page: number,
): Promise<IResponse> => {
  const offset = (page - 1) * LIMIT;

  const response = await graphQlClient(GET_MESSAGES, {
    chatRoomId,
    limit: LIMIT,
    offset,
  });
  const responseData = response?.data;

  if (!responseData)
    return { messages: [], currentPage: page, hasNextPage: false };

  const messages = responseData.messages || [];
  const totalMessages = responseData?.messages_aggregate?.aggregate?.count || 0;

  return {
    messages,
    currentPage: page,
    hasNextPage: totalMessages > offset + LIMIT,
  };
};
