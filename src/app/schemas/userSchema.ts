import { z } from 'zod';
export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Imię musi zawierać co najmniej 2 znaki')
    .max(50, 'Imię nie może przekraczać 50 znaków')
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/,
      'Imię może zawierać tylko litery i spacje',
    ),
});
