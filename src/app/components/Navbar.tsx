'use client';

import Link from 'next/link';
import { useShoppingCart } from '@/app/providers/ShoppingCardProvider';

export const Navbar = () => {
  const { cart } = useShoppingCart();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-lg font-bold">
      <Link href="/users">
  <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded">
    Użytkownicy
  </button>
</Link>

<Link href="/login">
  <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded ml-4">
    Logowanie
  </button>
</Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/shop">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
            Sklep
          </button>
        </Link>
        <Link href="/cart" className="relative flex items-center">
          <span className="text-xl">🛒</span>
          {cart.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
