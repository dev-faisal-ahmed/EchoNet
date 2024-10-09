import { useGetChatRooms } from './data-fetching';
import { useRouter } from 'next/navigation';

export function useNavigateToChatRoom() {
  const router = useRouter();
  const { chats, isLoading } = useGetChatRooms();

  const navigate = (friendId: string) => {
    const chat = chats?.find(
      (chat) => chat.user1.id === friendId || chat.user2.id === friendId,
    );

    if (chat?.id) {
      router.push(`/chat/${chat.id}`);
    } else {
      router.push('/chats');
    }
  };

  return { navigate, isLoading };
}
