'use client';

import { useParams } from 'next/navigation';
import { SendMessage } from './_ui/SendMessage';

export default function ConversationPage() {
  const { chatId } = useParams();

  return (
    // giving this main element a fixed height to prevent the send message component being go all down from the page
    <main
      style={{ height: `calc(100vh - 48px)` }}
      className='grid grid-rows-[1fr_auto]'
    >
      <div className='overflow-y-auto'></div>
      <SendMessage chatId={chatId as string} />
    </main>
  );
}
