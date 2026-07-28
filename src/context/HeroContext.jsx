import { createContext, useContext, useState } from 'react'

const HeroContext = createContext(null)

export function HeroProvider({ children }) {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  return (
    <HeroContext.Provider value={{ hoveredCategory, setHoveredCategory }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHero() {
  const ctx = useContext(HeroContext)
  if (!ctx) throw new Error('useHero must be used within HeroProvider')
  return ctx
}