import { axiosInstanceForServer } from './axiosInstanceForServer';

export async function graphQlServerConnector(
  query: string,
  variables: Record<string, unknown> = {},
) {
  try {
    const response = await axiosInstanceForServer.post('', {
      query,
      variables,
    });
    return response.data;
  } catch (error) {
    let message = 'Something went wrong!';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}
