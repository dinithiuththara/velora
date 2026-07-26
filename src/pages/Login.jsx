import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('demo@velora.com')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) return setError(result.error)
    navigate(location.state?.from || '/')
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="font-display text-3xl text-plum-950">Sign in</h1>
      <p className="mt-2 text-sm text-plum-600">
        Demo account: demo@velora.com / demo1234 &middot; Admin: admin@velora.com / admin1234
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-sm bg-rose-dim text-plum-950 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="text-xs font-mono text-plum-600" htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-plum-600" htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass"
          />
        </div>
        <button type="submit" className="w-full bg-plum-950 text-ivory rounded-full py-3 text-sm hover:bg-plum-800 transition-colors">
          Sign in
        </button>
      </form>
      <p className="mt-6 text-sm text-plum-600">
        New to Velora? <Link to="/register" className="text-brass-dark hover:underline">Create an account</Link>
      </p>
    </div>
  )
}
