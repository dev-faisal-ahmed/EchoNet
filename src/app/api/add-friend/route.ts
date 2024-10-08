import { ADD_FRIEND, FRIEND_SHIP_EXISTS } from '@/lib/queries';
import { graphQlServerConnector } from '@/helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const receiverId = body?.input?.receiverId;
    const senderId = body.session_variables?.['x-hasura-user-id'];

    // first of checking if they are already friends or not
    const response = await graphQlServerConnector(FRIEND_SHIP_EXISTS, {
      senderId,
      receiverId,
    });

    if (response?.data?.friends?.length)
      throw new Error('You are already friends');

    // creating new friend ship
    const newFriendShip = await graphQlServerConnector(ADD_FRIEND, {
      senderId,
      receiverId,
    });

    if (!newFriendShip?.data?.insert_friends_one)
      throw new Error('Failed to add friend');

    return Response.json({
      success: true,
      message: 'Friend added successfully',
    });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return Response.json({ success: false, message });
  }
}
