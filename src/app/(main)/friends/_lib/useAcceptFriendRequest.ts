import { acceptFriendRequest } from '@/helpers/data-fetching';
import { queryClient } from '@/providers/QueryClient';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { TAGS } from '@/data';

export const useAcceptFriendRequest = () => {
  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.FRIEND_REQUESTS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.ALL_FRIENDS] });
    },
  });

  const handleAcceptFriendRequest = (requestId: string) => {
    const id = toast.loading('Accepting friend request...');
    catchAsync({
      id,
      tryFn: async () => {
        const response =
          await acceptFriendRequestMutation.mutateAsync(requestId);
        if (!response) throw new Error('Failed to accept request');
        toast.success('Friend request accepted', { id });
      },
    });
  };

  return {
    handleAcceptFriendRequest,
    isPending: acceptFriendRequestMutation.isPending,
  };
};
