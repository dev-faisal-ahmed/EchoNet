import { axiosInstance } from './axiosInstance';

export const graphQlClient = async (
  query: string,
  variables?: Record<string, unknown>,
) => {
  try {
    const response = await axiosInstance.post('', {
      query,
      variables,
    });
    return response.data;
  } catch (error) {
    let message = 'Something went wrong!';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};
