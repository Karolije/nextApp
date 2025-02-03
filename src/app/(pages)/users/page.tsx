'use client';

import { useUsers } from '@/app/hooks/useUsers'; 
import { AddUserForm } from '@/app/components';
import Link from 'next/link';

const Omnie: React.FC = () => {
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
      <ul className="list-none p-0 text-gray-700 space-y-3">
        {users?.map((user) => (
          <li
            key={user.id}
            className="bg-gray-100 rounded-lg p-3 shadow-sm hover:bg-gray-200 transition-colors"
          >
            {user.name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800 text-center">
        Dodaj nowego użytkownika
      </h2>
      <AddUserForm />

      <Link href="/login">

        <button
          type="button"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Zaloguj się
        </button>
      </Link>
    </div>
  );
};

export default Omnie;
