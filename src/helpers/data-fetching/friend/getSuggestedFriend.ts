import { graphQlClient } from '@/helpers/axios-client';
import { GET_SUGGESTED_FRIENDS } from '@/lib/queries';

interface ISuggestedFriend {
  id: string;
  name: string;
  email: string;
}

export const getSuggestedFriend = async (
  email: string,
): Promise<ISuggestedFriend[]> => {
  const response = await graphQlClient(GET_SUGGESTED_FRIENDS, { email });
  return response?.data?.users || [];
};
