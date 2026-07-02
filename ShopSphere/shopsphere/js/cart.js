/* ============================================
   ShopSphere - Cart Manager
   ============================================ */

const CartManager = {
  storageKey: 'shopsphere_cart',

  /** Get all cart items */
  getItems() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  },

  /** Save items to storage */
  save(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateBadge();
  },

  /** Add item to cart */
  addItem(productId, qty = 1) {
    const product = getProductById(productId);
    if (!product) return;

    let items = this.getItems();
    const existing = items.find(i => i.id === productId);

    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        category: product.category,
        qty
      });
    }

    this.save(items);
    showToast('Added to Cart! 🛒', `${product.name} added to your cart.`, 'success');
  },

  /** Remove item from cart */
  removeItem(productId) {
    let items = this.getItems().filter(i => i.id !== productId);
    this.save(items);
  },

  /** Update item quantity */
  updateQty(productId, qty) {
    let items = this.getItems();
    const item = items.find(i => i.id === productId);
    if (item) {
      if (qty < 1) {
        this.removeItem(productId);
        return;
      }
      item.qty = Math.min(qty, 10);
      this.save(items);
    }
  },

  /** Clear entire cart */
  clear() {
    localStorage.removeItem(this.storageKey);
    this.updateBadge();
  },

  /** Get total item count */
  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  /** Get subtotal */
  getSubtotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  /** Update nav badge */
  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  /** Check if product is in cart */
  has(productId) {
    return this.getItems().some(i => i.id === productId);
  }
};
