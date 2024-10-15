import { ILazyPostResponse } from '@/lib/types/post';
import { graphQlClient } from '../../axios-client';
import { GET_POSTS } from '@/lib/queries';

export const getPosts = async (limit: number): Promise<ILazyPostResponse> => {
  const response = await graphQlClient(GET_POSTS, {
    limit,
  });
  return response?.data;
};
