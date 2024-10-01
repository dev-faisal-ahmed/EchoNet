'use client';

import { SidebarLoader } from '@/components/shared/loader';
import { PropsWithChildren, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './_ui/Sidebar';

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
      <Sidebar className='hidden md:grid' />
      <main>{children}</main>
    </main>
  );
}
