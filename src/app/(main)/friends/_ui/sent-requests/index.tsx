'use client';

import { getSentRequests } from '@/helpers/data-fetching';
import { SentRequestCard } from './SentRequestCard';
import { useQuery } from '@tanstack/react-query';
import { FriendLoader } from '../FriendLoader';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export function SentRequests() {
  const user = useGetUser();
  const { data: sentRequests, isPending } = useQuery({
    queryFn: () => getSentRequests(user?.id as string),
    queryKey: [TAGS.SENT_REQUESTS],
  });

  if (isPending) return <FriendLoader className='mt-6' />;

  return sentRequests?.length ? (
    <section className='mt-6'>
      <h3 className='font-semibold'>Sent Requests.</h3>
      <div className='mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {sentRequests?.map(({ id, receiver: { name, email } }) => (
          <SentRequestCard key={id} id={id} name={name} email={email} />
        ))}
      </div>
    </section>
  ) : null;
}
