import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockOrders, products } from '../data/mockData'

const statusStyles = {
  pending: 'bg-ivory-dim text-plum-800',
  shipped: 'bg-rose-dim text-plum-950',
  delivered: 'text-ivory',
}

export default function Orders() {
  const { user } = useAuth()
  const orders = mockOrders.filter((o) => o.userEmail === user.email)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-plum-950 mb-8">Your orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-plum-600">No orders yet.</p>
          <Link to="/products" className="inline-block mt-6 bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-plum-950/10 rounded-xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-sm text-plum-950">{order.id}</p>
                  <p className="text-xs text-plum-600">Placed {order.placedAt}</p>
                </div>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full capitalize ${statusStyles[order.status]}`}
                  style={order.status === 'delivered' ? { backgroundColor: 'var(--color-sage)' } : {}}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {order.items.map((item) => {
                  const p = products.find((pr) => pr.id === item.productId)
                  if (!p) return null
                  return (
                    <img key={item.productId} src={p.images[0]} alt={p.name} className="w-14 h-16 object-cover rounded-lg bg-ivory-dim" />
                  )
                })}
              </div>
              <p className="mt-3 text-sm font-mono text-plum-950">${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
