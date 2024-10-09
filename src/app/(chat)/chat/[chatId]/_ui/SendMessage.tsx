'use client';

import { LoaderIcon, PlusIcon, SendHorizontalIcon, XIcon } from 'lucide-react';
import { useSendMessage } from '../_lib/useSendMessage';
import { Form } from '@/components/ui/form';
import Image from 'next/image';

interface IProps {
  chatId: string;
}

export function SendMessage({ chatId }: IProps) {
  const {
    form,
    handlers: { handleSendMessage, onImageChange, onImageRemove },
    refs: { imageRef },
    states: { imagePreview, isPending },
  } = useSendMessage(chatId);

  // watching this value to disable submit button when body and image are empty
  const body = form.watch('body');

  return (
    <Form {...form}>
      <form onSubmit={handleSendMessage}>
        <div className='rounded-md border p-2 focus-within:border-primary'>
          {imagePreview && (
            <div className='relative mb-3 w-fit'>
              <Image
                className='rounded-md'
                src={imagePreview}
                width={100}
                height={100}
                alt='image'
              />
              <span
                onClick={onImageRemove}
                className='absolute -right-2 -top-2 block w-fit cursor-pointer rounded-full bg-border p-1'
              >
                <XIcon size={16} />
              </span>
            </div>
          )}
          <div className='flex items-center gap-3'>
            <label
              htmlFor='chat-image'
              className='cursor-pointer rounded-md bg-border p-2'
            >
              <PlusIcon size={20} />
            </label>
            <input
              ref={imageRef}
              onChange={onImageChange}
              id='chat-image'
              type='file'
              accept='image/*'
              className='hidden'
            />
            <input
              className='w-full bg-transparent outline-none'
              placeholder='@ Write message'
              {...form.register('body')}
            />
            <button
              disabled={
                (!body && !imageRef.current?.files?.length) || isPending
              }
              type='submit'
              className='rounded-md bg-primary p-2 disabled:cursor-not-allowed disabled:opacity-40'
            >
              {isPending ? (
                <LoaderIcon size={20} />
              ) : (
                <SendHorizontalIcon size={20} />
              )}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
