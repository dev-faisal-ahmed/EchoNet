interface IProps {
  name: string;
  email: string;
}

export function ProfileIcon({ name, email }: IProps) {
  return (
    <div className='flex gap-3'>
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl font-semibold'>
        {name[0]}
      </div>
      <div className='flex-1'>
        <h3 className='font-semibold'>{name}</h3>
        <p className='mt-1 line-clamp-1 text-sm text-muted-foreground'>
          {email}
        </p>
      </div>
    </div>
  );
}
