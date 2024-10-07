import { graphQlClient } from '../../axios-client';
import { EDIT_POST } from '@/lib/queries';

interface IEditPostPayload {
  id: string;
  privacy: string;
  body: string;
  imageUrl: string;
}

export const editPost = async (payload: IEditPostPayload) => {
  const response = await graphQlClient(EDIT_POST, { ...payload });
  console.log(response);
  return response?.data?.update_posts_by_pk;
};
