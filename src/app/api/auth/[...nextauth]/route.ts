import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { graphQlServerConnector } from '@/helpers';
import { GET_USER_BY_EMAIL } from '@/lib/queries';
import { NextAuthOptions } from 'next-auth';
import { NEXTAUTH_SECRET } from '@/config';
import { JWT } from 'next-auth/jwt';

// so that we can use accessToken in session
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

const authOption: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const response = await graphQlServerConnector(GET_USER_BY_EMAIL, {
            email,
          });

          const userInfo = response?.data?.users_by_pk;
          if (!userInfo) throw new Error('User not found!');

          const isPasswordMatch = await bcrypt.compare(
            password,
            userInfo.password,
          );

          if (!isPasswordMatch) throw new Error('Password does not match!');

          return { id: email, email, name: userInfo.name };
        } catch (error) {
          let message = 'Something went wrong';
          if (error instanceof Error) message = error.message;
          throw new Error(message);
        }
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      console.log(secret);
      const encodedToken = jwt.sign(token!, secret, { algorithm: 'HS256' });
      return encodedToken;
    },
    decode({ secret, token }) {
      const decodedToken = jwt.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
        ['https://hasura.io/jwt/claims']: {
          ['x-hasura-allowed-roles']: ['user'],
          ['x-hasura-default-role']: 'user',
          ['x-hasura-role']: 'user',
          ['x-hasura-user-email']: token.email,
        },
      };
    },

    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }

      session.accessToken = jwt.sign(token, NEXTAUTH_SECRET!, {
        algorithm: 'HS256',
      });

      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
