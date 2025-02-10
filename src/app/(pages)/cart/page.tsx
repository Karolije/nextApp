'use client';

import { useShoppingCart } from '@/app/providers/ShoppingCartProvider';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useShoppingCart();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">Koszyk</h1>

      {cart.length === 0 ? (
        <p className="text-gray-700 text-center">Twój koszyk jest pusty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <span>{item.name} x {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-6 w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Wyczyść koszyk
        </button>
      )}

      <div className="mt-6 text-center">
        <Link href="/">
          <span className="text-blue-500 hover:underline">Wróć do sklepu</span>
        </Link>
      </div>
    </div>
  );
}
