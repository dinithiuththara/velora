import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/mockData'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const q = searchParams.get('q') || ''
  const categorySlug = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'featured'
  const maxPrice = Number(searchParams.get('maxPrice') || 500)

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    if (categorySlug) {
      const cat = categories.find((c) => c.slug === categorySlug)
      if (cat) list = list.filter((p) => p.categoryId === cat.id)
    }
    list = list.filter((p) => p.price <= maxPrice)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [q, categorySlug, sort, maxPrice])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-baseline justify-between mb-2">
        <h1 className="font-display text-3xl text-plum-950">
          {categorySlug ? categories.find((c) => c.slug === categorySlug)?.name : q ? `Results for "${q}"` : 'All products'}
        </h1>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="md:hidden inline-flex items-center gap-1.5 text-sm border border-plum-950/15 rounded-full px-3 py-1.5"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>
      <p className="text-sm text-plum-600 mb-8">{filtered.length} items</p>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center justify-between md:hidden mb-4">
            <p className="font-display text-lg">Filters</p>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={18} /></button>
          </div>
          <div className="space-y-6 sticky top-24">
            <div>
              <p className="text-xs font-mono text-plum-600 mb-3">CATEGORY</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => updateParam('category', '')}
                    className={!categorySlug ? 'text-brass-dark font-medium' : 'text-plum-800'}
                  >
                    All
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => updateParam('category', c.slug)}
                      className={categorySlug === c.slug ? 'text-brass-dark font-medium' : 'text-plum-800'}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono text-plum-600 mb-3">MAX PRICE: ${maxPrice}</p>
              <input
                type="range"
                min="40"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="w-full accent-brass"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-plum-600 mb-3">SORT BY</p>
              <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="w-full border border-plum-950/15 rounded-lg px-3 py-2 text-sm bg-ivory"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-xl text-plum-950">Nothing matches yet</p>
              <p className="text-sm text-plum-600 mt-2">Try a different category or raise the price limit.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
