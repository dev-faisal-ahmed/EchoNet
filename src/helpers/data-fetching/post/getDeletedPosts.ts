import { graphQlClient } from '@/helpers/axios-client';
import { GET_DELETED_POST } from '@/lib/queries';
import { IPost } from '@/lib/types';

export const getDeletedPosts = async (userId: string): Promise<IPost[]> => {
  const response = await graphQlClient(GET_DELETED_POST, { userId });
  return response?.data?.posts;
};
