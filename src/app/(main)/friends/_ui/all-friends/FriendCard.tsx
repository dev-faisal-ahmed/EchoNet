import {
  CardContent,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';
import { useGetUser } from '@/hooks';

interface IProps {
  id: string;
  sender: IFriend;
  receiver: IFriend;
}

export function FriendCard({ sender, receiver }: IProps) {
  const user = useGetUser();

  const friend = user?.email === sender.email ? receiver : sender;

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
        <Button className='w-full' variant='outline'>
          {false ? 'Removing Friend...' : 'Remove Friend'}
        </Button>
      </CardContent>
    </Card>
  );
}
