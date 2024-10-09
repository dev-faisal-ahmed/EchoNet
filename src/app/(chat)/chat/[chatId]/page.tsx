'use client';

import { PageTitle } from '@/components/shared/PageTitle';
import { SendMessage } from './_ui/SendMessage';
import { useParams } from 'next/navigation';
import { Messages } from './_ui/messages';

export default function ConversationPage() {
  const { chatId } = useParams();

  return (
    // giving this main element a fixed height to prevent the send message component being go all down from the page
    <PageTitle title='Chats'>
      <main
        style={{ height: `calc(100vh - 48px)` }}
        className='grid grid-rows-[1fr_auto]'
      >
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
