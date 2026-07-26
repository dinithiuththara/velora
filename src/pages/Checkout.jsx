import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Checkout() {
  const { lineItems, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [placing, setPlacing] = useState(false)

  const shipping = subtotal > 200 ? 0 : 12
  const total = subtotal + shipping

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function placeOrder(e) {
    e.preventDefault()
    setPlacing(true)
    setTimeout(() => {
      const orderId = `o${Math.floor(1000 + Math.random() * 9000)}`
      clearCart()
      navigate('/order-confirmation', { state: { orderId, total } })
    }, 900)
  }

  if (lineItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-plum-950">Nothing to check out</p>
        <p className="text-sm text-plum-600 mt-2">Add something to your cart first.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-plum-950 mb-8">Checkout</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <form onSubmit={placeOrder} className="space-y-6">
          <div>
            <p className="font-display text-lg text-plum-950 mb-3">Shipping address</p>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} className="col-span-2 border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
              <input required placeholder="Street address" value={form.address} onChange={(e) => update('address', e.target.value)} className="col-span-2 border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
              <input required placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} className="border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
              <input required placeholder="Postal code" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} className="border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
            </div>
          </div>
          <div>
            <p className="font-display text-lg text-plum-950 mb-3">Payment</p>
            <p className="text-xs text-plum-600 mb-3">Mock payment form — no real charge is made. Swap for Stripe Elements when the backend is connected.</p>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Card number" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} className="col-span-2 border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass font-mono" />
              <input required placeholder="MM/YY" value={form.expiry} onChange={(e) => update('expiry', e.target.value)} className="border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass font-mono" />
              <input required placeholder="CVC" value={form.cvc} onChange={(e) => update('cvc', e.target.value)} className="border border-plum-950/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass font-mono" />
            </div>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="w-full bg-plum-950 text-ivory rounded-full py-3.5 text-sm hover:bg-plum-800 transition-colors disabled:opacity-60"
          >
            {placing ? 'Placing order…' : `Place order — $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="bg-ivory-dim rounded-xl p-5 h-fit">
          <p className="font-display text-lg text-plum-950 mb-4">Order summary</p>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {lineItems.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-plum-800">{item.product.name} × {item.quantity}</span>
                <span className="font-mono">${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-plum-800 mt-4 pt-4 border-t border-plum-950/10">
            <span>Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-plum-800 mt-2">
            <span>Shipping</span>
            <span className="font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-medium text-plum-950 mt-2">
            <span>Total</span>
            <span className="font-mono">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
