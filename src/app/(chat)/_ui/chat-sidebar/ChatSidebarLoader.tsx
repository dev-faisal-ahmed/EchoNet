import { Skeleton } from '@/components/ui/skeleton';

export function ChatSidebarLoader() {
  return (
    <aside className='sticky top-0 hidden h-screen w-full max-w-[280px] overflow-y-auto border-r p-6 md:block'>
      <Skeleton className='mx-auto h-12 w-1/2' />
      <div className='mt-6 flex flex-col gap-4'>
        {[...Array(4)].map((_, index) => (
          <div key={index} className='flex items-center gap-4'>
            <div>
              <Skeleton className='h-10 w-10 rounded-full' />
            </div>
            <div className='w-full'>
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='mt-2 h-4 w-full' />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
