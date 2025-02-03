'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/'
      });
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Logowanie
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col text-gray-800">
          Email:
          <input
            type="email"
            className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col text-gray-800">
          Hasło:
          <input
            type="password"
            className="border border-gray-300 rounded p-2 mt-1 text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}
