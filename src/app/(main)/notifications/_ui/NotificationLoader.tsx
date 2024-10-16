import { Skeleton } from '@/components/ui/skeleton';

export function NotificationLoader() {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-col gap-4'>
      <Skeleton className='h-5 w-40' />
      <section className='mt-4 flex flex-col gap-4'>
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <div className='flex items-center gap-4'>
              <div>
                <Skeleton className='h-10 w-10 rounded-full' />
              </div>
              <Skeleton className='h-4 w-44' />
              <Skeleton className='ml-auto h-4 w-12' />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
