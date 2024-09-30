'use server';

import { graphQlServerConnector } from '@/helpers';
import { SINGUP_ACTION } from '@/lib/queries';
import { API_SECRET } from '@/config';

interface SingupActionArgs {
  name: string;
  email: string;
  password: string;
}

export const singupAction = async ({
  name,
  email,
  password,
}: SingupActionArgs) => {
  const response = await graphQlServerConnector(SINGUP_ACTION, {
    name,
    email,
    password,
    apiSecret: API_SECRET,
  });

  return response?.data;
};
