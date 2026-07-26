import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-plum-950 text-ivory mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <p className="font-display text-2xl">Velora</p>
          <p className="mt-3 text-sm text-plum-400 max-w-xs">
            Considered fashion, fitted with the help of AI. Designed to last more than one season.
          </p>
        </div>
        <div>
          <p className="text-xs font-mono text-plum-400 mb-3">SHOP</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-brass">All products</Link></li>
            <li><Link to="/products?category=outerwear" className="hover:text-brass">Outerwear</Link></li>
            <li><Link to="/products?category=footwear" className="hover:text-brass">Footwear</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-mono text-plum-400 mb-3">ACCOUNT</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/orders" className="hover:text-brass">Order history</Link></li>
            <li><Link to="/wishlist" className="hover:text-brass">Wishlist</Link></li>
            <li><Link to="/login" className="hover:text-brass">Sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-4 text-center text-xs text-plum-400">
        © 2026 Velora. Built as a portfolio project.
      </div>
    </footer>
  )
}
