'use client';

import { useShoppingCart } from '@/app/providers/ShoppingCartProvider';

interface ProductProps {
  id: number;
  name: string;
  price: number;
}

export const Product = ({ id, name, price }: ProductProps) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const productInCart = cart.find((item) => item.id === id);

  return (
    <div className="border p-4 rounded shadow-md bg-white text-black">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-700">Cena: {price} zł</p>

     
        <button
          onClick={() => addToCart({ id, name, price, quantity: 1 })}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Dodaj do koszyka
        </button>
      
    </div>
  );
};
