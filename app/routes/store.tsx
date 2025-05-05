import { MetaFunction } from "@remix-run/node";
import { useCart } from '../hooks/useCart'

export const meta: MetaFunction = () => {
  return [
    { title: "Store - Tales of Murder" },
    { name: "description", content: "Shop vintage mystery books at Tales of Murder" },
  ];
};

export default function StoreCartPage() {
  const { cart } = useCart()

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty.</div>
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.title} x {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>
      <div>Total: ${cart.total}</div>
    </div>
  )
} 