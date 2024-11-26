"use client"
import { useCart } from "../app/context/context";
import { Product } from "./product-grid";

type Props = {
  product: Product
}

const AddToCartBtn = ({product} : Props)  => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addToCart } = useCart();
  
  return (
    <button 
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
              Agregar al pedido
            </button>
  )
}

export default AddToCartBtn