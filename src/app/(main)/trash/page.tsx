'use client';

import { useGetDeletedPostSubscription } from '@/hooks/subscriptions';
import { PageTitle } from '@/components/shared/PageTitle';
import { getDeletedPosts } from '@/helpers/data-fetching';
import { PostCard } from '@/components/shared/post-card';
import { useQuery } from '@tanstack/react-query';
import { TrashLoader } from './_ui/TrashLoader';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export default function TrashPage() {
  const user = useGetUser();
  const { data: posts, isLoading } = useQuery({
    queryFn: () => getDeletedPosts(user?.id as string),
    queryKey: [TAGS.DELETED_POSTS],
  });

  useGetDeletedPostSubscription();

  if (isLoading) return <TrashLoader />;

  return (
    <PageTitle title='Trash'>
      <main className='mx-auto max-w-2xl'>
        <h3 className='text-lg font-semibold'>Trash.</h3>
        {posts && posts.length > 0 ? (
          <div className='mt-4 flex flex-col gap-6'>
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                restorePost
                deletePostPermanently
              />
            ))}
          </div>
        ) : (
          <p className='mt-4 text-center font-semibold'>No post found</p>
        )}
      </main>
    </PageTitle>
  );
}
