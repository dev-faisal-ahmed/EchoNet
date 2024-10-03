import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IPost } from '@/lib/types';
import { useRef, useState } from 'react';
import { z } from 'zod';

const editPostFormSchema = z.object({
  body: z.string().optional(),
  privacy: z.string().min(1, { message: 'Please select privacy' }),
});

// interface IEditPost extends z.infer<typeof editPostFormSchema> {
//   imageUrl: string;
// }

export const useEditPost = (defaultValues: Partial<IPost>) => {
  const form = useForm<z.infer<typeof editPostFormSchema>>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      body: defaultValues.body,
      privacy: defaultValues.privacy,
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const onImageRemove = () => {
    if (imageRef.current) imageRef.current.value = '';
  };

  // handlers
  const handleEditPost = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleEditPost, onImageRemove },
    imageRef,
  };
};
