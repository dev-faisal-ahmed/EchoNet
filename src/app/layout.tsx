import type { Metadata } from 'next';

import { TanStackQueryClientProvider } from '@/providers/QueryClient';
import { NextAuthProviders } from '@/providers/NextAuthProviders';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'EchoNet',
};

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${font.className} bg-dark-background text-sm antialiased`}
      >
        <NextAuthProviders>
          <TanStackQueryClientProvider>
            {children}
            <Toaster richColors duration={1500} theme='dark' />
          </TanStackQueryClientProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
