'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Imię musi zawierać co najmniej 2 znaki')
    .max(50, 'Imię nie może przekraczać 50 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/, 'Imię może zawierać tylko litery i spacje'),
});

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
    resolver: zodResolver(userSchema),
  });

  const queryClient = useQueryClient();

  // Użycie typu 'UseMutationResult' dla poprawności dostępu do isLoading
  const mutation: UseMutationResult<any, Error, { name: string }, unknown> = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (old: any) => [...(old || []), newUser]);
      reset();
    },
  });

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Ustawienie stanu po załadowaniu na kliencie
  }, []);

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ name: data.name });
  };

  if (!isClient) {
    return null; // Możesz zwrócić null lub loadera, aż komponent zostanie załadowany na kliencie
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register('name')}
        placeholder="Wpisz imię użytkownika"
        className={errors.name ? 'border-red-500' : ''}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Button
        type="submit"
        disabled={mutation.isLoading}  // Użycie isLoading po zaktualizowanym typie
        className="font-medium"
      >
        {mutation.isLoading ? 'Dodawanie...' : 'Dodaj użytkownika'}
      </Button>

      {mutation.isError && (
        <p className="text-center text-red-500 text-sm mt-4">
          Wystąpił błąd podczas dodawania użytkownika.
        </p>
      )}
    </form>
  );
}
