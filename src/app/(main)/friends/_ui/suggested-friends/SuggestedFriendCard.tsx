'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { useAddFriend } from '../../_lib/useAddFriend';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';

export function SuggestedFriendCard({ id, email, name }: IFriend) {
  const { handleAddFriend, isPending } = useAddFriend();

  return (
    <Card>
      <CardHeader className='flex-row gap-4'>
        <ProfileIcon name={name} />
        <div className='pr-2'>
          <CardTitle>{name}</CardTitle>
          <CardDescription className='mt-2 truncate'>{email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => handleAddFriend(id)}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Adding Friend...' : 'Add Friend'}
        </Button>
      </CardContent>
    </Card>
  );
}
