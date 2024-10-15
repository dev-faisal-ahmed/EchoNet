'use client';

import { PostCard } from '@/components/shared/post-card';
import { Loader } from '@/components/shared/Loader';
import { useLazyPosts } from './_lib/useLazyPosts';
import { MyFriends } from './_ui/my-friends';
import { AddPost } from './_ui/AddPost';

export default function HomePage() {
  const { postResponse, lastElementRef, isLoading } = useLazyPosts();

  return (
    <main className='flex gap-6'>
      <section className='w-full'>
        <div className='mx-auto w-full max-w-2xl'>
          <AddPost />
          <section className='mt-8 flex flex-col gap-6'>
            {postResponse &&
              postResponse.posts?.map((post) => (
                <PostCard key={post.id} post={post} editPost deletePost />
              ))}
          </section>
          <div ref={lastElementRef}>{isLoading && <Loader />}</div>
        </div>
      </section>
      <MyFriends />
    </main>
  );
}
