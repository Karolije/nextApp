import { useQuery } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  if (!response.ok) throw new Error('Error fetching users');
  return response.json();
};

export const useUsers = () => {
  const { data: users, isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return { users, isLoading, isError };
};
