import {
  CardContent,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { useDeleteFriend } from '../../_lib/useDeleteFriend';
import { queryClient } from '@/providers/QueryClient';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';
import { useGetUser } from '@/hooks';
import { TAGS } from '@/data';

interface IProps {
  id: string;
  sender: IFriend;
  receiver: IFriend;
}

export function FriendCard({ id, sender, receiver }: IProps) {
  const user = useGetUser();
  const friend = user?.email === sender.email ? receiver : sender;

  const { handleDeleteFriend, isPending: isRemoving } = useDeleteFriend(() => {
    queryClient.invalidateQueries({ queryKey: [TAGS.ALL_FRIENDS] });
    queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
  });

  const onRemoveFriend = () => {
    handleDeleteFriend({
      friendId: id,
      loadingMessage: 'Removing Friend...',
      successMessage: 'Friend Removed',
      errorMessage: 'Failed to remove friend',
    });
  };

  return (
    <Card>
      <CardHeader className='flex-row gap-4'>
        <ProfileIcon name={friend.name} />
        <div className='pr-2'>
          <CardTitle>{friend.name}</CardTitle>
          <CardDescription className='mt-2 truncate'>
            {friend.email}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='flex items-center gap-4'>
        <Button onClick={onRemoveFriend} className='w-full' variant='outline'>
          {isRemoving ? 'Removing Friend...' : 'Remove Friend'}
        </Button>
      </CardContent>
    </Card>
  );
}
