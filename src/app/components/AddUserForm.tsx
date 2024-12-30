'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FormValues = {
  name: string;
};

async function addUser(newUser: { name: string }) {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error('Failed to add user');
  return response.json();
}

export default function AddUserForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (old: any) => [...(old || []), newUser]);
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ name: data.name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        {...register('name', { required: 'Imię jest wymagane' })}
        placeholder="Wpisz imię użytkownika"
        className="p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
      />
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={`p-3 rounded-lg text-white font-medium shadow-md ${
          mutation.isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 transition-colors'
        }`}
      >
        {mutation.isLoading ? 'Dodawanie...' : 'Dodaj użytkownika'}
      </button>
      {mutation.isError && (
        <p className="text-center text-red-500 text-sm mt-4">
          Wystąpił błąd podczas dodawania użytkownika.
        </p>
      )}
    </form>
  );
}
