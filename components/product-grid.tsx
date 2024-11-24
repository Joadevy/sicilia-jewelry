'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL;
import { useCart } from "../app/context/context";

export interface Product {
  id: string
  name: string
  price: number
  image: string
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const csv = await fetch(SHEET_URL!).then((res) => res.text());
        console.log('CSV: ', csv);
        const products: Product[] = csv.split('\n').slice(1).map((line) => {
          const [id, name, price, image] = line.split(',');
          return { id, name, price: parseFloat(price), image };
        });
        setProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center">Cargando productos...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button 
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

