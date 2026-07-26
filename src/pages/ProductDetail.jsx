import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Sparkles, Check } from 'lucide-react'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'
import { products, reviews as allReviews } from '../data/mockData'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [size, setSize] = useState(product?.sizes[0] ?? null)
  const [imgIndex, setImgIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [tryOnOpen, setTryOnOpen] = useState(false)
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl">Product not found</p>
        <Link to="/products" className="text-brass-dark hover:underline text-sm">Back to shop</Link>
      </div>
    )
  }

  const productReviews = allReviews.filter((r) => r.productId === product.id)
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)

  function handleAdd() {
    addItem(product.id, 1, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] bg-ivory-dim rounded-xl overflow-hidden">
            <img src={product.images[imgIndex]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-16 h-20 rounded-lg overflow-hidden border-2 ${i === imgIndex ? 'border-brass' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-plum-600">{product.sku}</p>
          <h1 className="font-display text-3xl text-plum-950 mt-1">{product.name}</h1>
          <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} /></div>
          <p className="font-mono text-2xl text-plum-950 mt-4">${product.price}</p>
          <p className="text-sm text-plum-800 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <p className="text-xs font-mono text-plum-600 mb-2">SIZE</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3.5 py-2 text-sm rounded-lg border ${
                    size === s ? 'border-plum-950 bg-plum-950 text-ivory' : 'border-plum-950/20 text-plum-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-plum-950 text-ivory rounded-full py-3.5 text-sm hover:bg-plum-800 transition-colors flex items-center justify-center gap-2"
            >
              {added ? <><Check size={16} /> Added to cart</> : 'Add to cart'}
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label="Toggle wishlist"
              className="w-12 h-12 shrink-0 rounded-full border border-plum-950/20 flex items-center justify-center"
            >
              <Heart size={18} style={isWishlisted(product.id) ? { fill: 'var(--color-rose)', color: 'var(--color-rose)' } : {}} />
            </button>
          </div>

          <button
            onClick={() => setTryOnOpen(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 border border-brass rounded-full py-3 text-sm text-brass-dark hover:bg-rose-dim/40 transition-colors"
          >
            <Sparkles size={15} /> Try it on with AI
          </button>

          <div className="mt-8 pt-8 border-t border-plum-950/10">
            <p className="font-display text-lg text-plum-950 mb-4">Reviews ({productReviews.length})</p>
            {productReviews.length === 0 ? (
              <p className="text-sm text-plum-600">No reviews yet for this piece.</p>
            ) : (
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <div key={r.id} className="text-sm">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-plum-950">{r.userName}</p>
                      <StarRating rating={r.rating} size={12} />
                    </div>
                    <p className="text-plum-800 mt-1">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <p className="font-display text-2xl text-plum-950 mb-6">You might also like</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {tryOnOpen && (
        <div className="fixed inset-0 z-50 bg-plum-950/60 flex items-center justify-center p-4" onClick={() => setTryOnOpen(false)}>
          <div className="bg-ivory rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <Sparkles size={22} style={{ color: 'var(--color-brass)' }} />
            <p className="font-display text-xl text-plum-950 mt-3">AI virtual try-on</p>
            <p className="text-sm text-plum-600 mt-2 leading-relaxed">
              This is a placeholder for the standout feature: upload a photo, and a vision model renders
              the {product.name.toLowerCase()} fitted to your body shape and the selected size. Wire this
              to the OpenAI/Gemini vision API once the backend is in place.
            </p>
            <button
              onClick={() => setTryOnOpen(false)}
              className="mt-5 w-full bg-plum-950 text-ivory rounded-full py-3 text-sm hover:bg-plum-800"
            >
              Close preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
