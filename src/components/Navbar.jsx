import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { categories } from '../data/mockData'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { productIds } = useWishlist()
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-plum-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <button className="md:hidden p-2 -ml-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="font-display text-2xl tracking-tight text-plum-950 shrink-0">
            Velora
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.slug}`}
                className="text-plum-800 hover:text-brass-dark transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-plum-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full bg-ivory-dim border border-transparent focus:border-plum-400 rounded-full pl-9 pr-3 py-2 text-sm outline-none"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/wishlist" className="relative p-2 hover:bg-ivory-dim rounded-full" aria-label="Wishlist">
              <Heart size={19} className="text-plum-800" />
              {productIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose text-plum-950 text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {productIds.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-ivory-dim rounded-full" aria-label="Cart">
              <ShoppingBag size={19} className="text-plum-800" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brass text-ivory text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-ivory-dim rounded-full" aria-label="Account">
                  <User size={19} className="text-plum-800" />
                </button>
                <div className="absolute right-0 top-full pt-1 hidden group-hover:block group-focus-within:block">
                  <div className="bg-ivory border border-plum-950/10 shadow-lg rounded-lg py-1 w-44 text-sm">
                    <p className="px-3 py-2 text-plum-600 text-xs truncate">{user.name}</p>
                    <Link to="/orders" className="block px-3 py-2 hover:bg-ivory-dim">My orders</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 hover:bg-ivory-dim">
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
              <Link to="/login" className="p-2 hover:bg-ivory-dim rounded-full" aria-label="Sign in">
                <User size={19} className="text-plum-800" />
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
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
