import { INSERT_NOTIFICATION } from '@/lib/queries';
import { graphQlServerConnector } from '@/helpers';
import { ENotificationType } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = body.event?.data?.new;
    const table = body.table?.name;

    // handle notification for sent and accept friend requests
    if (table === 'friends') {
      const status = data?.status;
      if (status === 'REQUESTED') {
        const invokerId = data?.senderId;
        const receiverId = data?.receiverId;

        // inserting into notification
        const response = await graphQlServerConnector(INSERT_NOTIFICATION, {
          invokerId,
          receiverId,
          type: ENotificationType.SENT_REQUEST,
        });

        const responseData = response.data.insert_notifications_one;
        if (!responseData)
          throw new Error('Failed to insert into notification table');
      }

      if (status === 'ACCEPTED') {
        const invokerId = data?.receiverId;
        const receiverId = data?.senderId;

        const response = await graphQlServerConnector(INSERT_NOTIFICATION, {
          invokerId,
          receiverId,
          type: ENotificationType.ACCEPT_REQUEST,
        });

        const responseData = response.data.insert_notifications_one;
        if (!responseData)
          throw new Error('Failed to insert into notification table');
      }

      return Response.json({
        message: 'Email notification has been sent',
      });
    }
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return new Response(JSON.stringify({ message }), { status: 400 });
  }
}
