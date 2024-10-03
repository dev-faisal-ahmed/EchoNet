import { Avatar, AvatarFallback } from '../ui/avatar';

interface IProps {
  name: string;
}

export function ProfileIcon({ name }: IProps) {
  return (
    <Avatar>
      <AvatarFallback className='text-2xl font-semibold'>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
