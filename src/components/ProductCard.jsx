import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import StarRating from './StarRating'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="group tag-corner">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-ivory-dim aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.stock < 10 && (
            <span className="absolute bottom-2 left-2 bg-plum-950 text-ivory text-xs font-mono px-2 py-1">
              Low stock
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-display text-base text-plum-950 truncate">{product.name}</h3>
          </Link>
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <button
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="shrink-0 p-1.5 rounded-full hover:bg-ivory-dim transition-colors"
        >
          <Heart
            size={18}
            style={wishlisted ? { fill: 'var(--color-rose)', color: 'var(--color-rose)' } : { color: 'var(--color-plum-600)' }}
          />
        </button>
      </div>
      <p className="mt-1 font-mono text-sm text-plum-800">${product.price}</p>
    </div>
  )
}
