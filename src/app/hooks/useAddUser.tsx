import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
};

const addUser = async (newUser: { name: string }): Promise<User> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, newUser, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addUserMutation = useMutation<User, Error, { name: string }>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalidate cache for 'users'
    },
  });

  return addUserMutation;
};
