import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/mockData'

export default function Home() {
  const featured = products.slice(0, 4)
  const recommended = products.slice(4, 8)

  return (
    <div>
      <section className="relative bg-plum-950 text-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-brass)' }}>
              Autumn / Winter 2026
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mt-4">
              Clothes fitted before they arrive.
            </h1>
            <p className="mt-5 text-plum-400 max-w-md">
              Velora pairs considered tailoring with an AI stylist and virtual try-on, so what you order
              is what actually fits.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brass text-ivory px-6 py-3 rounded-full text-sm hover:bg-brass-dark transition-colors"
              >
                Shop the collection <ArrowRight size={15} />
              </Link>
              <Link
                to="/products?category=tailoring"
                className="inline-flex items-center gap-2 border border-ivory/30 px-6 py-3 rounded-full text-sm hover:border-ivory transition-colors"
              >
                Tailoring
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/seed/heroverlora/700/850"
              alt="Model wearing a Velora wool overcoat"
              className="w-full h-[420px] md:h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute -bottom-5 -left-5 bg-ivory text-plum-950 rounded-xl p-4 shadow-xl hidden sm:flex items-center gap-3 max-w-[220px]">
              <Sparkles size={18} style={{ color: 'var(--color-brass)' }} />
              <p className="text-xs">AI try-on shows fit on your body shape before you buy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl text-plum-950">Shop by category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.slug}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-ivory-dim"
            >
              <img
                src={`https://picsum.photos/seed/${c.slug}/300/300`}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-plum-950/30 flex items-end p-3">
                <span className="text-ivory font-display text-sm">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl text-plum-950">Just arrived</h2>
          <Link to="/products" className="text-sm text-brass-dark hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={18} style={{ color: 'var(--color-brass)' }} />
          <h2 className="font-display text-2xl text-plum-950">Picked for you</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
