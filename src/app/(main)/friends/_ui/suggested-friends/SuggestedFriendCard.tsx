import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';

export function SuggestedFriendCard({ email, name }: IFriend) {
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
        <Button className='w-full'>Add Friend</Button>
      </CardContent>
    </Card>
  );
}
