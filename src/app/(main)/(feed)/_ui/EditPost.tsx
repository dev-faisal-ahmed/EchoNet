'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { CustomTextArea } from '@/components/shared/form/CustomTextArea';
import { CustomSelect } from '@/components/shared/form/CustomSelect';
import { ImageInput } from '@/components/shared/form/ImageInput';
import { useEditPost } from '../_lib/useEditPost';
import { Button } from '@/components/ui/button';
import { SquarePenIcon } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { IPost } from '@/lib/types';

export function EditPost({
  postId,
  body,
  imageUrl,
  privacy,
}: Pick<IPost, 'postId' | 'body' | 'imageUrl' | 'privacy'>) {
  const {
    form,
    imageRef,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleEditPost, onImageRemove },
  } = useEditPost({ body, imageUrl, privacy, postId });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <span className='cursor-pointer'>
          <SquarePenIcon size={20} />
        </span>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Edit Post</DialogTitle>
          <DialogDescription>Edit your post</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex max-h-[400px] flex-col gap-3 overflow-y-auto py-2 pl-2 pr-4'
            onSubmit={handleEditPost}
          >
            <CustomSelect
              name='privacy'
              control={form.control}
              placeholder='Select Privacy Type'
              options={['PUBLIC', 'ONLY_ME']}
            />
            <CustomTextArea
              name='body'
              control={form.control}
              rows={5}
              placeholder="Tell us what's going on"
            />
            <ImageInput
              ref={imageRef}
              defaultValue={imageUrl}
              onImageRemove={onImageRemove}
            />
            <Button className='mt-6'>Post</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
