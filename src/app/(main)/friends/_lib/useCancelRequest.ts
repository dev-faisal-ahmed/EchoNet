import { cancelFriendRequest } from '@/helpers/data-fetching';
import { queryClient } from '@/providers/QueryClient';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { TAGS } from '@/data';

interface IArgs {
  senderEmail: string;
  receiverEmail: string;
}

export const useCancelRequest = () => {
  const cancelRequestMutation = useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.SENT_REQUESTS] });
    },
  });

  const handleCancelRequest = async ({ senderEmail, receiverEmail }: IArgs) => {
    const id = toast.loading('Canceling request...');
    catchAsync({
      id,
      tryFn: async () => {
        const response = await cancelRequestMutation.mutateAsync({
          senderEmail,
          receiverEmail,
        });
        if (!response) throw new Error('Failed to cancel request');
        toast.success('Request Cancelled', { id });
      },
    });
  };

  return { handleCancelRequest, isPending: cancelRequestMutation.isPending };
};
