'use client';

import { useQuery } from '@tanstack/react-query';
import { AddPost } from './_ui/AddPost';
import { getPosts } from '@/helpers';
import { TAGS } from '@/data';
import { PostCard } from './_ui/PostCard';

export default function HomePage() {
  const { data: posts, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: [TAGS.POSTS],
  });

  if (isLoading) return <div> Loading</div>;

  return (
    <main>
      <AddPost />
      <section className='mt-8 flex flex-col gap-6'>
        {posts?.map((post) => <PostCard key={post.postId} {...post} />)}
      </section>
    </main>
  );
}
