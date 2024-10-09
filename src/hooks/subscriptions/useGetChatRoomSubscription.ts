import { GET_CHAT_ROOM_SUBSCRIPTION } from '@/lib/queries';
import { queryClient } from '@/providers/QueryClient';
import { wsClient } from '@/helpers/wsClient';
import { useGetUser } from '../useGetUser';
import { useEffect } from 'react';
import { TAGS } from '@/data';

export const useGetChatRoomSubscription = () => {
  const user = useGetUser();

  useEffect(() => {
    wsClient.subscribe(
      {
        query: GET_CHAT_ROOM_SUBSCRIPTION,
        variables: { userId: user?.id },
      },
      {
        next: ({ data }) => {
          queryClient.setQueryData([TAGS.MY_CHATS], () => {
            return data?.chat_rooms;
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      },
    );

    return () => {
      wsClient.terminate();
    };
  }, [user?.id]);
};
