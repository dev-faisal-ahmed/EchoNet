import { useCallback, useEffect, useRef, useState } from 'react';
import { getPosts } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { TAGS } from '@/data';

const INTERVAL = 5;

export const useLazyPosts = () => {
  const [limit, setLimit] = useState(INTERVAL);

  const {
    data: postResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => getPosts(limit),
    queryKey: [TAGS.POSTS, limit],
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          (postResponse?.posts_aggregate.aggregate.count || 0) > limit
        ) {
          setLimit((prevLimit) => prevLimit + INTERVAL);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetching, postResponse, limit],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { postResponse, isLoading, lastElementRef };
};
