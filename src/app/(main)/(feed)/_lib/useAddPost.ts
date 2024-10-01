import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
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
    console.log(formData);
  });

  return { form, handleAddPost, imageRef, onImageRemove };
};
