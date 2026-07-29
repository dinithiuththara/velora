import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useHero } from '../context/HeroContext'
import { products, categories } from '../data/mockData'
import { categoryPhoto } from '../utils/placeholder'

const HERO_IMAGES = categories.reduce((acc, c) => {
  acc[c.slug] = categoryPhoto(c.name, { width: 1800, height: 900, extra: `${c.keywords},model` })
  return acc
}, {})

const SLIDES = [
  { id: 's1', src: categoryPhoto('editorial', { width: 1800, height: 900, extra: 'fashion,model,coat', variant: '1' }) },
  { id: 's2', src: categoryPhoto('editorial', { width: 1800, height: 900, extra: 'fashion,street,style', variant: '2' }) },
  { id: 's3', src: categoryPhoto('editorial', { width: 1800, height: 900, extra: 'fashion,runway,model', variant: '3' }) },
]

export default function Home() {
  const featured = products.slice(0, 4)
  const recommended = products.slice(4, 8)
  const { hoveredCategory } = useHero()
  const activeKey = hoveredCategory || 'default'
  const [slide, setSlide] = useState(0)
  const arrivalsRef = useRef(null)

  function scrollArrivals(dir) {
    arrivalsRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

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
        {Object.entries(HERO_IMAGES).map(([key, src]) => (
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
          <h2 className="font-display text-2xl text-plum-950 uppercase tracking-wide">Shop by category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length
            return (
              <Link
                key={c.id}
                to={`/products?category=${c.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-ivory-dim"
              >
                <img
                  src={categoryPhoto(c.name, { width: 400, height: 400, extra: c.keywords })}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-plum-950/20 group-hover:bg-plum-950/45 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <span className="text-ivory font-display text-sm">{c.name}</span>
                  <span className="text-ivory/0 group-hover:text-ivory/80 text-xs font-mono mt-1 max-h-0 group-hover:max-h-6 overflow-hidden transition-all duration-300">
                    {count} pieces — Shop now
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-plum-950 uppercase tracking-wide">New arrivals</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollArrivals(-1)}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-plum-950/15 flex items-center justify-center hover:bg-ivory-dim transition-colors"
            >
              <ArrowLeft size={15} className="text-plum-800" />
            </button>
            <button
              onClick={() => scrollArrivals(1)}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border border-plum-950/15 flex items-center justify-center hover:bg-ivory-dim transition-colors"
            >
              <ArrowRight size={15} className="text-plum-800" />
            </button>
          </div>
        </div>
        <div
          ref={arrivalsRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
        >
          {featured.map((p) => (
            <div key={p.id} className="w-[47%] sm:w-[31%] lg:w-[23%] shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm hover:bg-plum-800 transition-colors"
          >
            View all <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-brass)' }} />
          </Link>
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