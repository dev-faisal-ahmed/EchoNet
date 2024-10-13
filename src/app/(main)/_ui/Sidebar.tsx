'use client';

import Link from 'next/link';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { sidebarLinks } from '../_lib/sidebarLinks';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { usePathname } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useGetUser } from '@/hooks';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export function Sidebar({ className }: IProps) {
  const pathname = usePathname();
  const user = useGetUser();

  return (
    <aside
      className={cn(
        'sticky top-0 grid h-screen w-full max-w-[240px] grid-rows-[auto_1fr_auto] border-r p-6',
        className,
      )}
    >
      <Logo className='mx-auto' />
      <div className='mt-6 flex flex-col gap-3'>
        {sidebarLinks.map(({ url, title, icon }) => (
          <Link
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-1.5',
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
        <div className='grid grid-cols-[auto_1fr] gap-3'>
          <div>
            <ProfileIcon name={user?.name as string} />
          </div>
          <div>
            <h3 className='text-sm font-semibold'>{user?.name}</h3>
            <p className='mt-1 line-clamp-1 break-all text-xs text-muted-foreground'>
              {user?.email}
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
