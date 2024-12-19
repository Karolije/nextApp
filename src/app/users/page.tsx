'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import '../globals.css';

type User = {
  id: number;
  name: string;
};

// Funkcja do pobierania użytkowników
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data;
}

// Funkcja do dodawania użytkownika
async function addUser(newUser: { name: string }): Promise<User> {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to add user');
  }

  return response.json();
}

export default function Omnie() {
  const { data: users, isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();

  // Mutacja do dodawania nowego użytkownika
  const { mutate, isLoading: isAddingUser, isError: isAddingUserError } = useMutation<User, Error, { name: string }>({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => [...(oldUsers || []), newUser]);
    },
    onError: () => {
      console.error('Error adding user');
    },
  });

  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      mutate({ name: newUserName });
      setNewUserName('');
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5 text-lg">Ładowanie...</div>;
  }

  if (isError) {
    return <div className="text-center mt-5 text-lg text-red-500">Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Lista użytkowników</h1>
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

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800 text-center">Dodaj nowego użytkownika</h2>
      <form onSubmit={handleAddUser} className="flex flex-col gap-4">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Wpisz imię użytkownika"
          required
          className="p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        />
        <button
          type="submit"
          disabled={isAddingUser}
          className={`p-3 rounded-lg text-white font-medium shadow-md ${
            isAddingUser
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 transition-colors'
          }`}
        >
          {isAddingUser ? 'Dodawanie...' : 'Dodaj użytkownika'}
        </button>
      </form>

      {isAddingUserError && (
        <p className="text-center text-red-500 text-sm mt-4">
          Wystąpił błąd podczas dodawania użytkownika.
        </p>
      )}
    </div>
  );
}
