import { PropsWithChildren } from 'react';

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex'>
      <main className='flex-1'>{children}</main>
    </div>
  );
}
