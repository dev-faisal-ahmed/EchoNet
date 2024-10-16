'use client';

import { Logo } from '@/components/shared/Logo';
import { useGetChatRooms } from '@/hooks';
import { ChatLink } from './ChatLink';
import { ChatSidebarLoader } from './ChatSidebarLoader';

export function ChatSidebar() {
  const { chats, isLoading } = useGetChatRooms();

  if (isLoading) return <ChatSidebarLoader />;

  return (
    <aside className='sticky top-0 hidden h-screen w-full max-w-[280px] overflow-y-auto border-r p-6 md:block'>
      <Logo className='mx-auto' />
      <div className='mt-6 flex flex-col gap-3'>
        {chats?.map((chat) => <ChatLink key={chat.id} chat={chat} />)}
      </div>
    </aside>
  );
}
