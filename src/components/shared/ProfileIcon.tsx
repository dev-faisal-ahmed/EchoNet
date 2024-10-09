import { cn } from '@/lib/utils';

interface IProps {
  name: string;
  size?: 'sm' | 'lg';
}

export function ProfileIcon({ name, size = 'sm' }: IProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-muted font-semibold',
        size === 'sm' && 'h-10 w-10 text-2xl',
        size === 'lg' && 'h-16 w-16 text-4xl',
      )}
    >
      {name[0]}
    </div>
  );
}
