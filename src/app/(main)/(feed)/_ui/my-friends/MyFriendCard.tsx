import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { LoaderIcon, SendHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';
import { useGetUser } from '@/hooks';
import { useNavigateToChatRoom } from '@/hooks/useNavigateToChatRoom';

interface IProps {
  id: string;
  receiver: IFriend;
  sender: IFriend;
}

export function MyFriendCard({ sender, receiver }: IProps) {
  const user = useGetUser();
  const friend = user?.email === sender.email ? receiver : sender;
  const { navigate, isLoading } = useNavigateToChatRoom();

  return (
    <div className='cursor-pointer border-b px-4 pb-4'>
      <div className='flex gap-3'>
        <div>
          <ProfileIcon name={friend.name} />
        </div>
        <div>
          <h3 className='text-sm font-semibold'>{friend.name}</h3>
          <p className='mt-2 text-xs text-muted-foreground'>{friend.email}</p>
        </div>
      </div>

      <Button
        onClick={() => navigate(friend.id)}
        disabled={isLoading}
        className='mt-3 w-full gap-3'
        variant='outline'
      >
        {isLoading ? (
          <LoaderIcon size={16} />
        ) : (
          <>
            Chat <SendHorizontalIcon size={16} />
          </>
        )}
      </Button>
    </div>
  );
}
