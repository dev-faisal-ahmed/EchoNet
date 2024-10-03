import { graphQlClient } from '../../axios-client';
import { DELETE_POST } from '@/lib/queries';

export const deletePost = async (postId: string) => {
  const response = await graphQlClient(DELETE_POST, { postId });
  return response?.data?.update_posts_by_pk;
};
