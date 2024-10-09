import { HASURA_WS_URL } from '@/config';
import { createClient } from 'graphql-ws';
import { getSession } from 'next-auth/react';

export const wsClient = createClient({
  url: HASURA_WS_URL!,

  connectionParams: async () => {
    const session = await getSession();
    const token = session?.accessToken;
    return {
      headers: {
        ['Authorization']: `Bearer ${token}`,
      },
    };
  },
});
