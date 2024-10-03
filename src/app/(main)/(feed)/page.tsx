'use client';

import { FeedLoader } from '@/components/shared/loader';
import { useQuery } from '@tanstack/react-query';
import { PostCard } from './_ui/PostCard';
import { AddPost } from './_ui/AddPost';
import { getPosts } from '@/helpers';
import { TAGS } from '@/data';

export default function HomePage() {
  const { data: posts, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: [TAGS.POSTS],
  });

  if (isLoading) return <FeedLoader />;

  return (
    <main>
      <AddPost />
      <section className='mt-8 flex flex-col gap-6'>
        {posts?.map((post) => <PostCard key={post.postId} {...post} />)}
      </section>
    </main>
  );
}
