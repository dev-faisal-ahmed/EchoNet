'use client';

import Link from 'next/link';

import { sidebarLinks } from '../_lib/sidebarLinks';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
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
      <div className='border-t pt-4'>
        <div className='flex gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl font-semibold'>
            {data?.user?.name?.[0]}
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold'>{data?.user?.name}</h3>
            <p className='mt-1 line-clamp-1 text-sm text-muted-foreground'>
              {data?.user?.email}
            </p>
          </div>
        </div>
        <Button
          onClick={() => signOut()}
          variant={'destructive'}
          className='mt-4 w-full gap-1'
        >
          <LogOutIcon size={20} /> Logout
        </Button>
      </div>
    </aside>
  );
}
