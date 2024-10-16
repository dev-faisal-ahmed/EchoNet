'use client';

import { getMessages } from '@/helpers/data-fetching';
import { useGetMessagesSubscription } from '@/hooks';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { MessageCard } from './MessageCard';
import { TAGS } from '@/data';

export function Messages() {
  const { chatId } = useParams();
  const endMessageRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [TAGS.MESSAGES, chatId, page],
    queryFn: () => getMessages(chatId as string, page),
  });

  useGetMessagesSubscription(chatId as string);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  if (isLoading) return 'loading';

  return (
    <div className='my-4 flex flex-col-reverse gap-4'>
      <div ref={endMessageRef} />
      {data?.currentPage && data.currentPage > 1 && (
        <Button
          onClick={() => setPage(data.currentPage - 1)}
          className='mx-auto w-fit'
          variant='outline'
        >
          Go Previous
        </Button>
      )}
      {data?.messages?.map((message) => (
        <MessageCard key={message.id} {...message} />
      ))}

      {data?.hasNextPage && (
        <Button
          onClick={() => setPage(data.currentPage + 1)}
          className='mx-auto w-fit'
          variant='outline'
        >
          See more
        </Button>
      )}
    </div>
  );
}
