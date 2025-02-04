'use client';

import { useShoppingCart } from '@/app/providers/ShoppingCardProvider';

export const Cart = () => {
  const { cart, removeFromCart, clearCart } = useShoppingCart();

  return (
    <div className="border p-4 rounded shadow-md bg-white mt-6 text-black">
      <h2 className="text-xl font-semibold mb-2">Koszyk</h2>
      {cart.length === 0 ? (
        <p className="text-gray-700">Koszyk jest pusty</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2 text-black">
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
          className="mt-4 w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Wyczyść koszyk
        </button>
      )}
    </div>
  );
};
