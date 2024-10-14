import { graphQlClient } from '@/helpers/axios-client';
import { RESTORE_POST } from '@/lib/queries';

export const restorePost = async (postId: string) => {
  const response = await graphQlClient(RESTORE_POST, { postId });
  return response?.data?.update_posts_by_pk;
};
