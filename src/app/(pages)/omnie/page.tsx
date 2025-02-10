import { useUsers } from '../../hooks/useUsers';
import { UserList } from '@/app/components/UserList';
import dynamic from 'next/dynamic';

const AddUserForm = dynamic(
  () =>
    import('@/app/components/users/AddUserForm').then((mod) => mod.AddUserForm),
  { ssr: false },
);

export default function Omnie() {
  const { users, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div className="text-center mt-5 text-lg">Ładowanie...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-5 text-lg text-red-500">
        Wystąpił błąd podczas ładowania danych.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Lista użytkowników
      </h1>
      <UserList users={users || []} />
      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800 text-center">
        Dodaj nowego użytkownika
      </h2>
      <AddUserForm />
    </div>
  );
}
