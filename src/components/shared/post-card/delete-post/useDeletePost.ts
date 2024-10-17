import { scheduleDeletePostAction } from './scheduleDeletePostAction';
import { queryClient } from '@/providers/QueryClient';
import { deletePost } from '@/helpers/data-fetching';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
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
        if (!response?.id) throw new Error('Failed to delete the post');

        await scheduleDeletePostAction(
          postId,
          new Date(new Date().getTime() + 24 * 3600 * 1000),
        );

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
