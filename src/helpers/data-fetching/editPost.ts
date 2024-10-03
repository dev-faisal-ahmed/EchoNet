import { graphQlClient } from '../axios-client';
import { EDIT_POST } from '@/lib/queries';

interface IEditPostPayload {
  imageUrl: string;
  privacy: string;
  postId: string;
  body: string;
}

export const editPost = async (payload: IEditPostPayload) => {
  const response = await graphQlClient(EDIT_POST, { ...payload });
  return response?.data?.update_posts_by_pk;
};
