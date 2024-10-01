import { catchAsync } from '@/helpers';
import { uploadImage } from '@/helpers/server-actions/uoloadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addPostFormSchema = z.object({
  body: z.string().optional(),
});

export const useAddPost = () => {
  const form = useForm<z.infer<typeof addPostFormSchema>>({
    resolver: zodResolver(addPostFormSchema),
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
        let imageUrl;
        if (imageRef.current && imageRef.current.files?.length) {
          const imageBBFormData = new FormData();
          imageBBFormData.append('image', imageRef.current.files[0]);
          imageUrl = await uploadImage(imageBBFormData);
        }
        console.log(imageUrl);
      },
    });
  });

  return { form, handleAddPost, imageRef, onImageRemove };
};
