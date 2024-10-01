import { cn } from '@/lib/utils';

interface IProps {
  name: string;
  size?: number;
  className?: string;
}
export function ProfileIcon({ name, size = 40, className }: IProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        'flex items-center justify-center rounded-full bg-primary text-2xl font-semibold',
        className,
      )}
    >
      {name[0]}
    </div>
  );
}
