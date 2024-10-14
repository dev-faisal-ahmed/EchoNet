import { GET_DELETED_POST_SUBSCRIPTION } from '@/lib/queries';
import { queryClient } from '@/providers/QueryClient';
import { wsClient } from '@/helpers/wsClient';
import { useGetUser } from '../useGetUser';
import { useEffect } from 'react';
import { TAGS } from '@/data';

export const useGetDeletedPostSubscription = () => {
  const user = useGetUser();

  useEffect(() => {
    wsClient.subscribe(
      {
        query: GET_DELETED_POST_SUBSCRIPTION,
        variables: { userId: user?.id },
      },
      {
        next: ({ data }) => {
          queryClient.setQueryData([TAGS.DELETED_POSTS], () => {
            return data?.posts;
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
