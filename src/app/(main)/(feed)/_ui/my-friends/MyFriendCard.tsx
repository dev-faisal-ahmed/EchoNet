import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { IFriend } from '@/lib/types';
import { useGetUser } from '@/hooks';

interface IProps {
  id: string;
  sender: IFriend;
  receiver: IFriend;
}

export function MyFriendCard({ sender, receiver }: IProps) {
  const user = useGetUser();
  const friend = user?.email === sender.email ? receiver : sender;

  return (
    <Card>
      <CardHeader className='flex-row gap-2'>
        <ProfileIcon name={friend.name} />
        <div>
          <CardTitle>{friend.name}</CardTitle>
          <CardDescription className='mt-2'>{friend.email}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
