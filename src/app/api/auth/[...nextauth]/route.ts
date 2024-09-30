import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';

import { NextAuthOptions } from 'next-auth';
import { graphQlServerConnector } from '@/helpers';
import { GET_USER_BY_EMAIL } from '@/lib/queries';

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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
