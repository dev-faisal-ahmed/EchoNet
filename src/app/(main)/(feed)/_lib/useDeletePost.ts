import { queryClient } from '@/providers/QueryClient';
import { useMutation } from '@tanstack/react-query';
import { catchAsync, deletePost } from '@/helpers';
import { useState } from 'react';
import { toast } from 'sonner';
import { TAGS } from '@/data';

export const useDeletePost = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TAGS.POSTS] }),
  });

  const handleDeletePost = async (postId: string) => {
    const id = toast.loading('Deleting post...');
    catchAsync({
      id,
      tryFn: async () => {
        const response = await deletePostMutation.mutateAsync(postId);
        if (!response?.postId) throw new Error('Failed to delete the post');
        toast.success('Post deleted successfully', { id });
        setIsDialogOpen(false);
      },
    });
  };

  return {
    states: { isDialogOpen, setIsDialogOpen },
    handleDeletePost,
    isPending: deletePostMutation.isPending,
  };
};
