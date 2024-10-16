import { Skeleton } from '@/components/ui/skeleton';

export function ChatTopbarLoader() {
  return (
    <nav className='mb-6 flex w-full items-center gap-4 md:hidden'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <Skeleton className='h-12 w-28 sm:w-40' />
      <Skeleton className='ml-auto h-12 w-12 rounded-full' />
    </nav>
  );
}
