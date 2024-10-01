'use client';

import {
  ChevronsUpDownIcon,
  GlobeIcon,
  ImageIcon,
  MapPinIcon,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { CustomTextArea } from '@/components/shared/form/CustomTextArea';
import { ImageInput } from '@/components/shared/form/ImageInput';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Card, CardContent } from '@/components/ui/card';
import { useGetUser } from '@/hooks/useGetUser';
import { useAddPost } from '../_lib/useAddPost';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export function AddPost() {
  const user = useGetUser();
  const { form, handleAddPost, imageRef, onImageRemove } = useAddPost();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className='cursor-pointer'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <ProfileIcon name={user?.name as string} />
              <div className='h-full w-full rounded-full bg-border p-3 pl-4'>
                What&apos;s on your mind?
              </div>
            </div>
            <div className='mt-6 flex items-center gap-6'>
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
      </SheetTrigger>
      <SheetContent className='max-w-lg'>
        <SheetHeader>
          <SheetTitle>Add Post</SheetTitle>
          <SheetDescription>Tell us what&apos;s on your mind</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className='mt-8 flex flex-col gap-3' onSubmit={handleAddPost}>
            <CustomTextArea
              name='body'
              control={form.control}
              rows={5}
              placeholder="Tell us what's going on"
            />
            <ImageInput ref={imageRef} onImageRemove={onImageRemove} />
            <Button className='mt-6'>Post</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
