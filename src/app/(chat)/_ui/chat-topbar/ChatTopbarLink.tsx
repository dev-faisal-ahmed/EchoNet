import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { getFormattedDate } from '@/helpers/dateHelper';
import { SheetClose } from '@/components/ui/sheet';
import { useGetUser } from '@/hooks';
import { IChatLink } from '@/lib/types';
import Link from 'next/link';

interface IProps {
  chat: IChatLink;
}

export function ChatTopbarLink({ chat }: IProps) {
  const user = useGetUser();
  const friend = chat.user1.id === user?.id ? chat.user2 : chat.user1;

  return (
    chat.messages?.length > 0 && (
      <Link className='border-b pb-3' href={`/chat/${chat.id}`}>
        <SheetClose>
          <div className='flex items-center gap-3'>
            <div>
              <ProfileIcon name={friend.name} />
            </div>
            <div className='text-left'>
              <h3 className='text-sm font-semibold'>{friend.name}</h3>
              <div className='flex items-center gap-2'>
                <p className='line-clamp-1 text-xs text-muted-foreground'>
                  {chat.messages[0]?.sender?.name === user?.name
                    ? 'You : '
                    : ''}{' '}
                  {chat.messages[0]?.body}
                </p>
                <p className='text-xs'>
                  {
                    getFormattedDate(chat.messages[0]?.createdAt)?.split(
                      ' ',
                    )?.[0]
                  }
                </p>
              </div>
            </div>
          </div>
        </SheetClose>
      </Link>
    )
  );
}
