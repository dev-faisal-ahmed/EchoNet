import { getMyFriends } from '@/helpers/data-fetching';
import { useQuery } from '@tanstack/react-query';
import { TAGS } from '@/data';

export const useGetMyFriends = () => {
  const { data: friends, isPending } = useQuery({
    queryFn: getMyFriends,
    queryKey: [TAGS.ALL_FRIENDS],
  });

  return { friends, isPending };
};
