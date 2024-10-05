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
import { useGetUser } from '@/hooks';

export function SentRequestCard({ name, email }: IFriend) {
  const user = useGetUser();
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
            onClick={() =>
              handleCancelRequest({
                senderEmail: user?.email as string,
                receiverEmail: email,
              })
            }
            disabled={isPending}
            className='w-full'
            variant='destructive'
          >
            {isPending ? 'Canceling Request...' : 'Cancel Request'}
          </Button>
        </CardContent>
      </Card>
    </Card>
  );
}
