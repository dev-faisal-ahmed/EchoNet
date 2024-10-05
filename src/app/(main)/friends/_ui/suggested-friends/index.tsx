'use client';

import { getSuggestedFriend } from '@/helpers/data-fetching';
import { SuggestedFriendCard } from './SuggestedFriendCard';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';
import { FriendLoader } from '../FriendLoader';

export function SuggestedFriends() {
  const user = useGetUser();
  const { data: suggestedFriends, isPending } = useQuery({
    queryFn: () => getSuggestedFriend(user?.email as string),
    queryKey: [TAGS.SUGGESTED_FRIENDS],
  });

  if (isPending) return <FriendLoader />;

  return (
    <section>
      <h3 className='font-semibold'>Suggested Friends.</h3>
      <div className='mt-4 grid grid-cols-4 gap-6'>
        {suggestedFriends?.map(({ email, name }) => (
          <SuggestedFriendCard key={email} email={email} name={name} />
        ))}
      </div>
    </section>
  );
}
