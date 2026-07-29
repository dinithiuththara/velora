import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Eye } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { swatchColor } from '../utils/colorMap'

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist()
  const { addItem } = useCart()
  const [added, setAdded] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

  const visibleSizes = product.sizes ? product.sizes.slice(0, 4) : []
  const extraCount = product.sizes ? product.sizes.length - visibleSizes.length : 0

  function quickAdd(e, size) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id, 1, size)
    setAdded(size)
    setTimeout(() => setAdded(null), 1200)
  }

  // Determine secondary hover image if available
  const hasSecondaryImage = product.images && product.images.length > 1
  const displayImage = isHovered && hasSecondaryImage ? product.images[1] : product.images[0]

  return (
    <div 
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Taller Studio Portrait Card (3:4 Ratio) */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] w-full">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Low Stock Badge */}
        {product.stock < 10 && (
          <span className="absolute bottom-3 left-3 z-10 bg-black/80 text-white text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded">
            Low stock
          </span>
        )}

        {/* Quick Actions (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <Link
            to={`/products/${product.id}`}
            aria-label="Quick view"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white shadow-sm transition-transform duration-200 hover:scale-110"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => toggle(product.id)}
            aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110"
          >
            <Heart
              size={16}
              style={
                isWishlisted(product.id)
                  ? { fill: '#e11d48', color: '#e11d48' }
                  : { color: '#374151' }
              }
            />
          </button>
        </div>

        {/* Image Indicator Dots */}
        {product.images?.length > 1 && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  (isHovered && i === 1) || (!isHovered && i === 0)
                    ? 'bg-white scale-125'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick Size Selection Panel */}
        {visibleSizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out border-t border-gray-100">
            <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
              Select Size
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {visibleSizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => quickAdd(e, s)}
                  className="text-xs font-medium text-gray-800 hover:text-black hover:underline underline-offset-4 transition-colors"
                >
                  {added === s ? '✓ Added' : s}
                </button>
              ))}
              {extraCount > 0 && (
                <span className="text-[11px] text-gray-400 font-medium">+{extraCount} more</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Details Header */}
      <div className="mt-3 flex items-start justify-between gap-2 px-0.5">
        <Link to={`/products/${product.id}`} className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-gray-900 truncate hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-mono text-sm font-semibold text-gray-900 shrink-0">${product.price}</p>
      </div>

      {/* Color Swatches */}
      {product.colors?.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5 px-0.5">
          {product.colors.map((c) => (
            <span
              key={c}
              title={c}
              className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
              style={{ backgroundColor: swatchColor(c) }}
            />
          ))}
        </div>
      )}
    </div>
  )
}