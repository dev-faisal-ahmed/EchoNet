import { uploadImage } from '@/helpers/server-actions/uploadImage';
import { catchAsync, graphQlClient } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ADD_POST } from '@/lib/queries';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { queryClient } from '@/providers/QueryClient';
import { TAGS } from '@/data';

const addPostFormSchema = z.object({
  body: z.string().optional(),
  privacy: z.string().min(1, { message: 'Please select privacy' }),
});

interface IAddPostPayload extends z.infer<typeof addPostFormSchema> {
  imageUrl: string;
}

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

  const addPost = useMutation({
    mutationFn: async (payload: IAddPostPayload) => {
      return await graphQlClient(ADD_POST, { ...payload });
    },

    // invalidate query when new post is added
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.POSTS] });
    },
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

        const response = await addPost.mutateAsync({
          ...formData,
          imageUrl,
        });

        // checking if post id is found if not then throwing an error
        if (!response?.data?.insert_posts_one?.postId)
          throw new Error('Post is not created');

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
  };
};
