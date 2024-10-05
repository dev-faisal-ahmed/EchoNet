import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export function FriendLoader({ className }: IProps) {
  return (
    <div className={cn(className)}>
      <Skeleton className='h-6 w-52' />
      <div className='mt-4 grid grid-cols-4 gap-6'>
        {[...Array(7)].map((_, index) => (
          <Skeleton key={index}>
            <Skeleton className='h-28 w-full' />
          </Skeleton>
        ))}
      </div>
      <Skeleton />
    </div>
  );
}
