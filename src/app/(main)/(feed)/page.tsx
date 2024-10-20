'use client';

import { PostCard } from '@/components/shared/post-card';
import { useLazyPosts } from './_lib/useLazyPosts';
import { FeedLoader } from './_ui/FeedLoader';
import { MyFriends } from './_ui/my-friends';
import { AddPost } from './_ui/AddPost';
import { Fragment } from 'react';

export default function HomePage() {
  const { allPages, status, observerRef, isFetchingNextPage } = useLazyPosts();

  return (
    <>
      {status === 'pending' ? (
        <FeedLoader />
      ) : (
        <main className='flex gap-6'>
          <section className='w-full'>
            <div className='mx-auto w-full max-w-2xl'>
              <AddPost />
              <section className='mt-8 flex flex-col gap-6'>
                {allPages?.pages.map((page) => (
                  <Fragment key={page.currentPage}>
                    {page.data.map((post) => (
                      <PostCard key={post.id} post={post} editPost deletePost />
                    ))}
                  </Fragment>
                ))}
                <div ref={observerRef}>
                  {isFetchingNextPage && <FeedLoader />}
                </div>
              </section>
            </div>
          </section>
          <MyFriends />
        </main>
      )}
    </>
  );
}
