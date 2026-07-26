import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { lineItems, subtotal, updateQuantity, removeItem } = useCart()

  if (lineItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-plum-950">Your cart is empty</p>
        <p className="text-sm text-plum-600 mt-2">Nothing here yet — go find something to wear.</p>
        <Link to="/products" className="inline-block mt-6 bg-plum-950 text-ivory rounded-full px-6 py-3 text-sm">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-plum-950 mb-8">Your cart</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <div className="divide-y divide-plum-950/10">
          {lineItems.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex gap-4 py-5">
              <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 object-cover rounded-lg bg-ivory-dim" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/products/${item.product.id}`} className="font-display text-base text-plum-950">
                      {item.product.name}
                    </Link>
                    {item.size && <p className="text-xs text-plum-600 mt-0.5">Size {item.size}</p>}
                  </div>
                  <p className="font-mono text-sm text-plum-950 shrink-0">${item.product.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-plum-950/15 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-1.5" aria-label="Decrease quantity"
                    ><Minus size={13} /></button>
                    <span className="w-6 text-center text-sm font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-1.5" aria-label="Increase quantity"
                    ><Plus size={13} /></button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-plum-600 hover:text-rose p-1.5"
                    aria-label="Remove item"
                  ><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-ivory-dim rounded-xl p-5 h-fit">
          <p className="font-display text-lg text-plum-950 mb-4">Order summary</p>
          <div className="flex justify-between text-sm text-plum-800">
            <span>Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-plum-800 mt-2">
            <span>Shipping</span>
            <span className="font-mono">{subtotal > 200 ? 'Free' : '$12.00'}</span>
          </div>
          <div className="flex justify-between font-medium text-plum-950 mt-4 pt-4 border-t border-plum-950/10">
            <span>Total</span>
            <span className="font-mono">${(subtotal + (subtotal > 200 ? 0 : 12)).toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-5 block text-center bg-plum-950 text-ivory rounded-full py-3 text-sm hover:bg-plum-800 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
