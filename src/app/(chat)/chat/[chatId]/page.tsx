'use client';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { PageTitle } from '@/components/shared/PageTitle';
import { getChatRoomInfo } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { SendMessage } from './_ui/SendMessage';
import { useParams } from 'next/navigation';
import { Messages } from './_ui/messages';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

export default function ConversationPage() {
  const user = useGetUser();
  const { chatId } = useParams();
  const { data: chatRoomInfo, isLoading } = useQuery({
    queryFn: () => getChatRoomInfo(chatId as string),
    queryKey: [TAGS.CHAT_ROOM_INFO, chatId],
  });

  const friend =
    user.id === chatRoomInfo?.user1.id
      ? chatRoomInfo?.user2
      : chatRoomInfo?.user1;

  if (isLoading) return 'Loading';

  if (!chatRoomInfo) return <p>Invalid Chat id</p>;

  return (
    // giving this main element a fixed height to prevent the send message component being go all down from the page
    <PageTitle title='Chats'>
      <main
        style={{ height: `calc(100vh - 48px)` }}
        className='grid grid-rows-[auto_1fr_auto]'
      >
        <div className='flex items-center gap-4 border-b border-border pb-4'>
          <ProfileIcon size='lg' name={friend?.name as string} />
          <h2 className='text-2xl font-semibold'>{friend?.name}</h2>
        </div>
        <div className='flex h-full flex-col overflow-y-auto pr-2'>
          <div className='mt-auto'>
            <Messages />
          </div>
        </div>
        <SendMessage chatId={chatId as string} />
      </main>
    </PageTitle>
  );
}
