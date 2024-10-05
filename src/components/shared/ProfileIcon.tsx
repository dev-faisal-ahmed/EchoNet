import { Avatar, AvatarFallback } from '../ui/avatar';

interface IProps {
  name: string;
}

export function ProfileIcon({ name }: IProps) {
  return (
    <Avatar>
      <AvatarFallback>
        <span className='text-2xl font-semibold'>{name[0]}</span>
      </AvatarFallback>
    </Avatar>
  );
}
