import { useSession } from 'next-auth/react';

export const useGetUser = () => {
  const { data } = useSession();
  if (!data) return null;

  const user = data.user;
  return user;
};
