import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from "@/app/types/user"

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/api/users');
  if (!response.ok) throw new Error('Error fetching users');
  return response.json();
};

const addUser = async (newUser: { name: string }): Promise<User> => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error('Failed to add user');
  return response.json();
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const addUserMutation = useMutation<User, Error, { name: string }>({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => [
        ...(oldUsers || []),
        newUser,
      ]);
    },
  });

  return { users, isLoading, isError, addUserMutation };
};
