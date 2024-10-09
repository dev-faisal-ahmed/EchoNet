import { getMyChats } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../useGetUser';
import { TAGS } from '@/data';

export const useGetChatRooms = () => {
  const user = useGetUser();
  const { data: chats, isLoading } = useQuery({
    queryFn: () => getMyChats(user?.id as string),
    queryKey: [TAGS.MY_CHATS],
  });

  return { chats, isLoading };
};
