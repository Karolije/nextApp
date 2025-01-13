import { User } from "@/app/types/user";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  if (!response.ok) throw new Error('Error fetching users');
  return response.json();
};
