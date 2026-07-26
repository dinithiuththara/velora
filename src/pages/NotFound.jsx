import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="font-mono text-sm text-plum-600">404</p>
      <h1 className="font-display text-3xl text-plum-950 mt-2">Page not found</h1>
      <Link to="/" className="inline-block mt-6 bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm">
        Back to home
      </Link>
    </div>
  )
}
