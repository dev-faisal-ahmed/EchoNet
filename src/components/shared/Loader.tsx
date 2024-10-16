import HashLoader from 'react-spinners/HashLoader';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  size?: number;
}

export function Loader({ className, size = 30 }: IProps) {
  return (
    <div className={cn('mx-auto w-fit', className)}>
      <HashLoader color='#3B82F6' size={size} />
    </div>
  );
}
