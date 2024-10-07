import { graphQlClient } from '../../axios-client';
import { DELETE_POST } from '@/lib/queries';

export const deletePost = async (id: string) => {
  const response = await graphQlClient(DELETE_POST, { id });
  return response?.data?.update_posts_by_pk;
};
