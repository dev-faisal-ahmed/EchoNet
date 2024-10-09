import { GET_MESSAGES_SUBSCRIPTION } from '@/lib/queries';
import { queryClient } from '@/providers/QueryClient';
import { wsClient } from '@/helpers/wsClient';
import { useEffect } from 'react';
import { TAGS } from '@/data';

export const useGetMessagesSubscription = (chatRoomId: string) => {
  useEffect(() => {
    wsClient.subscribe(
      { query: GET_MESSAGES_SUBSCRIPTION, variables: { chatRoomId } },
      {
        next: ({ data }) => {
          queryClient.setQueryData([TAGS.MESSAGES, chatRoomId], () => {
            return data?.messages;
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      },
    );
  }, [chatRoomId]);
};
