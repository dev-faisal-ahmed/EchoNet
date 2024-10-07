import { uploadImage } from '@/helpers/server-actions/uploadImage';
import { queryClient } from '@/providers/QueryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '@/helpers/data-fetching';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { TAGS } from '@/data';
import { z } from 'zod';

const addPostFormSchema = z.object({
  body: z.string().optional(),
  privacy: z.string(),
});

export const useAddPost = () => {
  const form = useForm<z.infer<typeof addPostFormSchema>>({
    resolver: zodResolver(addPostFormSchema),
    defaultValues: {
      privacy: 'PUBLIC',
      body: '',
    },
  });

  // states
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TAGS.POSTS] }),
  });

  const imageRef = useRef<HTMLInputElement>(null);

  const onImageRemove = () => {
    if (imageRef.current) imageRef.current.value = '';
  };

  const handleAddPost = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding post...');
    catchAsync({
      id,
      tryFn: async () => {
        // uploading image first
        let imageUrl = '';
        if (imageRef.current && imageRef.current.files?.length) {
          if (imageRef.current.files[0].size > 1000000)
            throw new Error('Image size is too large, Max size can be 1MB');

          const imageBBFormData = new FormData();
          imageBBFormData.append('image', imageRef.current.files[0]);
          imageUrl = await uploadImage(imageBBFormData);
        }

        const response = await addPostMutation.mutateAsync({
          body: formData.body || '',
          imageUrl: imageUrl || '',
          privacy: formData.privacy,
        });

        // checking if post id is found if not then throwing an error

        if (!response?.postId) throw new Error('Post is not created');

        toast.success('Post created successfully', { id });
        // resetting the form
        form.reset();
        onImageRemove();
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: {
      handleAddPost,
      onImageRemove,
    },
    imageRef,
    isPending: addPostMutation.isPending,
  };
};
