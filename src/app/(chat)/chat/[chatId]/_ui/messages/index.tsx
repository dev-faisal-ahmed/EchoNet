'use client';

import { getMessages } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MessageCard } from './MessageCard';
import { TAGS } from '@/data';

export function Messages() {
  const { chatId } = useParams();
  const { data: messages, isLoading } = useQuery({
    queryKey: [TAGS.MESSAGES, chatId],
    queryFn: () => getMessages(chatId as string),
  });

  if (isLoading) return 'loading';

  return (
    <div className='mb-4 flex flex-col gap-3'>
      {messages?.map((message) => (
        <MessageCard key={message.id} {...message} />
      ))}
    </div>
  );
}
