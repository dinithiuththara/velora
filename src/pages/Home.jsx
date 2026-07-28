import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useHero } from '../context/HeroContext'
import { products, categories } from '../data/mockData'

const HERO_IMAGES = {
  default: 'https://picsum.photos/seed/heroverlora/700/850',
  outerwear: 'https://picsum.photos/seed/hero-outerwear/700/850',
  knitwear: 'https://picsum.photos/seed/hero-knitwear/700/850',
  footwear: 'https://picsum.photos/seed/hero-footwear/700/850',
  accessories: 'https://picsum.photos/seed/hero-accessories/700/850',
  tailoring: 'https://picsum.photos/seed/hero-tailoring/700/850',
}

const SLIDES = [
  { id: 's1', src: 'https://picsum.photos/seed/velora-slide-1/1800/900' },
  { id: 's2', src: 'https://picsum.photos/seed/velora-slide-2/1800/900' },
  { id: 's3', src: 'https://picsum.photos/seed/velora-slide-3/1800/900' },
]

export default function Home() {
  const featured = products.slice(0, 4)
  const recommended = products.slice(4, 8)
  const { hoveredCategory } = useHero()
  const activeKey = hoveredCategory || 'default'
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <section className="relative -mt-16 h-[600px] md:h-[700px] text-ivory overflow-hidden bg-plum-950">
        {/* Autoplay background slides */}
        {SLIDES.map((s, i) => (
          <img
            key={s.id}
            src={s.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: !hoveredCategory && slide === i ? 1 : 0 }}
          />
        ))}
        {/* Category-hover overlay, takes priority over the slideshow */}
        {Object.entries(HERO_IMAGES)
          .filter(([key]) => key !== 'default')
          .map(([key, src]) => (
            <img
              key={key}
              src={src}
              alt={`Velora ${key} collection`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: hoveredCategory === key ? 1 : 0 }}
            />
          ))}

        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-plum-950/10 to-plum-950/40" />

        <span
          key={activeKey}
          className="pointer-events-none absolute right-6 md:right-16 top-1/2 -translate-y-1/2 font-display text-[15vw] md:text-[9rem] leading-none text-ivory/15 tracking-tight select-none animate-[fadeIn_0.5s_ease-out]"
        >
          {hoveredCategory ? categories.find((c) => c.slug === hoveredCategory)?.name : 'Velora'}
        </span>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-end pb-16 md:pb-20">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-brass)' }}>
              Autumn / Winter 2026
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mt-4 max-w-lg">
              Clothes fitted before they arrive.
            </h1>
            <p className="mt-5 text-ivory/70 max-w-md">
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
        </div>

        {/* Slide indicator dots, bottom-right */}
        <div className="absolute bottom-6 right-6 md:right-16 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                slide === i ? 'w-8 bg-ivory' : 'w-1.5 bg-ivory/40 hover:bg-ivory/70'
              }`}
            />
          ))}
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