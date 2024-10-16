import { GET_MESSAGE_COUNT, GET_MESSAGES_SUBSCRIPTION } from '@/lib/queries';
import { queryClient } from '@/providers/QueryClient';
import { wsClient } from '@/helpers/wsClient';
import { useEffect } from 'react';
import { TAGS } from '@/data';
import { graphQlClient } from '@/helpers';

export const useGetMessagesSubscription = (chatRoomId: string) => {
  useEffect(() => {
    wsClient.subscribe(
      {
        query: GET_MESSAGES_SUBSCRIPTION,
        variables: { chatRoomId, limit: 20, offset: 0 },
      },
      {
        next: async ({ data }) => {
          const response = await graphQlClient(GET_MESSAGE_COUNT, {
            chatRoomId,
          });

          const totalMessages =
            response?.data?.messages_aggregate?.aggregate?.count || 0;

          const page = 1;

          queryClient.setQueryData([TAGS.MESSAGES, chatRoomId, page], () => {
            return {
              messages: data?.messages,
              currentPage: page,
              hasNextPage: totalMessages > 20,
            };
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Completed');
        },
      },
    );
  }, [chatRoomId]);
};
