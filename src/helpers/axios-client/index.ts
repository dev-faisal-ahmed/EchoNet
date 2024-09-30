import { axiosInstance } from './axiosInstance';
import { catchAsync } from '../catchAsync';

export const graphQlClient = async (
  query: string,
  variables: Record<string, unknown>,
) => {
  const body = {
    query,
    variables: variables || {},
  };
  return catchAsync({
    tryFn: async () => {
      const response = await axiosInstance.post('', body);
      return response.data;
    },
    catchFn: (error) => {
      let message = 'Something went wrong!';
      if (error instanceof Error) message = error.message;
      throw new Error(message);
    },
  });
};
