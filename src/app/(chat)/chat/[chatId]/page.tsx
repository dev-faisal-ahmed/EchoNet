'use client';

import { useParams } from 'next/navigation';

export default function ConversationPage() {
  const { chatId } = useParams();
  return <div>{chatId}</div>;
}
