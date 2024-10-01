'use client';

import Link from 'next/link';

import { sidebarLinks } from '../_lib/sidebarLinks';
import { Logo } from '@/components/shared/Logo';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ProfileIcon } from './ProfileIcon';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export function Sidebar({ className }: IProps) {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <aside
      className={cn(
        'grid h-screen w-full max-w-[240px] grid-rows-[auto_1fr_auto] bg-primary-foreground p-6',
        className,
      )}
    >
      <Logo className='mx-auto' />
      <div className='mt-6 flex flex-col gap-3'>
        {sidebarLinks.map(({ url, title, icon }) => (
          <Link
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-2',
              url === pathname && 'bg-primary',
            )}
            key={url}
            href={url}
          >
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
      <ProfileIcon
        name={data?.user?.name as string}
        email={data?.user?.email as string}
      />
    </aside>
  );
}
