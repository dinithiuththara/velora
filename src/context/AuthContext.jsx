import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_USERS = [
  { email: 'demo@velora.com', password: 'demo1234', name: 'Demo Customer', role: 'customer' },
  { email: 'admin@velora.com', password: 'admin1234', name: 'Velora Admin', role: 'admin' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('velora_user')
    if (stored) setUser(JSON.parse(stored))
    setInitializing(false)
  }, [])

  function login(email, password) {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Incorrect email or password.' }
    const session = { email: found.email, name: found.name, role: found.role }
    setUser(session)
    localStorage.setItem('velora_user', JSON.stringify(session))
    return { ok: true }
  }

  function register(name, email, password) {
    if (!name || !email || !password) return { ok: false, error: 'Fill in every field to continue.' }
    const session = { email, name, role: 'customer' }
    setUser(session)
    localStorage.setItem('velora_user', JSON.stringify(session))
    return { ok: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('velora_user')
  }

  return (
    <AuthContext.Provider value={{ user, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
