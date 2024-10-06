'use client';

import { getFriendRequests } from '@/helpers/data-fetching';
import { FriendRequestCard } from './FriendRequestCard';
import { useQuery } from '@tanstack/react-query';
import { FriendLoader } from '../FriendLoader';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export function FriendRequests() {
  const user = useGetUser();

  const { data: friendRequests, isPending } = useQuery({
    queryFn: () => getFriendRequests(user?.email as string),
    queryKey: [TAGS.FRIEND_REQUESTS],
  });

  if (isPending) return <FriendLoader />;

  return (
    <section>
      <h3 className='font-semibold'>Friend Requests.</h3>
      <div className='mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {friendRequests?.map(({ sender: { email, name } }) => (
          <FriendRequestCard key={email} name={name} email={email} />
        ))}
      </div>
    </section>
  );
}
