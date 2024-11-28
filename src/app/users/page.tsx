'use client';
import { useQuery } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
};

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data;
}

export default function Omnie() {
  const { data: users, isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users'], 
    queryFn: fetchUsers, 
  });

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <div>
      <h1>Lista użytkowników:</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
