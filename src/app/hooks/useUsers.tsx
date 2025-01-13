import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from "@/app/types/user";
import { addUser } from "@/app/services/users/addUser"; 
import { fetchUsers } from "@/app/services/users/fetchUsers"; 

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
