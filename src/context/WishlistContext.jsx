import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '../data/mockData'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(() => {
    const stored = localStorage.getItem('velora_wishlist')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('velora_wishlist', JSON.stringify(productIds))
  }, [productIds])

  function toggle(productId) {
    setProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  function isWishlisted(productId) {
    return productIds.includes(productId)
  }

  const wishlistItems = productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <WishlistContext.Provider value={{ productIds, wishlistItems, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
