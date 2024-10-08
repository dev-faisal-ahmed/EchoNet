'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { AlignJustifyIcon, LogOutIcon } from 'lucide-react';
import { useGetChatRooms } from '@/hooks/data-fetching';
import { ChatTopbarLink } from './ChatTopbarLink';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useGetUser } from '@/hooks';

export function ChatTopbar() {
  const user = useGetUser();
  const { chats, isPending } = useGetChatRooms();

  if (isPending) return 'Loading';

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
          <div className='mt-4 h-full max-h-[90vh] overflow-y-auto'>
            {chats?.map((chat) => <ChatTopbarLink key={chat.id} chat={chat} />)}
          </div>
        </SheetContent>
      </Sheet>
      <Logo />
      <div className='ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger>
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
