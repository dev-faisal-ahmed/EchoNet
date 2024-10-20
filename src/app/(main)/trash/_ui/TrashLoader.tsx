import { Skeleton } from '@/components/ui/skeleton';

export function TrashLoader() {
  return (
    <main className='mx-auto max-w-2xl'>
      <Skeleton className='h-5 w-40' />
      <section className='mt-8 flex flex-col gap-6'>
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className='p-6'>
            <div className='flex gap-4'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='mt-2 h-4 w-20' />
              </div>
            </div>
            <Skeleton className='mt-4 h-40 w-full' />
          </Skeleton>
        ))}
      </section>
    </main>
  );
}
