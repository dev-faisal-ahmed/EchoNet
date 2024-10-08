'use client';

import { getMyFriends } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { MyFriendCard } from './MyFriendCard';
import { TAGS } from '@/data';

export function MyFriends() {
  const { data: friends } = useQuery({
    queryFn: getMyFriends,
    queryKey: [TAGS.ALL_FRIENDS],
  });

  return (
    <section className='hidden w-full max-w-xs lg:block'>
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
