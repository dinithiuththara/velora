// src/utils/placeholder.js

// High-resolution women's fashion photo mapping on Unsplash
const WOMEN_FASHION_IMAGES = {
  // --- CATEGORIES (Unique Category Banner Images) ---
  'outerwear': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3'
  ],
  'knitwear': [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27'
  ],
  'footwear': [
    'https://images.unsplash.com/photo-1560343090-f0409e92791a',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2'
  ],
  'accessories': [
    'https://images.unsplash.com/photo-1509319117193-57bab727e09d',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26'
  ],
  'tailoring': [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8'
  ],

  // --- PRODUCTS ---
  'wool overcoat': [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f'
  ],
  'quilted field jacket': [
    'https://images.unsplash.com/photo-1548883354-7622d03aca27',
    'https://images.unsplash.com/photo-1544441893-675973e31985'
  ],
  'denim trucker jacket': [
    'https://images.unsplash.com/photo-1544441893-675973e31985',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b'
  ],
  'cable knit sweater': [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633'
  ],
  'merino turtleneck': [
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a'
  ],
  'leather chelsea boot': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a'
  ],
  'suede derby shoe': [
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a'
  ],
  'silk pocket square': [
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
    'https://images.unsplash.com/photo-1584030373081-f37b7bb33805'
  ],
  'leather belt': [
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
  ],
  'cashmere scarf': [
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f',
    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9'
  ],
  'tailored wool trouser': [
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f'
  ],
  'double-breasted blazer': [
    'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  ],

  // Default Editorial Fallback
  'editorial': [
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc'
  ]
}

export function categoryPhoto(label, { width = 800, height = 1200, variant = 'a' } = {}) {
  const key = label.toLowerCase().trim()
  const photoSet = WOMEN_FASHION_IMAGES[key] || WOMEN_FASHION_IMAGES['editorial']
  
  const index = variant === 'b' ? 1 : 0
  const baseUrl = photoSet[index] || photoSet[0]

  return `${baseUrl}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
}