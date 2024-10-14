import { DELETE_POST_PERMANENTLY_EVENT } from '@/lib/queries';
import { graphQlServerConnector } from '@/helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const postId = body?.payload?.id;
    const response = await graphQlServerConnector(
      DELETE_POST_PERMANENTLY_EVENT,
      { postId },
    );

    if (!response?.data?.delete_posts?.affected_rows)
      throw new Error('Post was not deleted');

    return new Response(
      JSON.stringify({ message: 'Post deleted successfully' }),
      { status: 200 },
    );
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) message = error.message;
    return new Response(JSON.stringify({ message }), { status: 400 });
  }
}
