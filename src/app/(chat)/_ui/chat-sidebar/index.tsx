'use client';

import { getMyChats } from '@/helpers/data-fetching/chat/getMyChats';
import { useQuery } from '@tanstack/react-query';
import { Logo } from '@/components/shared/Logo';
import { ChatLink } from './ChatLink';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export function ChatSidebar() {
  const user = useGetUser();

  const { data: chats, isPending } = useQuery({
    queryFn: () => getMyChats(user?.id as string),
    queryKey: [TAGS.MY_CHATS],
  });

  if (isPending) return 'Loading';

  return (
    <aside className='sticky top-0 hidden h-screen w-full max-w-[280px] overflow-y-auto border-r p-6 md:block'>
      <Logo className='mx-auto' />
      <div className='mt-6 flex flex-col gap-3'>
        {chats?.map((chat) => <ChatLink key={chat.id} chat={chat} />)}
      </div>
    </aside>
  );
}
