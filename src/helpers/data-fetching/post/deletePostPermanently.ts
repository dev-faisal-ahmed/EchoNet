import { DELETE_POST_PERMANENTLY } from '@/lib/queries';
import { graphQlClient } from '@/helpers/axios-client';

export const deletePostPermanently = async (postId: string) => {
  const response = await graphQlClient(DELETE_POST_PERMANENTLY, { postId });
  return response?.data?.delete_posts_by_pk;
};
