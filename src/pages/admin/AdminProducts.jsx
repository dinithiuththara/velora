import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { products as initialProducts, categories } from '../../data/mockData'

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [editing, setEditing] = useState(null)

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function saveProduct(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = {
      name: form.get('name'),
      price: Number(form.get('price')),
      stock: Number(form.get('stock')),
      categoryId: form.get('categoryId'),
    }
    if (editing.id) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)))
    } else {
      setProducts((prev) => [
        { id: `p${Date.now()}`, sku: `VL-NEW-${prev.length + 1}`, rating: 0, reviewCount: 0, images: ['https://picsum.photos/seed/new/600/750'], colors: [], sizes: ['One size'], description: '', ...data },
        ...prev,
      ])
    }
    setEditing(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-plum-950">Products</h1>
        <button
          onClick={() => setEditing({ id: null, name: '', price: 0, stock: 0, categoryId: categories[0].id })}
          className="inline-flex items-center gap-1.5 bg-plum-950 text-ivory rounded-full px-4 py-2 text-sm"
        >
          <Plus size={14} /> New product
        </button>
      </div>

      <div className="border border-plum-950/10 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ivory-dim text-plum-600 text-xs font-mono">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-950/10">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-plum-950">{p.name}</td>
                <td className="px-4 py-3 text-plum-600">{categories.find((c) => c.id === p.categoryId)?.name}</td>
                <td className="px-4 py-3 font-mono">${p.price}</td>
                <td className={`px-4 py-3 font-mono ${p.stock < 10 ? 'text-rose' : 'text-plum-800'}`}>{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditing(p)} aria-label="Edit"><Pencil size={14} className="text-plum-600" /></button>
                    <button onClick={() => deleteProduct(p.id)} aria-label="Delete"><Trash2 size={14} className="text-plum-600 hover:text-rose" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-plum-950/60 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <form onSubmit={saveProduct} className="bg-ivory rounded-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xl text-plum-950">{editing.id ? 'Edit product' : 'New product'}</p>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input name="name" required defaultValue={editing.name} placeholder="Product name" className="w-full border border-plum-950/15 rounded-lg px-3 py-2 text-sm" />
              <select name="categoryId" defaultValue={editing.categoryId} className="w-full border border-plum-950/15 rounded-lg px-3 py-2 text-sm bg-ivory">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input name="price" type="number" required defaultValue={editing.price} placeholder="Price" className="w-full border border-plum-950/15 rounded-lg px-3 py-2 text-sm font-mono" />
              <input name="stock" type="number" required defaultValue={editing.stock} placeholder="Stock quantity" className="w-full border border-plum-950/15 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <button type="submit" className="mt-5 w-full bg-plum-950 text-ivory rounded-full py-3 text-sm">Save product</button>
          </form>
        </div>
      )}
    </div>
  )
}
