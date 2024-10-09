'use client';

import { FriendLoader } from '../FriendLoader';
import { FriendCard } from './FriendCard';
import { useGetMyFriends } from '@/hooks';

export function AllFriends() {
  const { friends, isPending } = useGetMyFriends();

  if (isPending) return <FriendLoader className='mt-6' />;

  return friends?.length ? (
    <section>
      <h3 className='font-semibold'>Friends.</h3>
      <div className='mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {friends?.map((friend) => <FriendCard key={friend.id} {...friend} />)}
      </div>
    </section>
  ) : null;
}
