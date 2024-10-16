import { Skeleton } from '@/components/ui/skeleton';

export function ChatLoader() {
  return (
    <main
      style={{ height: `calc(100vh - 48px)` }}
      className='grid grid-rows-[auto_1fr_auto]'
    >
      <div className='flex items-center gap-4 border-b border-border pb-4'>
        <Skeleton className='h-16 w-16 rounded-full' />
        <Skeleton className='h-12 w-40' />
      </div>
      <div />
      <Skeleton className='mt-16 h-12 w-full' />
    </main>
  );
}
