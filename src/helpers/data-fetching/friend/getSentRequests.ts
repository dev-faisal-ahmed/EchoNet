import { graphQlClient } from '@/helpers/axios-client';
import { GET_SENT_REQUEST } from '@/lib/queries';

interface ISentRequest {
  id: string;
  receiver: { name: string; email: string };
}

export const getSentRequests = async (
  email: string,
): Promise<ISentRequest[]> => {
  const response = await graphQlClient(GET_SENT_REQUEST, { email });
  return response?.data?.friends;
};
