'use client';

import { useGetDeletedPostSubscription } from '@/hooks/subscriptions';
import { PageTitle } from '@/components/shared/PageTitle';
import { getDeletedPosts } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export default function TrashPage() {
  const user = useGetUser();
  const { data: posts, isLoading } = useQuery({
    queryFn: () => getDeletedPosts(user?.id as string),
    queryKey: [TAGS.DELETED_POSTS],
  });

  useGetDeletedPostSubscription();

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Trash'>
      <main>Trash Page</main>
    </PageTitle>
  );
}
