'use client';

import { MyFriendCard } from './MyFriendCard';
import { useGetMyFriends } from '@/hooks';

export function MyFriends() {
  const { friends, isPending } = useGetMyFriends();

  if (isPending) return '';

  return (
    <section className='hidden w-full max-w-xs lg:block'>
      <h3 className='mb-4 pl-4 font-semibold'>Chats.</h3>
      {friends?.length ? (
        <div className='flex flex-col gap-4'>
          {friends?.map((friend) => (
            <MyFriendCard key={friend.id} {...friend} />
          ))}
        </div>
      ) : (
        <p>No Friend found add some friends.</p>
      )}
    </section>
  );
}
