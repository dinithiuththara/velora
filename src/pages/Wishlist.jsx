import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-plum-950 mb-8">Your wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-plum-600 text-sm">Nothing saved yet.</p>
          <Link to="/products" className="inline-block mt-6 bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {wishlistItems.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
