/* eslint-disable react-hooks/exhaustive-deps */

import { uploadImage } from '@/helpers/server-actions';
import { queryClient } from '@/providers/QueryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { editPost } from '@/helpers/data-fetching';
import { catchAsync } from '@/helpers';
import { useForm } from 'react-hook-form';
import { IPost } from '@/lib/types';
import { toast } from 'sonner';
import { TAGS } from '@/data';
import { z } from 'zod';

const editPostFormSchema = z.object({
  body: z.string().optional(),
  privacy: z.string().min(1, { message: 'Please select privacy' }),
});

export const useEditPost = (
  payload: Pick<IPost, 'id' | 'body' | 'privacy' | 'imageUrl'>,
) => {
  const form = useForm<z.infer<typeof editPostFormSchema>>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      body: payload.body,
      privacy: payload.privacy,
    },
  });

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TAGS.POSTS] }),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  // to track if user want to remove the image or not
  const doesUserWantToRemoveImage = useRef(false);

  const onImageRemove = () => {
    if (imageRef.current) imageRef.current.value = '';
    doesUserWantToRemoveImage.current = true;
  };

  // handlers
  const handleEditPost = form.handleSubmit(async (formData) => {
    const id = toast.loading('Editing post...!');
    catchAsync({
      id,
      tryFn: async () => {
        const { body, privacy } = formData;
        let imageUrl = payload.imageUrl;
        if (imageRef.current?.files?.length) {
          // if there's any file that means user want to an image
          // so making the doesUserWantToRemoveImage to false
          doesUserWantToRemoveImage.current = false;
          const image = imageRef.current.files[0];
          const formData = new FormData();
          formData.append('image', image);
          imageUrl = await uploadImage(formData);
        }

        const response = await editPostMutation.mutateAsync({
          body: body || '',
          privacy,
          id: payload.id,
          imageUrl: !doesUserWantToRemoveImage.current ? imageUrl : '',
        });

        if (!response?.id) throw new Error('Could not update the post');
        toast.success('Post updated successfully!', { id });
        setIsDialogOpen(false);
        form.reset();
        // making it false just to reset the form state
        doesUserWantToRemoveImage.current = false;
      },
    });
  });

  // using this to sync the form data with the updated data, after one successful update
  useEffect(() => {
    form.reset({ body: payload.body, privacy: payload.privacy });
  }, [payload.body, payload.privacy]);

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleEditPost, onImageRemove },
    imageRef,
    isPending: editPostMutation.isPending,
  };
};
