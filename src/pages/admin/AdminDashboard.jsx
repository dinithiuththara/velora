import { products, mockOrders } from '../../data/mockData'

export default function AdminDashboard() {
  const revenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const lowStock = products.filter((p) => p.stock < 10)

  const stats = [
    { label: 'Total revenue', value: `$${revenue.toFixed(2)}` },
    { label: 'Orders', value: mockOrders.length },
    { label: 'Products', value: products.length },
    { label: 'Low stock items', value: lowStock.length },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-plum-950 mb-6">Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-plum-950/10 rounded-xl p-4">
            <p className="text-xs font-mono text-plum-600">{s.label.toUpperCase()}</p>
            <p className="font-display text-2xl text-plum-950 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="font-display text-lg text-plum-950 mb-3">Low stock alerts</p>
        {lowStock.length === 0 ? (
          <p className="text-sm text-plum-600">Everything is well stocked.</p>
        ) : (
          <div className="divide-y divide-plum-950/10 border border-plum-950/10 rounded-xl overflow-hidden">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-plum-950">{p.name}</span>
                <span className="font-mono text-rose">{p.stock} left</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
