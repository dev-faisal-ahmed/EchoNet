import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { useDeleteFriend } from '../../_lib/useDeleteFriend';
import { queryClient } from '@/providers/QueryClient';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';
import { TAGS } from '@/data';

export function SentRequestCard({ id, name, email }: IFriend) {
  const { handleDeleteFriend, isPending } = useDeleteFriend(() => {
    queryClient.invalidateQueries({ queryKey: [TAGS.SENT_REQUESTS] });
    queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
  });

  const onCancelRequest = () => {
    handleDeleteFriend({
      friendId: id,
      loadingMessage: 'Cancelling Request...',
      successMessage: 'Friend Request Cancelled',
      errorMessage: 'Failed to cancel friend request',
    });
  };

  return (
    <Card>
      <CardHeader className='flex-row gap-4'>
        <ProfileIcon name={name} />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription className='mt-2'>{email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onCancelRequest}
          disabled={isPending}
          className='w-full'
          variant='outline'
        >
          {isPending ? 'Canceling Request...' : 'Cancel Request'}
        </Button>
      </CardContent>
    </Card>
  );
}
