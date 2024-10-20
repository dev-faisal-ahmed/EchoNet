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
import { Button } from '@/components/ui/button';
import { SquarePenIcon } from 'lucide-react';
import { useEditPost } from './useEditPost';
import { Form } from '@/components/ui/form';
import { IPost } from '@/lib/types';

export function EditPost({
  id,
  body,
  imageUrl,
  privacy,
}: Pick<IPost, 'id' | 'body' | 'imageUrl' | 'privacy'>) {
  const {
    form,
    imageRef,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleEditPost, onImageRemove },
    isPending,
  } = useEditPost({ body, imageUrl, privacy, id });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <span className='block cursor-pointer rounded-md bg-primary p-2'>
          <SquarePenIcon size={18} />
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
            <Button disabled={isPending} className='mt-6'>
              {isPending ? 'Editing...' : 'Edit Post'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
