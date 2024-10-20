'use client';

import { getSuggestedFriend } from '@/helpers/data-fetching';
import { SuggestedFriendCard } from './SuggestedFriendCard';
import { useQuery } from '@tanstack/react-query';
import { FriendLoader } from '../FriendLoader';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export function SuggestedFriends() {
  const user = useGetUser();
  const { data: suggestedFriends, isPending } = useQuery({
    queryFn: () => getSuggestedFriend(user?.email as string),
    queryKey: [TAGS.SUGGESTED_FRIENDS],
  });

  if (isPending) return <FriendLoader className='mt-6' />;

  return suggestedFriends?.length ? (
    <section>
      <h3 className='font-semibold'>Suggested Friends.</h3>
      <div className='mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {suggestedFriends?.map(({ id, email, name }) => (
          <SuggestedFriendCard key={id} id={id} email={email} name={name} />
        ))}
      </div>
    </section>
  ) : null;
}
