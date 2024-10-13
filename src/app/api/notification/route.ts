import { GET_CHAT_ROOM_INFO, INSERT_NOTIFICATION } from '@/lib/queries';
import { ENotificationType, IChatLink } from '@/lib/types';
import { graphQlServerConnector } from '@/helpers';

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
    }

    if (table === 'messages') {
      const invokerId = data?.senderId;
      const chatRoomId = data?.chatRoomId;

      // finding the receiver
      const chatRoomResponse = await graphQlServerConnector(
        GET_CHAT_ROOM_INFO,
        { id: chatRoomId },
      );

      const chatRoomInfo = chatRoomResponse?.data?.chat_rooms_by_pk as Omit<
        IChatLink,
        'id' | 'messages'
      >;

      // checking which one is receiver
      const receiver =
        chatRoomInfo.user1.id === invokerId
          ? chatRoomInfo.user2
          : chatRoomInfo.user1;

      const receiverId = receiver.id;

      const response = await graphQlServerConnector(INSERT_NOTIFICATION, {
        invokerId,
        receiverId,
        type: ENotificationType.MESSAGE,
      });

      const responseData = response.data.insert_notifications_one;
      if (!responseData)
        throw new Error('Failed to insert into notification table');
    }

    return Response.json({
      message: 'Email notification has been sent',
    });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return new Response(JSON.stringify({ message }), { status: 400 });
  }
}
