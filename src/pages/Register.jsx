import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const result = register(name, email, password)
    if (!result.ok) return setError(result.error)
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="font-display text-3xl text-plum-950">Create an account</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-sm bg-rose-dim text-plum-950 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="text-xs font-mono text-plum-600" htmlFor="name">FULL NAME</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass"
          />
        </div>
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
          Create account
        </button>
      </form>
      <p className="mt-6 text-sm text-plum-600">
        Already have an account? <Link to="/login" className="text-brass-dark hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
