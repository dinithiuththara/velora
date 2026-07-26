import { useState } from 'react'
import { mockOrders } from '../../data/mockData'

const statuses = ['pending', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders)

  function updateStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-plum-950 mb-6">Orders</h1>
      <div className="border border-plum-950/10 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ivory-dim text-plum-600 text-xs font-mono">
            <tr>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-950/10">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-mono text-plum-950">{o.id}</td>
                <td className="px-4 py-3 text-plum-800">{o.userEmail}</td>
                <td className="px-4 py-3 font-mono">${o.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="border border-plum-950/15 rounded-lg px-2 py-1.5 text-xs bg-ivory capitalize"
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
