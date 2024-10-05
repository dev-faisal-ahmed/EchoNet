import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';

export function SentRequestCard({ name, email }: IFriend) {
  return (
    <Card>
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
            // onClick={() => handleAddFriend(email)}
            // disabled={isPending}
            className='w-full'
            variant='destructive'
          >
            {false ? 'Canceling Request...' : 'Cancel Request'}
          </Button>
        </CardContent>
      </Card>
    </Card>
  );
}
