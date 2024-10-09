import { useSession } from 'next-auth/react';

export const useGetUser = () => {
  const { data } = useSession();
  if (!data) throw new Error('User not found');

  const user = data.user;
  return user;
};
