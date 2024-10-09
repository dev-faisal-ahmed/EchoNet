import { uploadImage } from '@/helpers/server-actions';
import { sendMessage } from '@/helpers/data-fetching';
import { ChangeEvent, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { z } from 'zod';

const sendMessageSchema = z.object({
  body: z.string(),
});

export const useSendMessage = (chatRoomId: string) => {
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      body: '',
    },
  });

  const sendMessageMutation = useMutation({ mutationFn: sendMessage });

  const imageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    null,
  );

  // handlers
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const render = new FileReader();
      render.onloadend = () => {
        setImagePreview(render.result as string);
      };

      render.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onImageRemove = () => {
    setImagePreview(null);
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  const handleSendMessage = form.handleSubmit(async (formData) => {
    catchAsync({
      async tryFn() {
        // first of all uploading image if there's any

        let imageUrl = '';
        if (imageRef.current && imageRef.current.files?.length) {
          // image size should be less than 1MB
          if (imageRef.current.files[0].size > 1000000)
            throw new Error('Image size is too large, Max size can be 1MB');

          const imageBBFormData = new FormData();
          imageBBFormData.append('image', imageRef.current.files[0]);
          imageUrl = await uploadImage(imageBBFormData);
        }

        const response = await sendMessageMutation.mutateAsync({
          chatRoomId,
          body: formData.body || '',
          imageUrl: imageUrl || '',
        });

        if (!response) throw new Error('Unable to send message');
        // resetting the form and removing the image
        form.reset();
        onImageRemove();
      },
      catchFn(error) {
        let message = 'Something went wrong';
        if (error instanceof Error) message = error.message;
        toast.error(message, { duration: 1000 });
      },
    });
  });

  return {
    form,
    handlers: { handleSendMessage, onImageChange, onImageRemove },
    refs: { imageRef },
    states: { imagePreview, isPending: sendMessageMutation.isPending },
  };
};
