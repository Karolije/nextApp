'use client';

import { useShoppingCart } from '@/app/providers/ShoppingCartProvider';

interface ProductProps {
  id: number;
  name: string;
  price: number;
}

export const Product = ({ id, name, price }: ProductProps) => {
  const { addToCart } = useShoppingCart();

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">Cena: {price} zł</p>
      <button
        onClick={() => addToCart({ id, name, price })}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};
