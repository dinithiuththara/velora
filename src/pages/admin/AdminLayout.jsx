import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Package, ClipboardList } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
]

export default function AdminLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-[200px_1fr] gap-8">
      <aside>
        <p className="font-display text-xl text-plum-950 mb-4">Admin</p>
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                  isActive ? 'bg-plum-950 text-ivory' : 'text-plum-800 hover:bg-ivory-dim'
                }`
              }
            >
              <Icon size={15} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
