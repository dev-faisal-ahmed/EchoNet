import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { GlobeIcon, ShieldCheckIcon } from 'lucide-react';
import { getDateForPost } from '@/helpers/dateHelper';
import { EPostPrivacy, IPost } from '@/lib/types';
import { DeletePost } from './DeletePost';
import { EditPost } from './EditPost';
import { useGetUser } from '@/hooks';

export function PostCard({
  id,
  creator,
  createdAt,
  body,
  imageUrl,
  privacy,
}: IPost) {
  const { email } = useGetUser()!;
  return (
    <Card className='mx-auto w-full'>
      {/* card header */}
      <CardHeader className='flex flex-row gap-4'>
        <ProfileIcon name={creator.name} />
        <div>
          <CardTitle>{creator.name}</CardTitle>
          <p className='mt-2 flex items-center gap-1 text-sm text-muted-foreground'>
            {privacy === EPostPrivacy.PUBLIC ? (
              <GlobeIcon size={20} />
            ) : (
              <ShieldCheckIcon size={20} />
            )}
            {getDateForPost(createdAt)}
          </p>
        </div>
        {email === creator.email && (
          <div className='ml-auto flex items-center gap-3'>
            <EditPost
              id={id}
              body={body}
              imageUrl={imageUrl}
              privacy={privacy}
            />
            <DeletePost postId={id} />
          </div>
        )}
      </CardHeader>
      {/* card description */}
      <CardContent>
        <p className='text-justify text-slate-300'>{body}</p>
        {imageUrl && (
          <Image
            className='mt-6 aspect-auto w-full rounded-md'
            src={imageUrl}
            alt='Post Image'
            width={800}
            height={400}
          />
        )}
      </CardContent>
    </Card>
  );
}
