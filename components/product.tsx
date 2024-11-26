import Image from 'next/image'
const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL;
import AddToCartBtn from './AddToCartBtn';

export interface Product {
  id: string
  name: string
  price: number
  image: string
}

async function fetchProducts(): Promise<Product[]> {
      try {
        const csv = await fetch(SHEET_URL!).then((res) => res.text());
        const products: Product[] = csv.split('\n').slice(1).map((line) => {
          const [id, name, price, image] = line.split(',');
          return { id, name, price: parseFloat(price), image };
        });

        return products
      } catch (error) {
        console.error('Error fetching products:', error);
        return []
      }
  }


export async function Product() {
  const products = await fetchProducts();

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
            <AddToCartBtn product={product} />
          </div>
        </div>
      ))}
    </div>
  )
}

