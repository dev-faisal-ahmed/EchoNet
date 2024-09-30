'use client';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export function NextAuthProviders({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
