import { deleteFriendRequest } from '@/helpers/data-fetching';
import { queryClient } from '@/providers/QueryClient';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { TAGS } from '@/data';

export const useCancelRequest = () => {
  const cancelRequestMutation = useMutation({
    mutationFn: deleteFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.SENT_REQUESTS] });
    },
  });

  const handleCancelRequest = async (requestId: string) => {
    const id = toast.loading('Canceling request...');
    catchAsync({
      id,
      tryFn: async () => {
        const response = await cancelRequestMutation.mutateAsync(requestId);
        if (!response) throw new Error('Failed to cancel request');
        toast.success('Request Cancelled', { id });
      },
    });
  };

  return { handleCancelRequest, isPending: cancelRequestMutation.isPending };
};
