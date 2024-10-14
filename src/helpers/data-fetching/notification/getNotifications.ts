import { graphQlClient } from '@/helpers/axios-client';
import { GET_NOTIFICATIONS } from '@/lib/queries';
import { INotification } from '@/lib/types';

export const getNotifications = async (): Promise<INotification[]> => {
  const response = await graphQlClient(GET_NOTIFICATIONS);
  return response?.data?.notifications;
};
