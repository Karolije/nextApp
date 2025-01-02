'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Imię musi zawierać co najmniej 2 znaki') // Minimalna długość 2 znaki
    .max(50, 'Imię nie może przekraczać 50 znaków') // Maksymalna długość 50 znaków
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/, 'Imię może zawierać tylko litery i spacje'), // Dodatkowa walidacja liter
});


// Typowanie na podstawie schematu Zod
type FormValues = z.infer<typeof userSchema>;

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(userSchema), // Integracja Zod z react-hook-form
  });

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
        {...register('name')}
        placeholder="Wpisz imię użytkownika"
        className={`p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
