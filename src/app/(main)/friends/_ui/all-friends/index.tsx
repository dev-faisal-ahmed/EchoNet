'use client';

import { getMyFriends } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { FriendLoader } from '../FriendLoader';
import { FriendCard } from './FriendCard';
import { TAGS } from '@/data';

export function AllFriends() {
  const { data: friends, isPending } = useQuery({
    queryFn: getMyFriends,
    queryKey: [TAGS.ALL_FRIENDS],
  });

  if (isPending) return <FriendLoader className='mt-6' />;

  return friends?.length ? (
    <section className='mt-6'>
      <h3 className='font-semibold'>Friend Requests.</h3>
      <div className='mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {friends?.map((friend) => <FriendCard key={friend.id} {...friend} />)}
      </div>
    </section>
  ) : null;
}
