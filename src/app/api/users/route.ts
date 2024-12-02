
import { NextResponse } from 'next/server';

interface User {
  name: string;
}

let users = [
  { id: 1, name: "Anna" },
  { id: 2, name: "Jarek" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser: User = await request.json();


  // Dodajemy nowego użytkownika
  const newId = users.length + 1;
  const createdUser = { id: newId, ...newUser };
  users.push(createdUser);

  return NextResponse.json(createdUser, { status: 201 });
}
