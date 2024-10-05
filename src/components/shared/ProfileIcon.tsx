interface IProps {
  name: string;
}

export function ProfileIcon({ name }: IProps) {
  return (
    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted text-2xl font-semibold'>
      <span className='text-2xl font-semibold'>{name[0]}</span>
    </div>
  );
}
