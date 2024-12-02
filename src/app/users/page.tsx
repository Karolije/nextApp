'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './style.css';

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
      // Po pomyślnym dodaniu użytkownika aktualizujemy cache
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
      setNewUserName(''); // Resetujemy formularz
    }
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <div className="user-container">
      <h1>Lista użytkowników:</h1>
      <ul className="user-list">
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Dodaj nowego użytkownika:</h2>
      <form onSubmit={handleAddUser} className="user-form">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Wpisz nazwisko użytkownika"
          required
          className="user-input"
        />
        <button type="submit" disabled={isAddingUser} className="submit-button">
          {isAddingUser ? 'Dodawanie...' : 'Dodaj użytkownika'}
        </button>
      </form>

      {isAddingUserError && <p className="error-message">Wystąpił błąd podczas dodawania użytkownika.</p>}
    </div>
  );
}
