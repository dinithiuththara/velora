import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { swatchColor } from '../utils/colorMap'

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="group tag-corner">
      <div className="relative overflow-hidden bg-ivory-dim aspect-[4/5]">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.stock < 10 && (
          <span className="absolute bottom-2 left-2 bg-plum-950 text-ivory text-xs font-mono px-2 py-1">
            Low stock
          </span>
        )}
        <button
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-ivory/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={16}
            style={wishlisted ? { fill: 'var(--color-rose)', color: 'var(--color-rose)' } : { color: 'var(--color-plum-800)' }}
          />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <Link to={`/products/${product.id}`} className="min-w-0">
          <h3 className="text-sm text-plum-950 truncate">{product.name}</h3>
        </Link>
        <p className="font-mono text-sm font-medium text-plum-950 shrink-0">${product.price}</p>
      </div>

      {product.colors?.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              title={c}
              className="w-3.5 h-3.5 rounded-full border border-plum-950/15"
              style={{ backgroundColor: swatchColor(c) }}
            />
          ))}
        </div>
      )}
    </div>
  )
}