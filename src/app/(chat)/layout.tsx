'use client';

import { PropsWithChildren, useEffect } from 'react';
import { ChatSidebar } from './_ui/chat-sidebar';
import { ChatTopbar } from './_ui/chat-topbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ChatLayout({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') router.push('/login');
  }, [session.status, router]);

  // to prevent showing the page before the session is loaded
  if (session.status !== 'authenticated') return 'Loading';
  return (
    <main className='flex'>
      <ChatSidebar />
      <main className='w-full px-6 py-6'>
        <ChatTopbar />
        {children}
      </main>
    </main>
  );
}
