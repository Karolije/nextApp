import { NextResponse } from 'next/server';
import { User } from '@/app/types';

const users: User[] = [
  { id: 1, name: 'Anna' },
  { id: 2, name: 'Jarek' },
];

export const GET = async () => NextResponse.json(users);

export const POST = async (request: Request) => {
  const newUser: User = await request.json();

  // Dodajemy nowego użytkownika
  const newId = users.length + 1;
  const createdUser = { id: newId, ...newUser };
  users.push(createdUser);

  return NextResponse.json(createdUser, { status: 201 });
};
