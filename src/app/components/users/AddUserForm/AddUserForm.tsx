'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { userSchema } from '@/app/schemas';
import { addUser } from '@/app/services';
import { USER_KEY } from '@/app/constants';

type FormValues = z.infer<typeof userSchema>;

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
  });

  const queryClient = useQueryClient();

  const { isPending, mutate, isError, isSuccess } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      //moze redirect do listy uzytkownikow?
      queryClient.invalidateQueries({ queryKey: [USER_KEY.LIST] });
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({ name: data.name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {isSuccess && <div>Dodano uzytkownika</div>}
      <Input
        {...register('name')}
        placeholder="Wpisz imię użytkownika"
        className={errors.name ? 'border-red-500' : ''}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
      <Button type="submit" disabled={isPending} className="font-medium">
        {isPending ? 'Dodawanie...' : 'Dodaj użytkownika'}
      </Button>

      {isError && (
        <p className="text-center text-red-500 text-sm mt-4">
          Wystąpił błąd podczas dodawania użytkownika.
        </p>
      )}
    </form>
  );
};

export { AddUserForm };
