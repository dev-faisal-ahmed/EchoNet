'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { AlignJustifyIcon, LogOutIcon } from 'lucide-react';
import { sidebarLinks } from '../_lib/sidebarLinks';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useGetUser } from '@/hooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Topbar() {
  const pathname = usePathname();
  const user = useGetUser();

  return (
    <nav className='mb-6 flex w-full items-center gap-4 lg:hidden'>
      <Sheet>
        <SheetTrigger>
          <span className='block rounded-full bg-white p-2 text-primary'>
            <AlignJustifyIcon size={20} />
          </span>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
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
        </SheetContent>
      </Sheet>
      <Logo />
      <div className='ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ProfileIcon name={user?.name as string} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side='bottom'
            align='end'
            sideOffset={10}
            className='p-4'
          >
            <h2 className='font-semibold'>{user?.name}</h2>
            <p className='text-muted-foreground'>{user?.email}</p>
            <Button
              onClick={() => signOut()}
              variant={'destructive'}
              className='mt-4 w-full gap-1'
            >
              <LogOutIcon size={20} /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
