'use client';

import { PropsWithChildren, useEffect } from 'react';
import { SidebarLoader } from './_ui/SidebarLoader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './_ui/Sidebar';
import { Topbar } from './_ui/Topbar';

export default function MainLayout({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') router.push('/login');
  }, [session.status, router]);

  // to prevent showing the page before the session is loaded
  if (session.status !== 'authenticated') return <SidebarLoader />;

  return (
    <main className='flex gap-6'>
      <Sidebar className='hidden lg:grid' />
      <main className='w-full px-6 py-6'>
        <Topbar />
        {children}
      </main>
    </main>
  );
}
