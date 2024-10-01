'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { sidebarLinks } from '../_lib/sidebarLinks';
import { Logo } from '@/components/shared/Logo';
import { AlignJustifyIcon } from 'lucide-react';
import { useGetUser } from '@/hooks/useGetUser';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Topbar() {
  const pathname = usePathname();
  const user = useGetUser();

  return (
    <nav className='mb-6 flex w-full items-center gap-4 md:hidden'>
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
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl font-semibold'>
            {user?.name?.[0]}
          </div>
        </DropdownMenu>
      </div>
    </nav>
  );
}
