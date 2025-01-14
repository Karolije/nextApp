'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddUser } from '@/app/hooks/useAddUser';  
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { userSchema } from '@/app/schemas';

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

  const { mutate, isError, error, isSuccess, isLoading } = useAddUser(); 

  const onSubmit = (data: FormValues) => {
    mutate({ name: data.name });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {isSuccess && <div>Dodano użytkownika</div>}
      <Input
        {...register('name')}
        placeholder="Wpisz imię użytkownika"
        className={errors.name ? 'border-red-500' : ''}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
      <Button type="submit" disabled={isLoading} className="font-medium">
        {isLoading ? 'Dodawanie...' : 'Dodaj użytkownika'}
      </Button>

      {isError && (
        <p className="text-center text-red-500 text-sm mt-4">
          Wystąpił błąd podczas dodawania użytkownika: {error?.message || 'Nieznany błąd.'}
        </p>
      )}
    </form>
  );
};

export { AddUserForm };
