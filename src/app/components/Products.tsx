'use client';

import { useState, useEffect } from 'react';
import { useShoppingCart } from '@/app/providers/ShoppingCartProvider';

interface ProductProps {
  id: number;
  name: string;
  price: number;
}

export const Product = ({ id, name, price }: ProductProps) => {
  const { addToCart } = useShoppingCart();
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    return () => {
      setQuantity(1); 
    };
  }, []);

  return (
    <div className="border p-4 rounded shadow-md bg-white text-black">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-700">Cena: {price} zł</p>

    
      <div className="flex items-center space-x-2 mt-2">
        <button 
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-12 text-center border rounded"
        />
        <button 
          onClick={() => setQuantity((prev) => prev + 1)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          +
        </button>
      </div>

     
      <button
        onClick={() => addToCart({ id, name, price, quantity })}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 w-full"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};
