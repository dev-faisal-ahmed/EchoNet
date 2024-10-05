import { graphQlClient } from '@/helpers/axios-client';
import { CANCEL_FRIEND_REQUEST } from '@/lib/queries';

interface IArgs {
  senderEmail: string;
  receiverEmail: string;
}

export const cancelFriendRequest = async ({
  senderEmail,
  receiverEmail,
}: IArgs) => {
  const response = await graphQlClient(CANCEL_FRIEND_REQUEST, {
    senderEmail,
    receiverEmail,
  });

  return response?.data?.delete_friends_by_pk;
};
