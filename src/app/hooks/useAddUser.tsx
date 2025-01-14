import { useMutation, useQueryClient } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
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

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addUserMutation = useMutation<User, Error, { name: string }>({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => [...(oldUsers || []), newUser]);
    },
  });

  return addUserMutation;
};
