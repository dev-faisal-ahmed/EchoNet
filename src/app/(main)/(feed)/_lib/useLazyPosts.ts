import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getPosts } from '@/helpers/data-fetching';
import { TAGS } from '@/data';
import { useEffect } from 'react';

export const useLazyPosts = () => {
  const {
    data: allPages,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [TAGS.POSTS],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const { ref: observerRef, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return { allPages, status, error, observerRef, isFetchingNextPage };
};
