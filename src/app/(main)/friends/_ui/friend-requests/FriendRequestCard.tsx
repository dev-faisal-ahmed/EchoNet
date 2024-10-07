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
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';

export function FriendRequestCard({ id, name, email }: IFriend) {
  const { handleAcceptFriendRequest, isPending } = useAcceptFriendRequest();

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
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Accepting...' : 'Accept'}
        </Button>

        <Button className='w-full' variant='outline'>
          {false ? 'Rejecting...' : 'Reject'}
        </Button>
      </CardContent>
    </Card>
  );
}
