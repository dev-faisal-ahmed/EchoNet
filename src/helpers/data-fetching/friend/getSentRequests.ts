import { graphQlClient } from '@/helpers/axios-client';
import { GET_SENT_REQUEST } from '@/lib/queries';

interface ISentRequest {
  id: string;
  receiver: { name: string; email: string };
}

export const getSentRequests = async (id: string): Promise<ISentRequest[]> => {
  const response = await graphQlClient(GET_SENT_REQUEST, { id });
  return response?.data?.friends;
};
