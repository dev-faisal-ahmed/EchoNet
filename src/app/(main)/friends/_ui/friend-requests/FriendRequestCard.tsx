'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAcceptFriendRequest } from '../../_lib/useAcceptFriendRequest';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { useDeleteFriend } from '../../_lib/useDeleteFriend';
import { queryClient } from '@/providers/QueryClient';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';
import { TAGS } from '@/data/tags';

export function FriendRequestCard({ id, name, email }: IFriend) {
  const { handleAcceptFriendRequest, isPending: isAccepting } =
    useAcceptFriendRequest();

  const { handleDeleteFriend, isPending: isRejecting } = useDeleteFriend(() => {
    queryClient.invalidateQueries({ queryKey: [TAGS.FRIEND_REQUESTS] });
    queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
  });

  const onRejectFriendRequest = () => {
    handleDeleteFriend({
      friendId: id,
      loadingMessage: 'Rejecting Request...',
      successMessage: 'Friend Request Rejected',
      errorMessage: 'Failed to reject friend request',
    });
  };

  return (
    <Card>
      <CardHeader className='flex-row gap-4'>
        <ProfileIcon name={name} />
        <div className='pr-2'>
          <CardTitle>{name}</CardTitle>
          <CardDescription className='mt-2 truncate'>{email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='flex items-center gap-4'>
        <Button
          onClick={() => handleAcceptFriendRequest(id)}
          disabled={isAccepting}
          className='w-full'
        >
          {isAccepting ? 'Accepting...' : 'Accept'}
        </Button>

        <Button
          onClick={onRejectFriendRequest}
          className='w-full'
          variant='outline'
        >
          {isRejecting ? 'Rejecting...' : 'Reject'}
        </Button>
      </CardContent>
    </Card>
  );
}
