import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeletePostPermanently } from './delete-post-permanently';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { GlobeIcon, ShieldCheckIcon } from 'lucide-react';
import { getFormattedDate } from '@/helpers/dateHelper';
import { EPostPrivacy, IPost } from '@/lib/types';
import { RestorePost } from './restore-post';
import { DeletePost } from './delete-post';
import { EditPost } from './edit-post';
import { useGetUser } from '@/hooks';

interface IProps {
  post: IPost;
  editPost?: boolean;
  deletePost?: boolean;
  restorePost?: boolean;
  deletePostPermanently?: boolean;
}

export function PostCard({
  post,
  editPost,
  deletePost,
  restorePost,
  deletePostPermanently,
}: IProps) {
  const { email } = useGetUser()!;
  const { id, body, imageUrl, creator, privacy, createdAt } = post;

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
            {getFormattedDate(createdAt)}
          </p>
        </div>
        {email === creator.email && (
          <div className='ml-auto flex items-center gap-3'>
            <>
              {editPost && (
                <EditPost
                  id={id}
                  body={body}
                  imageUrl={imageUrl}
                  privacy={privacy}
                />
              )}
            </>
            {deletePost && <DeletePost postId={id} />}
            {restorePost && <RestorePost postId={id} />}
            {deletePostPermanently && <DeletePostPermanently postId={id} />}
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
