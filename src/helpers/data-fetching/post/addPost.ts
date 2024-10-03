import { graphQlClient } from '../../axios-client';
import { ADD_POST } from '@/lib/queries';

interface IAddPostPayload {
  body: string;
  imageUrl: string;
  privacy: string;
}

export const addPost = async (payload: IAddPostPayload) => {
  const response = await graphQlClient(ADD_POST, { ...payload });
  return response?.data?.insert_posts_one;
};
