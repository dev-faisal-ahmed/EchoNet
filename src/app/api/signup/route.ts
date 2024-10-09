import bcrypt from 'bcrypt';

import { IS_USER_EXIST, SING_UP_MUTATION } from '@/lib/queries';
import { NextRequest, NextResponse } from 'next/server';
import { graphQlServerConnector } from '@/helpers';
import { catchAsync } from '@/helpers/catchAsync';
import { API_SECRET, SALT } from '@/config';

export async function POST(req: NextRequest) {
  return catchAsync({
    tryFn: async () => {
      const body = await req.json();
      const input = body.input;
      const name = input?.name;
      const email = input?.email;
      const password = input?.password;
      const apiSecret = input?.apiSecret;

      // to prevent any random person from signing up by just sending a request to this endpoint
      if (apiSecret !== API_SECRET) throw new Error('Invalid API Secret');

      // checking if user exist or not
      const response = await graphQlServerConnector(IS_USER_EXIST, { email });

      if (response?.data?.users?.[0]) throw new Error('User already exist');

      const hashedPassword = await bcrypt.hash(password, SALT);
      const result = await graphQlServerConnector(SING_UP_MUTATION, {
        name,
        email,
        password: hashedPassword,
      });

      const userEmail = result?.data?.insert_users_one?.email;
      if (!userEmail) throw new Error('Failed to insert user');

      return NextResponse.json({ message: 'Signup successful', success: true });
    },
    catchFn: (error) => {
      let message = 'Something went wrong';
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ message, success: false });
    },
  });
}
