import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { getFormattedDate } from '@/helpers/dateHelper';
import { IMessage } from '@/lib/types';
import { useGetUser } from '@/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function MessageCard({ sender, body, createdAt, imageUrl }: IMessage) {
  const user = useGetUser();
  const isMe = sender.id === user?.id;

  return (
    <div className={cn('flex w-2/3', isMe && 'ml-auto justify-end')}>
      <div className='flex gap-4'>
        {!isMe && <ProfileIcon name={sender.name} />}
        <div className='rounded-md bg-primary-foreground p-3'>
          {body && <p>{body}</p>}
          {imageUrl && (
            <Image
              className='mt-3 w-full rounded-md'
              src={imageUrl}
              width={150}
              height={150}
              alt='image'
            />
          )}
          <p className='mt-2 text-right text-xs text-muted-foreground'>
            {getFormattedDate(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
