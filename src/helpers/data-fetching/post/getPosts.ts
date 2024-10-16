import { graphQlClient } from '../../axios-client';
import { GET_POSTS } from '@/lib/queries';
import { IPost } from '@/lib/types';

interface IResponse {
  data: IPost[];
  currentPage: number;
  nextPage: number | null;
}

interface IArgs {
  pageParam: number;
}

const LIMIT = 10;

export const getPosts = async ({ pageParam }: IArgs): Promise<IResponse> => {
  const response = await graphQlClient(GET_POSTS, {
    limit: LIMIT,
    offset: pageParam,
  });

  if (!response?.data)
    return { data: [], currentPage: pageParam, nextPage: null };

  const totalPosts = response.data.posts_aggregate?.aggregate?.count;
  const posts = response.data.posts;

  return {
    data: posts || [],
    currentPage: pageParam,
    nextPage: totalPosts > pageParam + LIMIT ? pageParam + LIMIT : null,
  };
};
