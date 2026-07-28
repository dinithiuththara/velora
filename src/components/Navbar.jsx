import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useHero } from '../context/HeroContext'
import { categories } from '../data/mockData'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { productIds } = useWishlist()
  const { hoveredCategory, setHoveredCategory } = useHero()
  const navigate = useNavigate()
  const location = useLocation()
  const onHome = location.pathname === '/'
  const transparent = onHome && !scrolled

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products')
    setMenuOpen(false)
  }

  const textColor = transparent ? 'text-ivory' : 'text-plum-800'
  const logoColor = transparent ? 'text-ivory' : 'text-plum-950'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        transparent ? 'bg-transparent' : 'bg-ivory/95 backdrop-blur border-b border-plum-950/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <button
            className={`md:hidden p-2 -ml-2 ${textColor}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className={`logo-highlight relative font-display text-2xl tracking-tight shrink-0 ${logoColor}`}>
            Velora
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.slug}`}
                onMouseEnter={() => onHome && setHoveredCategory(c.slug)}
                onMouseLeave={() => onHome && setHoveredCategory(null)}
                className={`nav-link relative pb-1 transition-colors ${
                  onHome && hoveredCategory === c.slug
                    ? 'text-brass-dark'
                    : `${textColor} hover:text-brass-dark`
                }`}
              >
                {c.name}
                <span
                  className="absolute left-0 bottom-0 h-[1.5px] bg-brass transition-all duration-300"
                  style={{ width: onHome && hoveredCategory === c.slug ? '100%' : '0%' }}
                />
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${transparent ? 'text-ivory/70' : 'text-plum-400'}`} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className={`w-full border rounded-full pl-9 pr-3 py-2 text-sm outline-none transition-colors ${
                  transparent
                    ? 'bg-ivory/15 border-ivory/30 text-ivory placeholder-ivory/70 focus:bg-ivory/25'
                    : 'bg-ivory-dim border-transparent text-plum-950 focus:border-plum-400'
                }`}
              />
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/wishlist" className={`relative p-2 rounded-full ${transparent ? 'hover:bg-ivory/15' : 'hover:bg-ivory-dim'}`} aria-label="Wishlist">
              <Heart size={19} className={textColor} />
              {productIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose text-plum-950 text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {productIds.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className={`relative p-2 rounded-full ${transparent ? 'hover:bg-ivory/15' : 'hover:bg-ivory-dim'}`} aria-label="Cart">
              <ShoppingBag size={19} className={textColor} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brass text-ivory text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className={`p-2 rounded-full ${transparent ? 'hover:bg-ivory/15' : 'hover:bg-ivory-dim'}`} aria-label="Account">
                  <User size={19} className={textColor} />
                </button>
                <div className="absolute right-0 top-full pt-1 hidden group-hover:block group-focus-within:block">
                  <div className="bg-ivory border border-plum-950/10 shadow-lg rounded-lg py-1 w-44 text-sm">
                    <p className="px-3 py-2 text-plum-600 text-xs truncate">{user.name}</p>
                    <Link to="/orders" className="block px-3 py-2 hover:bg-ivory-dim text-plum-800">My orders</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 hover:bg-ivory-dim text-plum-800">
                        <LayoutDashboard size={14} /> Admin dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-ivory-dim text-plum-800"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className={`p-2 rounded-full ${transparent ? 'hover:bg-ivory/15' : 'hover:bg-ivory-dim'}`} aria-label="Sign in">
                <User size={19} className={textColor} />
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-ivory rounded-xl px-3 -mx-3 shadow-lg">
            <form onSubmit={handleSearch} className="relative pt-3">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-plum-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full bg-ivory-dim border border-transparent rounded-full pl-9 pr-3 py-2 text-sm outline-none"
              />
            </form>
            <nav className="flex flex-col gap-1 text-sm">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/products?category=${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-plum-800"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}