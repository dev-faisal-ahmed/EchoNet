import { restorePost } from '@/helpers/data-fetching';
import { queryClient } from '@/providers/QueryClient';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { useState } from 'react';
import { TAGS } from '@/data';
import { toast } from 'sonner';

export const useRestorePost = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const restorePostMutation = useMutation({
    mutationFn: restorePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.POSTS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.DELETED_POSTS] });
    },
  });

  const handlePostRestore = async (postId: string) => {
    const id = toast.loading('Restoring post...');
    catchAsync({
      id,
      async tryFn() {
        const response = await restorePostMutation.mutateAsync(postId);
        if (!response) throw new Error('Failed to restore the post');
        toast.success('Post restored successfully', { id });
        setIsDialogOpen(false);
      },
    });
  };

  return {
    states: { isDialogOpen, setIsDialogOpen },
    handlePostRestore,
    isPending: restorePostMutation.isPending,
  };
};
