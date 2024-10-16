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
      <div className='flex h-full flex-col overflow-y-auto pr-2'>
        <div className='mt-auto flex flex-col gap-6'>
          {[...Array(2)].map((_, index) => (
            <>
              <div className='flex gap-4'>
                <Skeleton className='h-8 w-8 rounded-full' />
                <Skeleton className='h-20 w-1/2' />
              </div>
              <Skeleton className='ml-auto h-28 w-1/2' />
            </>
          ))}
        </div>
      </div>
      <Skeleton className='mt-8 h-12 w-full' />
    </main>
  );
}
