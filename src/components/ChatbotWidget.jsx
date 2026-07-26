import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { products } from '../data/mockData'

function mockReply(text) {
  const lower = text.toLowerCase()
  const match = products.find((p) => lower.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()))
  if (match) {
    return `The ${match.name} is $${match.price} and currently ${match.stock > 10 ? 'well stocked' : `low in stock (${match.stock} left)`}. Available in ${match.sizes.slice(0, 3).join(', ')}${match.sizes.length > 3 ? '...' : ''}. Want sizing advice or similar picks?`
  }
  if (lower.includes('return') || lower.includes('exchange')) {
    return 'Returns are accepted within 30 days in original condition. I can start one for you once this connects to a real order system.'
  }
  if (lower.includes('size') || lower.includes('fit')) {
    return 'Tell me the item and I can compare it against your past orders once account history is wired in. For now, most Velora pieces run true to size.'
  }
  return "I'm a placeholder for the real AI assistant — once connected to the OpenAI/Gemini API and your product catalog, I'll answer sizing, stock, and styling questions directly."
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi, I'm the Velora assistant. Ask about sizing, stock, or styling." },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function send(e) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: mockReply(userMsg.text) }])
    }, 500)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm h-[28rem] bg-ivory border border-plum-950/15 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-plum-950 text-ivory px-4 py-3 flex items-center gap-2">
            <Sparkles size={16} style={{ color: 'var(--color-brass)' }} />
            <p className="font-display text-sm">Velora assistant</p>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm max-w-[85%] px-3 py-2 rounded-xl ${
                  m.role === 'user'
                    ? 'ml-auto bg-brass text-ivory rounded-br-sm'
                    : 'bg-ivory-dim text-plum-950 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="p-3 border-t border-plum-950/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product..."
              className="flex-1 bg-ivory-dim rounded-full px-4 py-2 text-sm outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--color-brass)' }}
            />
            <button
              type="submit"
              aria-label="Send"
              className="shrink-0 bg-plum-950 text-ivory rounded-full p-2 hover:bg-plum-800 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="w-14 h-14 rounded-full bg-plum-950 text-ivory shadow-lg flex items-center justify-center hover:bg-plum-800 transition-colors"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
