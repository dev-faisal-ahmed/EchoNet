'use client';

import {
  ChevronsUpDownIcon,
  GlobeIcon,
  ImageIcon,
  MapPinIcon,
} from 'lucide-react';

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
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Card, CardContent } from '@/components/ui/card';
import { useGetUser } from '@/hooks';
import { useAddPost } from '../_lib/useAddPost';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export function AddPost() {
  const user = useGetUser();
  const {
    form,
    imageRef,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleAddPost, onImageRemove },
    isPending,
  } = useAddPost();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className='cursor-pointer'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              {/* using addition div to prevent from shrinking profile icon */}
              <div>
                <ProfileIcon name={user?.name as string} />
              </div>
              <div className='h-full w-full rounded-full bg-border p-3 pl-4'>
                What&apos;s on your mind?
              </div>
            </div>
            <div className='mt-6 flex flex-wrap items-center gap-6'>
              <p className='flex items-center gap-2'>
                <ImageIcon size={20} /> Image
              </p>
              <p className='flex items-center gap-2'>
                <MapPinIcon size={20} /> Location
              </p>
              <p className='flex items-center gap-2'>
                <GlobeIcon size={20} /> Privacy{' '}
                <span className='-ml-1'>
                  <ChevronsUpDownIcon size={16} />
                </span>
              </p>
              <Button className='ml-auto px-12'>Post</Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Add Post</DialogTitle>
          <DialogDescription>
            Tell us what&apos;s on your mind
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex max-h-[400px] flex-col gap-3 overflow-y-auto py-2 pl-2 pr-4'
            onSubmit={handleAddPost}
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
            <ImageInput ref={imageRef} onImageRemove={onImageRemove} />
            <Button disabled={isPending} className='mt-6'>
              {isPending ? 'Posting...' : 'Post'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
