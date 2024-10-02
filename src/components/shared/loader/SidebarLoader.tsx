import { Skeleton } from '@/components/ui/skeleton';
import { FeedLoader } from './FeedLoader';

export function SidebarLoader() {
  return (
    <div className='flex gap-12'>
      <Skeleton className='w-full p-6 md:h-screen md:max-w-[240px]'>
        <Skeleton className='mx-auto h-[40px] w-2/3' />
        <div className='mt-6 flex flex-col gap-4'>
          {[...Array(4)].map((_, index) => (
            <Skeleton className='h-[30px] w-full' key={index} />
          ))}
        </div>
      </Skeleton>
      <FeedLoader />
    </div>
  );
}
