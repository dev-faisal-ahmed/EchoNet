import { deletePostPermanently } from '@/helpers/data-fetching';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDeletePostPermanently = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deletePostPermanentlyMutation = useMutation({
    mutationFn: deletePostPermanently,
  });

  const handleDeletePostPermanently = async (postId: string) => {
    const id = toast.loading('Deleting post permanently...');
    catchAsync({
      id,
      async tryFn() {
        const response =
          await deletePostPermanentlyMutation.mutateAsync(postId);
        if (!response) throw new Error('Failed to delete post permanently');
        toast.success('Post deleted permanently', { id });
        setIsDialogOpen(false);
      },
    });
  };

  return {
    states: { isDialogOpen, setIsDialogOpen },
    handlers: { handleDeletePostPermanently },
    isPending: deletePostPermanentlyMutation.isPending,
  };
};
