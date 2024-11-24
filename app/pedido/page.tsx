'use client'
import { useCart } from "../context/context";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

const CartPage = () => {
  const { cart, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    const message = cart
      .map((item, index) => `${index + 1}. ${item.name} - ${item.price}`)
      .join("\n");

    cart.map((item, index) => console.log(`${index + 1}. ${item.name} - ${item.price}`));

    const encodedMessage = encodeURIComponent(
      `Hola, quisiera realizar el siguiente pedido:\n\n${message}`
    );

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div>
      <h1>Tu Carrito</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button
        onClick={handleWhatsAppOrder}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Enviar Pedido por WhatsApp
      </button>
      <button
        onClick={clearCart}
        className="bg-red-500 text-white px-4 py-2 mt-2"
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default CartPage;
