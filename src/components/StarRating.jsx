import { Star } from 'lucide-react'

export default function StarRating({ rating, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(rating) ? 'fill-brass text-brass' : 'text-plum-400'}
            style={n <= Math.round(rating) ? { fill: 'var(--color-brass)', color: 'var(--color-brass)' } : { color: 'var(--color-plum-400)' }}
          />
        ))}
      </div>
      {count != null && <span className="text-xs text-plum-600 font-mono">({count})</span>}
    </div>
  )
}
