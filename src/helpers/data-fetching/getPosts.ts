import { graphQlClient } from '../axios-client';
import { GET_POSTS } from '@/lib/queries';
import { IPost } from '@/lib/types/post';

export const getPosts = async (): Promise<IPost[]> => {
  const posts = await graphQlClient(GET_POSTS);
  return posts?.data?.posts || [];
};
