import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '../data/mockData'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('velora_cart')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(items))
  }, [items])

  function addItem(productId, quantity = 1, size = null) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { productId, quantity, size }]
    })
  }

  function removeItem(productId, size = null) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  function updateQuantity(productId, size, quantity) {
    if (quantity < 1) return removeItem(productId, size)
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const lineItems = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId)
      return product ? { ...i, product } : null
    })
    .filter(Boolean)

  const subtotal = lineItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, lineItems, subtotal, count, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
