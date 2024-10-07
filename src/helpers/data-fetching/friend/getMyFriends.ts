import { graphQlClient } from '@/helpers/axios-client';
import { GET_MY_FRIENDS } from '@/lib/queries';
import { IFriend } from '@/lib/types';

interface IMyFriend {
  id: string;
  sender: IFriend;
  receiver: IFriend;
}

export const getMyFriends = async (): Promise<IMyFriend[]> => {
  const response = await graphQlClient(GET_MY_FRIENDS);
  return response?.data?.friends || [];
};
