'use client';

import { getMessages } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MessageCard } from './MessageCard';
import { useEffect, useRef } from 'react';
import { TAGS } from '@/data';
import { useGetMessagesSubscription } from '@/hooks';

export function Messages() {
  const { chatId } = useParams();
  const endMessageRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: [TAGS.MESSAGES, chatId],
    queryFn: () => getMessages(chatId as string),
  });

  useGetMessagesSubscription(chatId as string);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) return 'loading';

  return (
    <div className='my-4 flex flex-col-reverse gap-4'>
      <div ref={endMessageRef} />
      {messages?.map((message) => (
        <MessageCard key={message.id} {...message} />
      ))}
    </div>
  );
}
