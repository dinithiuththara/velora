export const categories = [
  { id: 'c1', name: 'Outerwear', slug: 'outerwear' },
  { id: 'c2', name: 'Knitwear', slug: 'knitwear' },
  { id: 'c3', name: 'Footwear', slug: 'footwear' },
  { id: 'c4', name: 'Accessories', slug: 'accessories' },
  { id: 'c5', name: 'Tailoring', slug: 'tailoring' },
]

const img = (seed) => `https://picsum.photos/seed/${seed}/600/750`

export const products = [
  { id: 'p1', name: 'Wool Overcoat', categoryId: 'c1', price: 428, stock: 12, sku: 'VL-OC-001', rating: 4.7, reviewCount: 34, description: 'A structured wool overcoat cut for a clean silhouette, with horn buttons and a half-belt back.', images: [img('coat1'), img('coat1b')], colors: ['Charcoal', 'Camel'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p2', name: 'Cable Knit Sweater', categoryId: 'c2', price: 168, stock: 25, sku: 'VL-KN-014', rating: 4.5, reviewCount: 61, description: 'Heavyweight cable knit in brushed merino, relaxed fit for layering.', images: [img('knit1'), img('knit1b')], colors: ['Ivory', 'Plum'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p3', name: 'Leather Chelsea Boot', categoryId: 'c3', price: 312, stock: 8, sku: 'VL-FT-022', rating: 4.8, reviewCount: 47, description: 'Full-grain leather Chelsea boot with an elastic gusset and stacked leather heel.', images: [img('boot1'), img('boot1b')], colors: ['Black', 'Brown'], sizes: ['38','39','40','41','42','43','44'] },
  { id: 'p4', name: 'Silk Pocket Square', categoryId: 'c4', price: 48, stock: 60, sku: 'VL-AC-005', rating: 4.3, reviewCount: 19, description: 'Hand-rolled silk twill pocket square in a small geometric print.', images: [img('acc1'), img('acc1b')], colors: ['Brass', 'Sage'], sizes: ['One size'] },
  { id: 'p5', name: 'Tailored Wool Trouser', categoryId: 'c5', price: 195, stock: 18, sku: 'VL-TL-009', rating: 4.6, reviewCount: 28, description: 'Mid-rise tailored trouser in Italian wool with a tapered leg.', images: [img('trouser1'), img('trouser1b')], colors: ['Charcoal', 'Navy'], sizes: ['28','30','32','34','36'] },
  { id: 'p6', name: 'Quilted Field Jacket', categoryId: 'c1', price: 265, stock: 15, sku: 'VL-OC-011', rating: 4.4, reviewCount: 22, description: 'Diamond-quilted field jacket with a corduroy collar, built for shoulder-season layering.', images: [img('jacket1'), img('jacket1b')], colors: ['Olive', 'Black'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p7', name: 'Merino Turtleneck', categoryId: 'c2', price: 138, stock: 30, sku: 'VL-KN-018', rating: 4.6, reviewCount: 40, description: 'Fine-gauge merino turtleneck, slim fit, fully fashioned seams.', images: [img('turtle1'), img('turtle1b')], colors: ['Black', 'Ivory', 'Rust'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p8', name: 'Suede Derby Shoe', categoryId: 'c3', price: 248, stock: 10, sku: 'VL-FT-027', rating: 4.5, reviewCount: 16, description: 'Unlined suede derby on a leather sole, built by hand in a small workshop.', images: [img('shoe1'), img('shoe1b')], colors: ['Sand', 'Grey'], sizes: ['38','39','40','41','42','43','44'] },
  { id: 'p9', name: 'Leather Belt', categoryId: 'c4', price: 88, stock: 45, sku: 'VL-AC-008', rating: 4.2, reviewCount: 12, description: 'Vegetable-tanned leather belt with a solid brass buckle.', images: [img('belt1'), img('belt1b')], colors: ['Brown', 'Black'], sizes: ['S','M','L'] },
  { id: 'p10', name: 'Double-Breasted Blazer', categoryId: 'c5', price: 385, stock: 9, sku: 'VL-TL-013', rating: 4.7, reviewCount: 21, description: 'Soft-shouldered double-breasted blazer in a birdseye wool blend.', images: [img('blazer1'), img('blazer1b')], colors: ['Navy', 'Charcoal'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p11', name: 'Cashmere Scarf', categoryId: 'c4', price: 145, stock: 22, sku: 'VL-AC-010', rating: 4.9, reviewCount: 33, description: 'Pure cashmere scarf, woven in a herringbone twill.', images: [img('scarf1'), img('scarf1b')], colors: ['Camel', 'Grey', 'Plum'], sizes: ['One size'] },
  { id: 'p12', name: 'Denim Trucker Jacket', categoryId: 'c1', price: 158, stock: 20, sku: 'VL-OC-016', rating: 4.3, reviewCount: 29, description: 'Rigid selvedge denim trucker jacket that softens and fades with wear.', images: [img('denim1'), img('denim1b')], colors: ['Indigo', 'Black'], sizes: ['XS','S','M','L','XL'] },
]

export const reviews = [
  { id: 'r1', productId: 'p1', userName: 'Elena M.', rating: 5, comment: 'Fits exactly true to size, and the wool is noticeably heavier than anything else I own in this price range.', date: '2026-06-02' },
  { id: 'r2', productId: 'p1', userName: 'Jonas K.', rating: 4, comment: 'Great coat, sleeves run slightly long for me but nothing a tailor cannot fix.', date: '2026-05-18' },
  { id: 'r3', productId: 'p3', userName: 'Priya S.', rating: 5, comment: 'Broke in within a week and now they are the most comfortable boots I own.', date: '2026-06-10' },
]

export const mockOrders = [
  { id: 'o1001', userEmail: 'demo@velora.com', status: 'delivered', total: 596, placedAt: '2026-06-01', items: [{ productId: 'p1', quantity: 1, price: 428 }, { productId: 'p9', quantity: 1, price: 88 }] },
  { id: 'o1002', userEmail: 'demo@velora.com', status: 'shipped', total: 168, placedAt: '2026-07-10', items: [{ productId: 'p2', quantity: 1, price: 168 }] },
  { id: 'o1003', userEmail: 'other@velora.com', status: 'pending', total: 312, placedAt: '2026-07-20', items: [{ productId: 'p3', quantity: 1, price: 312 }] },
]
