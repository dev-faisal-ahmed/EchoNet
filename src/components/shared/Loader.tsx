import HashLoader from 'react-spinners/HashLoader';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export function Loader({ className }: IProps) {
  return (
    <div className={cn('mx-auto w-fit', className)}>
      <HashLoader color='#3B82F6' size={30} />
    </div>
  );
}
