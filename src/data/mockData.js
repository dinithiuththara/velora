import { categoryPhoto } from '../utils/placeholder'

export const categories = [
  { id: 'c1', name: 'Outerwear', slug: 'outerwear', keywords: 'coat,jacket' },
  { id: 'c2', name: 'Knitwear', slug: 'knitwear', keywords: 'sweater,knit' },
  { id: 'c3', name: 'Footwear', slug: 'footwear', keywords: 'boots,shoes' },
  { id: 'c4', name: 'Accessories', slug: 'accessories', keywords: 'accessories,scarf' },
  { id: 'c5', name: 'Tailoring', slug: 'tailoring', keywords: 'suit,blazer' },
]

const img = (name) => {
  return [
    categoryPhoto(name, { variant: 'a' }),
    categoryPhoto(name, { variant: 'b' })
  ]
}

export const products = [
  {
    id: 'p1',
    name: 'Wool Overcoat',
    categoryId: 'c1',
    price: 428,
    stock: 12,
    sku: 'VL-OC-001',
    rating: 4.7,
    reviewCount: 34,
    description: 'A structured, longline wool overcoat tailored for a sleek silhouette with horn buttons and a self-tie belt.',
    images: img('Wool Overcoat'),
    colors: ['Charcoal', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p2',
    name: 'Cable Knit Sweater',
    categoryId: 'c2',
    price: 168,
    stock: 25,
    sku: 'VL-KN-014',
    rating: 4.5,
    reviewCount: 61,
    description: 'Heavyweight relaxed cable knit in brushed merino wool, perfect for effortless layering.',
    images: img('Cable Knit Sweater'),
    colors: ['Ivory', 'Plum'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p3',
    name: 'Leather Chelsea Boot',
    categoryId: 'c3',
    price: 312,
    stock: 8,
    sku: 'VL-FT-022',
    rating: 4.8,
    reviewCount: 47,
    description: 'Sleek full-grain leather Chelsea boots with pull tabs and stacked leather heels.',
    images: img('Leather Chelsea Boot'),
    colors: ['Black', 'Brown'],
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: 'p4',
    name: 'Silk Pocket Square',
    categoryId: 'c4',
    price: 48,
    stock: 60,
    sku: 'VL-AC-005',
    rating: 4.3,
    reviewCount: 19,
    description: 'Hand-rolled silk twill scarf/square featuring subtle geometric motifs.',
    images: img('Silk Pocket Square'),
    colors: ['Brass', 'Sage'],
    sizes: ['One size']
  },
  {
    id: 'p5',
    name: 'Tailored Wool Trouser',
    categoryId: 'c5',
    price: 195,
    stock: 18,
    sku: 'VL-TL-009',
    rating: 4.6,
    reviewCount: 28,
    description: 'High-waisted tailored trouser in Italian virgin wool with front pleats and a relaxed tapered leg.',
    images: img('Tailored Wool Trouser'),
    colors: ['Charcoal', 'Navy'],
    sizes: ['25', '26', '27', '28', '29', '30']
  },
  {
    id: 'p6',
    name: 'Quilted Field Jacket',
    categoryId: 'c1',
    price: 265,
    stock: 15,
    sku: 'VL-OC-011',
    rating: 4.4,
    reviewCount: 22,
    description: 'Diamond-quilted lightweight jacket with corduroy collar detailing.',
    images: img('Quilted Field Jacket'),
    colors: ['Olive', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p7',
    name: 'Merino Turtleneck',
    categoryId: 'c2',
    price: 138,
    stock: 30,
    sku: 'VL-KN-018',
    rating: 4.6,
    reviewCount: 40,
    description: 'Fine-gauge merino wool turtleneck with a contoured, form-fitting silhouette.',
    images: img('Merino Turtleneck'),
    colors: ['Black', 'Ivory', 'Rust'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p8',
    name: 'Suede Derby Shoe',
    categoryId: 'c3',
    price: 248,
    stock: 10,
    sku: 'VL-FT-027',
    rating: 4.5,
    reviewCount: 16,
    description: 'Soft suede derby flats with minimalist stitching, handcrafted in Italy.',
    images: img('Suede Derby Shoe'),
    colors: ['Sand', 'Grey'],
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: 'p9',
    name: 'Leather Belt',
    categoryId: 'c4',
    price: 88,
    stock: 45,
    sku: 'VL-AC-008',
    rating: 4.2,
    reviewCount: 12,
    description: 'Slim vegetable-tanned leather belt finished with a delicate solid brass buckle.',
    images: img('Leather Belt'),
    colors: ['Brown', 'Black'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p10',
    name: 'Double-Breasted Blazer',
    categoryId: 'c5',
    price: 385,
    stock: 9,
    sku: 'VL-TL-013',
    rating: 4.7,
    reviewCount: 21,
    description: 'Sharply tailored double-breasted blazer with structured shoulders in a luxurious wool-blend.',
    images: img('Double-Breasted Blazer'),
    colors: ['Navy', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p11',
    name: 'Cashmere Scarf',
    categoryId: 'c4',
    price: 145,
    stock: 22,
    sku: 'VL-AC-010',
    rating: 4.9,
    reviewCount: 33,
    description: 'Ultra-soft 100% cashmere scarf woven in a fine herringbone twill pattern.',
    images: img('Cashmere Scarf'),
    colors: ['Camel', 'Grey', 'Plum'],
    sizes: ['One size']
  },
  {
    id: 'p12',
    name: 'Denim Trucker Jacket',
    categoryId: 'c1',
    price: 158,
    stock: 20,
    sku: 'VL-OC-016',
    rating: 4.3,
    reviewCount: 29,
    description: 'Classic selvedge denim jacket cut in a slightly cropped, modern relaxed fit.',
    images: img('Denim Trucker Jacket'),
    colors: ['Indigo', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
]

export const reviews = [
  { id: 'r1', productId: 'p1', userName: 'Elena M.', rating: 5, comment: 'Fits exactly true to size, and the wool quality is exceptional for this price point.', date: '2026-06-02' },
  { id: 'r2', productId: 'p1', userName: 'Sophia K.', rating: 4, comment: 'Beautiful coat, drape is gorgeous!', date: '2026-05-18' },
  { id: 'r3', productId: 'p3', userName: 'Priya S.', rating: 5, comment: 'Super comfortable leather right out of the box!', date: '2026-06-10' },
]

export const mockOrders = [
  { id: 'o1001', userEmail: 'demo@velora.com', status: 'delivered', total: 596, placedAt: '2026-06-01', items: [{ productId: 'p1', quantity: 1, price: 428 }, { productId: 'p9', quantity: 1, price: 88 }] },
  { id: 'o1002', userEmail: 'demo@velora.com', status: 'shipped', total: 168, placedAt: '2026-07-10', items: [{ productId: 'p2', quantity: 1, price: 168 }] },
  { id: 'o1003', userEmail: 'other@velora.com', status: 'pending', total: 312, placedAt: '2026-07-20', items: [{ productId: 'p3', quantity: 1, price: 312 }] },
]