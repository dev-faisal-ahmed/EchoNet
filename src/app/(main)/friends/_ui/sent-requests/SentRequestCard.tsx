import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useCancelRequest } from '../../_lib/useCancelRequest';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Button } from '@/components/ui/button';
import { IFriend } from '@/lib/types';

export function SentRequestCard({ id, name, email }: IFriend) {
  const { handleCancelRequest, isPending } = useCancelRequest();

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
            onClick={() => handleCancelRequest(id)}
            disabled={isPending}
            className='w-full'
            variant='outline'
          >
            {isPending ? 'Canceling Request...' : 'Cancel Request'}
          </Button>
        </CardContent>
      </Card>
    </Card>
  );
}
