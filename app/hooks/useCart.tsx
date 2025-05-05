import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY || 'pk_733adb9b9d036317f09a4d69d27738898c5358febbbe7e4dd729de9b8e09a168'

interface CartItem {
  id: string
  title: string
  quantity: number
  price: number
}

interface Cart {
  id: string
  items: CartItem[]
  total: number
}

interface CartContextType {
  cart: Cart | null
  addItem: (productId: string, variantId: string, quantity?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  fetchCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = 'medusa_cart_id'

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null)

  const getCartId = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CART_ID_KEY)
  }

  const setCartId = (id: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(CART_ID_KEY, id)
  }

  const fetchCart = async () => {
    const cartId = getCartId()
    if (!cartId) {
      // Create new cart
      try {
        const res = await fetch(`${MEDUSA_BACKEND_URL}/store/carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-publishable-api-key': MEDUSA_API_KEY },
        })
        const data = await res.json()
        setCartId(data.cart.id)
        setCart(mapMedusaCart(data.cart))
      } catch (e) {
        console.error('Failed to create cart', e)
      }
      return
    }
    // Fetch existing cart
    try {
      const res = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
        headers: { 'x-publishable-api-key': MEDUSA_API_KEY },
      })
      if (!res.ok) throw new Error('Cart not found')
      const data = await res.json()
      setCart(mapMedusaCart(data.cart))
    } catch (e) {
      console.error('Failed to fetch cart', e)
      setCart(null)
      localStorage.removeItem(CART_ID_KEY)
    }
  }

  const addItem = async (productId: string, variantId: string, quantity = 1) => {
    let cartId = getCartId()
    if (!cartId) {
      await fetchCart()
      cartId = getCartId()
    }
    if (!cartId) return
    try {
      const res = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}/line-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-publishable-api-key': MEDUSA_API_KEY },
        body: JSON.stringify({
          variant_id: variantId,
          quantity,
        }),
      })
      if (!res.ok) throw new Error('Failed to add item')
      const data = await res.json()
      setCart(mapMedusaCart(data.cart))
    } catch (e) {
      console.error('Failed to add item to cart', e)
    }
  }

  const removeItem = async (itemId: string) => {
    const cartId = getCartId()
    if (!cartId) return
    try {
      const res = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}/line-items/${itemId}`, {
        method: 'DELETE',
        headers: { 'x-publishable-api-key': MEDUSA_API_KEY },
      })
      if (!res.ok) throw new Error('Failed to remove item')
      const data = await res.json()
      setCart(mapMedusaCart(data.cart))
    } catch (e) {
      console.error('Failed to remove item from cart', e)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

function mapMedusaCart(mCart: any): Cart {
  return {
    id: mCart.id,
    items: (mCart.items || []).map((item: any) => ({
      id: item.id,
      title: item.title || item.variant?.title || '',
      quantity: item.quantity,
      price: item.unit_price / 100,
    })),
    total: (mCart.total || 0) / 100,
  }
} 