import { queryClient } from '@/providers/QueryClient';
import { addFriend } from '@/helpers/data-fetching';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';
import { TAGS } from '@/data';

export const useAddFriend = () => {
  const addFriendMutation = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.SUGGESTED_FRIENDS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.SENT_REQUESTS] });
    },
  });

  const handleAddFriend = async (friendId: string) => {
    const id = toast.loading('Adding friend...!');
    catchAsync({
      id,
      tryFn: async () => {
        const response = await addFriendMutation.mutateAsync(friendId);
        toast.success(response?.message, { id });
      },
    });
  };

  return { handleAddFriend, isPending: addFriendMutation.isPending };
};
