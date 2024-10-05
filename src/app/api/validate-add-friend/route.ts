import { graphQlServerConnector } from '@/helpers';
import { GET_FRIENDSHIP } from '@/lib/queries';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const [input] = body?.data?.input;
    const userEmail = body?.session_variables?.['x-hasura-user-email'];

    let response = await graphQlServerConnector(GET_FRIENDSHIP, {
      receiverEmail: userEmail,
      senderEmail: input?.receiverEmail,
    });

    if (response?.data?.friends_by_pk)
      throw new Error('This user already sent you a friend request');

    response = await graphQlServerConnector(GET_FRIENDSHIP, {
      receiverEmail: input?.receiverEmail,
      senderEmail: userEmail,
    });

    if (response?.data?.friends_by_pk)
      throw new Error('You have Already sent request to that user');

    return new Response('Validation successful', { status: 200 });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return new Response(JSON.stringify({ message }), { status: 400 });
  }
}
