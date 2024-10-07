import { deleteFriend } from '@/helpers/data-fetching';
import { useMutation } from '@tanstack/react-query';
import { catchAsync } from '@/helpers';
import { toast } from 'sonner';

interface IArgs {
  friendId: string;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
}

export const useDeleteFriend = (onSuccess: () => void) => {
  const deleteFriendMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess,
  });

  const handleDeleteFriend = async ({
    friendId,
    loadingMessage,
    successMessage,
    errorMessage,
  }: IArgs) => {
    const id = toast.loading(loadingMessage);
    catchAsync({
      id,
      tryFn: async () => {
        const response = await deleteFriendMutation.mutateAsync(friendId);
        if (!response) throw new Error(errorMessage);
        toast.success(successMessage, { id });
      },
    });
  };

  return { handleDeleteFriend, isPending: deleteFriendMutation.isPending };
};
