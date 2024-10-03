import { uploadImage } from '@/helpers/server-actions';
import { queryClient } from '@/providers/QueryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { catchAsync, editPost } from '@/helpers';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { IPost } from '@/lib/types';
import { toast } from 'sonner';
import { TAGS } from '@/data';
import { z } from 'zod';

const editPostFormSchema = z.object({
  body: z.string().optional(),
  privacy: z.string().min(1, { message: 'Please select privacy' }),
});

export const useEditPost = (
  payload: Pick<IPost, 'postId' | 'body' | 'privacy' | 'imageUrl'>,
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
          postId: payload.postId,
          imageUrl: !doesUserWantToRemoveImage.current ? imageUrl : '',
        });

        if (!response?.postId) throw new Error('Could not update the post');
        toast.success('Post updated successfully!', { id });
        setIsDialogOpen(false);
        form.reset();
        // making it false just to reset the form state
        doesUserWantToRemoveImage.current = false;
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleEditPost, onImageRemove },
    imageRef,
  };
};
