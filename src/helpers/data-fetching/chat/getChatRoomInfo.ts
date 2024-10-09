import { graphQlClient } from '@/helpers/axios-client';
import { GET_CHAT_ROOM_INFO } from '@/lib/queries';
import { IChatLink } from '@/lib/types';

export const getChatRoomInfo = async (
  id: string,
): Promise<Omit<IChatLink, 'messages'> | null> => {
  const response = await graphQlClient(GET_CHAT_ROOM_INFO, { id });
  return response?.data?.chat_rooms_by_pk || null;
};
