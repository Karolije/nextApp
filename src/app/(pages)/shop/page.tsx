'use client';

import { Product } from '@/app/components/Products';

const products = [
  { id: 1, name: 'Produkt 1', price: 100 },
  { id: 2, name: 'Produkt 2', price: 50 },
  { id: 3, name: 'Produkt 3', price: 5 },
];

export default function ShopPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-black text-center mb-6">Sklep</h1>

      <div className="grid gap-4 text-black">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
