/* ============================================
   ShopSphere - Products Data & Utilities
   ============================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 2341,
    badge: "hot",
    emoji: "🎧",
    description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    features: ["Active Noise Cancellation", "30hr Battery Life", "Bluetooth 5.0", "Foldable Design"],
    stock: 48,
    images: ["🎧", "🎵", "🔊"]
  },
  {
    id: 2,
    name: "Smart Watch Pro X",
    category: "Electronics",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 1876,
    badge: "new",
    emoji: "⌚",
    description: "Stay connected and track your fitness goals with this sleek smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.",
    features: ["Heart Rate Monitor", "GPS Tracking", "7-Day Battery", "Water Resistant"],
    stock: 23,
    images: ["⌚", "📱", "💪"]
  },
  {
    id: 3,
    name: "Minimalist Leather Wallet",
    category: "Accessories",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 987,
    badge: "sale",
    emoji: "👜",
    description: "Slim and durable genuine leather wallet with RFID blocking technology. Fits up to 8 cards and cash.",
    features: ["RFID Blocking", "Genuine Leather", "Slim Profile", "8 Card Slots"],
    stock: 120,
    images: ["👜", "💳", "🔒"]
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Home & Office",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 3210,
    badge: "hot",
    emoji: "🪑",
    description: "All-day comfort with lumbar support, adjustable armrests, and breathable mesh back. Perfect for long work sessions.",
    features: ["Lumbar Support", "Adjustable Height", "Mesh Back", "360° Swivel"],
    stock: 15,
    images: ["🪑", "💼", "🖥️"]
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 1543,
    badge: null,
    emoji: "🔊",
    description: "Waterproof speaker with 360° surround sound, 12-hour playback, and compact design for on-the-go music.",
    features: ["IPX7 Waterproof", "12hr Playback", "360° Sound", "USB-C Charging"],
    stock: 67,
    images: ["🔊", "🎵", "🏖️"]
  },
  {
    id: 6,
    name: "Running Sneakers Ultra",
    category: "Footwear",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 2098,
    badge: "trending",
    emoji: "👟",
    description: "Lightweight and responsive running shoes with advanced cushioning technology for maximum performance and comfort.",
    features: ["Air Cushion Sole", "Breathable Mesh", "Anti-Slip Grip", "Lightweight"],
    stock: 89,
    images: ["👟", "🏃", "⚡"]
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    category: "Home & Office",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 4521,
    badge: null,
    emoji: "🫙",
    description: "Keep drinks cold for 24 hours or hot for 12 hours with this vacuum-insulated stainless steel bottle.",
    features: ["Vacuum Insulated", "BPA Free", "24hr Cold/12hr Hot", "500ml Capacity"],
    stock: 200,
    images: ["🫙", "💧", "♻️"]
  },
  {
    id: 8,
    name: "Mechanical Keyboard RGB",
    category: "Electronics",
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviews: 1231,
    badge: "new",
    emoji: "⌨️",
    description: "Professional mechanical keyboard with RGB backlighting, tactile switches, and aluminum frame for superior typing experience.",
    features: ["RGB Backlit", "Tactile Switches", "Aluminum Frame", "Wireless & Wired"],
    stock: 34,
    images: ["⌨️", "💻", "🎮"]
  },
  {
    id: 9,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 876,
    badge: null,
    emoji: "🧘",
    description: "Non-slip eco-friendly yoga mat with alignment lines, extra thickness for joint protection, and carrying strap.",
    features: ["Non-Slip Surface", "6mm Thickness", "Eco-Friendly", "Alignment Lines"],
    stock: 75,
    images: ["🧘", "💪", "🌿"]
  },
  {
    id: 10,
    name: "Sunglasses Aviator Classic",
    category: "Accessories",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviews: 654,
    badge: "sale",
    emoji: "🕶️",
    description: "Classic aviator sunglasses with UV400 protection, polarized lenses, and lightweight metal frame.",
    features: ["UV400 Protection", "Polarized Lenses", "Metal Frame", "Scratch Resistant"],
    stock: 56,
    images: ["🕶️", "☀️", "🌊"]
  },
  {
    id: 11,
    name: "Coffee Maker Deluxe",
    category: "Home & Office",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 1987,
    badge: "hot",
    emoji: "☕",
    description: "Brew barista-quality coffee at home with programmable settings, built-in grinder, and thermal carafe.",
    features: ["Built-in Grinder", "Programmable Timer", "Thermal Carafe", "12-Cup Capacity"],
    stock: 42,
    images: ["☕", "🫘", "⏱️"]
  },
  {
    id: 12,
    name: "Backpack Travel Pro",
    category: "Travel",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 2340,
    badge: "trending",
    emoji: "🎒",
    description: "Versatile travel backpack with USB charging port, anti-theft design, and laptop compartment for 17\" devices.",
    features: ["USB Charging Port", "Anti-Theft Pocket", "17\" Laptop Space", "Water Resistant"],
    stock: 98,
    images: ["🎒", "✈️", "💻"]
  }
];

const CATEGORIES = [
  { name: "Electronics", icon: "💻", count: 4 },
  { name: "Accessories", icon: "👜", count: 2 },
  { name: "Home & Office", icon: "🏠", count: 3 },
  { name: "Footwear", icon: "👟", count: 1 },
  { name: "Sports", icon: "⚽", count: 1 },
  { name: "Travel", icon: "✈️", count: 1 }
];

/* ---------- Product Utilities ---------- */

/**
 * Get all products (with optional filter)
 */
function getAllProducts(filter = {}) {
  let list = [...PRODUCTS];

  if (filter.category) {
    list = list.filter(p => p.category === filter.category);
  }

  if (filter.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (filter.minPrice !== undefined) {
    list = list.filter(p => p.price >= filter.minPrice);
  }

  if (filter.maxPrice !== undefined) {
    list = list.filter(p => p.price <= filter.maxPrice);
  }

  if (filter.sort) {
    switch (filter.sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'popular':    list.sort((a, b) => b.reviews - a.reviews); break;
    }
  }

  return list;
}

/**
 * Get product by ID
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

/**
 * Get related products (same category, excluding current)
 */
function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += '<span class="star">★</span>';
    } else if (i - 0.5 <= rating) {
      html += '<span class="star" style="opacity:0.6">★</span>';
    } else {
      html += '<span class="star" style="color:var(--border-color)">★</span>';
    }
  }
  html += '</div>';
  return html;
}

/**
 * Generate product card HTML
 */
function generateProductCard(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const isWishlisted = WishlistManager.has(product.id);

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-image">
        <div class="product-img-placeholder">${product.emoji}</div>
        ${product.badge ? `<div class="product-badges"><span class="badge badge-${product.badge}">${product.badge}</span></div>` : ''}
        <div class="product-actions">
          <button class="product-action-btn wishlist-toggle ${isWishlisted ? 'wishlisted' : ''}"
                  data-id="${product.id}" title="Wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
            ${isWishlisted ? '❤️' : '🤍'}
          </button>
          <button class="product-action-btn" title="Quick View" onclick="event.stopPropagation(); openQuickView(${product.id})">🔍</button>
        </div>
        <button class="quick-view-btn" onclick="event.stopPropagation(); openQuickView(${product.id})">Quick View</button>
      </div>
      <div class="product-card-body">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          ${generateStars(product.rating)}
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${discount ? `<span class="price-discount">-${discount}%</span>` : ''}
        </div>
        <div class="product-card-footer">
          <button class="btn-add-cart" onclick="event.stopPropagation(); CartManager.addItem(${product.id}); showToast('Added to cart!', '${product.name} added to your cart.', 'success')">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate skeleton card HTML
 */
function generateSkeletonCard() {
  return `
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line shorter"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line shorter"></div>
        <div class="skeleton-line" style="height:36px;margin-top:14px;border-radius:8px"></div>
      </div>
    </div>
  `;
}

/**
 * Track recently viewed
 */
function trackRecentlyViewed(productId) {
  let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);
  viewed = viewed.slice(0, 6);
  localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
}

function getRecentlyViewed() {
  const ids = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  return ids.map(id => getProductById(id)).filter(Boolean);
}
