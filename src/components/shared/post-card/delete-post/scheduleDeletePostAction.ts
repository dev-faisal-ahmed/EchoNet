'use server';

import { HASURA_ADMIN_SECRET, HASURA_METADATA_URL } from '@/config';
import { API_URL } from '@/data';

export const scheduleDeletePostAction = async (
  postId: string,
  scheduledAt: Date,
) => {
  try {
    const response = await fetch(HASURA_METADATA_URL!, {
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/json',
        ['x-hasura-admin-secret']: HASURA_ADMIN_SECRET!,
      },

      body: JSON.stringify({
        type: 'create_scheduled_event',
        args: {
          webhook: `${API_URL.SERVER_ADDRESS}/api/delete-post`,
          schedule_at: scheduledAt,
          payload: {
            id: postId,
          },
        },
      }),
    });

    if (!response.ok) throw new Error('Failed to create a schedule');
    return { success: 'Post is scheduled to be deleted' };
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
};
