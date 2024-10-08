import { CHAT_ROOM_EXISTS, CREATE_CHAT_ROOM } from '@/lib/queries';
import { graphQlServerConnector } from '@/helpers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body.event.data.new;
    const user1Id = data.receiverId;
    const user2Id = data.senderId;
    const status = data.status;

    if (status !== 'ACCEPTED') throw new Error(`Users are no longer friends`);

    // checking if chat room is already created as user could have been friends before and after that they became friends again
    const response = await graphQlServerConnector(CHAT_ROOM_EXISTS, {
      user1Id,
      user2Id,
    });

    const chatRoom = response?.data?.chat_rooms;
    if (chatRoom?.length) throw new Error('Chat room already exists!');

    const insertResponse = await graphQlServerConnector(CREATE_CHAT_ROOM, {
      user1Id,
      user2Id,
    });

    if (!insertResponse?.data?.insert_chat_rooms_one)
      throw new Error('Failed to create chat room!');

    return new Response('Chat room created successfully!', { status: 200 });
  } catch (error) {
    let message = 'Something went wrong!';
    if (error instanceof Error) message = error.message;
    return new Response(message, { status: 400 });
  }
}
