import { Skeleton } from '@/components/ui/skeleton';

export function MyFriendLoader() {
  return (
    <div className='flex w-full max-w-xs flex-col gap-4'>
      <Skeleton className='h-6 w-32' />
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className='p-6'>
          <div className='flex items-center gap-4'>
            <div>
              <Skeleton className='h-12 w-12 rounded-full' />
            </div>
            <div className='w-full'>
              <Skeleton className='h-6 w-2/3' />
              <Skeleton className='mt-2 h-4 w-full' />
            </div>
          </div>
          <Skeleton className='mt-4 h-10 w-full' />
        </Skeleton>
      ))}
    </div>
  );
}
