import { Link, useLocation, Navigate } from 'react-router-dom'
import { Check } from 'lucide-react'

export default function OrderConfirmation() {
  const location = useLocation()
  const { orderId, total } = location.state || {}

  if (!orderId) return <Navigate to="/" replace />

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-plum-950 text-ivory flex items-center justify-center mx-auto">
        <Check size={24} />
      </div>
      <h1 className="font-display text-3xl text-plum-950 mt-6">Order placed</h1>
      <p className="text-sm text-plum-600 mt-2">
        Order <span className="font-mono">{orderId}</span> confirmed — ${total?.toFixed(2)} charged (mock).
        A confirmation email would normally go out here.
      </p>
      <div className="flex gap-3 justify-center mt-8">
        <Link to="/orders" className="bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm">View orders</Link>
        <Link to="/products" className="border border-plum-950/20 rounded-full px-6 py-3 text-sm">Keep shopping</Link>
      </div>
    </div>
  )
}
