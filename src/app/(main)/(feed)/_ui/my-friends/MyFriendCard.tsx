import { ProfileIcon } from '@/components/shared/ProfileIcon';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetUser } from '@/hooks';
import { IFriend } from '@/lib/types';

interface IProps {
  id: string;
  sender: IFriend;
  receiver: IFriend;
}

export function MyFriendCard({ sender, receiver }: IProps) {
  const user = useGetUser();
  const friend = user?.name === sender.name ? receiver : sender;

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
