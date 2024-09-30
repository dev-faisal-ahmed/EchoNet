import { WaypointsIcon } from 'lucide-react';
import { Teko } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const teko = Teko({ weight: ['600'], subsets: ['latin'] });

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      className={cn(
        'flex w-fit items-center gap-1 text-4xl font-semibold text-primary',
        className,
        teko.className,
      )}
      href='/'
    >
      <WaypointsIcon size={32} />
      EchoNet
    </Link>
  );
}
