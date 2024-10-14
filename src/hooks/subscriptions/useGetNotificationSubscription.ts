import { GET_NOTIFICATIONS_SUBSCRIPTION } from '@/lib/queries';
import { queryClient } from '@/providers/QueryClient';
import { wsClient } from '@/helpers/wsClient';
import { useEffect } from 'react';
import { TAGS } from '@/data';

export const useGetNotificationSubscription = () => {
  useEffect(() => {
    wsClient.subscribe(
      { query: GET_NOTIFICATIONS_SUBSCRIPTION },
      {
        next: ({ data }) => {
          queryClient.setQueryData([TAGS.NOTIFICATIONS], () => {
            return data?.notifications;
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
  }, []);
};
