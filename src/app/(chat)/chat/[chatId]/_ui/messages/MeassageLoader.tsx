import { Skeleton } from '@/components/ui/skeleton';
import { Fragment } from 'react';

export function MessageLoader() {
  return (
    <div className='flex h-full flex-col overflow-y-auto pb-16 pr-2'>
      <div className='mt-auto flex flex-col gap-6'>
        {[...Array(2)].map((_, index) => (
          <Fragment key={index}>
            <div className='flex gap-4'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-20 w-1/2' />
            </div>
            <Skeleton className='ml-auto h-28 w-1/2' />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
