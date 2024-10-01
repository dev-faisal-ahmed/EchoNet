import { Skeleton } from '@/components/ui/skeleton';

export function SidebarLoader() {
  return (
    <div className='flex'>
      <Skeleton className='h-screen w-full max-w-[240px] p-6'>
        <Skeleton className='mx-auto h-[40px] w-2/3' />
        <div className='mt-6 flex flex-col gap-4'>
          {[...Array(4)].map((_, index) => (
            <Skeleton className='h-[30px] w-full' key={index} />
          ))}
        </div>
      </Skeleton>
    </div>
  );
}
