'use client';

import { MyFriendLoader } from './MyFriendLoader';
import { MyFriendCard } from './MyFriendCard';
import { useGetMyFriends } from '@/hooks';

export function MyFriends() {
  const { friends, isPending } = useGetMyFriends();

  if (isPending) return <MyFriendLoader />;

  return (
    <section
      style={{ height: `calc(100dvh - 24px)` }}
      className='sticky right-0 top-6 hidden w-full max-w-xs overflow-y-auto lg:block'
    >
      <h3 className='mb-6 pl-4 font-semibold'>Chats.</h3>
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
