import { friendTemplate, messageTemplate } from '@/helpers/email/templates';
import { GET_CHAT_ROOM_INFO, INSERT_NOTIFICATION } from '@/lib/queries';
import { ENotificationType, IChatLink } from '@/lib/types';
import { formateDate } from '@/helpers/dateHelper';
import { graphQlServerConnector } from '@/helpers';
import { sendEmail } from '@/helpers/email';

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

        // sending email
        const senderName = responseData?.invoker?.name;
        const receiverEmail = responseData?.receiver?.email;
        const message = friendTemplate({
          senderName,
          message: 'sent you a friend request',
        });

        const emailResponse = await sendEmail({
          email: receiverEmail,
          subject: `EchoNet | ${senderName} sent you a friend request`,
          messageInHTML: message,
          messageInText: `${senderName} sent you a friend request`,
        });

        if (emailResponse.error) throw new Error(emailResponse.error);
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

        const senderName = responseData?.invoker?.name;
        const receiverEmail = responseData?.receiver?.email;

        const message = friendTemplate({
          senderName,
          message: 'accepted your friend request',
        });

        const emailResponse = await sendEmail({
          email: receiverEmail,
          subject: `EchoNet | ${senderName} accepted your friend request`,
          messageInHTML: message,
          messageInText: `${senderName} accepted your friend request`,
        });

        if (emailResponse.error) throw new Error(emailResponse.error);
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

      const sender =
        chatRoomInfo.user1.id === invokerId
          ? chatRoomInfo.user1
          : chatRoomInfo.user2;

      const receiverId = receiver.id;

      const response = await graphQlServerConnector(INSERT_NOTIFICATION, {
        invokerId,
        receiverId,
        type: ENotificationType.MESSAGE,
      });

      const responseData = response.data.insert_notifications_one;
      if (!responseData)
        throw new Error('Failed to insert into notification table');

      // sending message
      const messageResponse = await sendEmail({
        email: receiver.email,
        subject: `EchoNet | ${sender.name} sent you a message`,
        messageInText: `
        Message : ${data?.body} 
        sent at : ${formateDate(data?.createdAt)}
        `,

        messageInHTML: messageTemplate({
          message: data?.body,
          imageUrl: data?.imageUrl,
          date: formateDate(data?.createdAt),
          senderName: sender.name,
        }),
      });

      if (messageResponse.error) throw new Error(messageResponse.error);
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
