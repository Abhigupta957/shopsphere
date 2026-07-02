/* ============================================
   ShopSphere - Wishlist Manager
   ============================================ */

const WishlistManager = {
  storageKey: 'shopsphere_wishlist',

  /** Get all wishlist item IDs */
  getItems() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  },

  /** Save to storage */
  save(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateBadge();
  },

  /** Add item */
  add(productId) {
    const items = this.getItems();
    if (!items.includes(productId)) {
      items.push(productId);
      this.save(items);
    }
  },

  /** Remove item */
  remove(productId) {
    const items = this.getItems().filter(id => id !== productId);
    this.save(items);
  },

  /** Toggle */
  toggle(productId) {
    if (this.has(productId)) {
      this.remove(productId);
      return false;
    } else {
      this.add(productId);
      return true;
    }
  },

  /** Check if in wishlist */
  has(productId) {
    return this.getItems().includes(Number(productId));
  },

  /** Get count */
  getCount() {
    return this.getItems().length;
  },

  /** Update nav badge */
  updateBadge() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  /** Get product objects */
  getProducts() {
    return this.getItems()
      .map(id => getProductById(id))
      .filter(Boolean);
  }
};

/**
 * Global toggle function used by product cards
 */
function toggleWishlist(productId) {
  const added = WishlistManager.toggle(productId);
  const btn = document.querySelector(`.wishlist-toggle[data-id="${productId}"]`);
  if (btn) {
    btn.textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('wishlisted', added);
  }
  showToast(
    added ? 'Added to Wishlist ❤️' : 'Removed from Wishlist',
    added
      ? `${getProductById(productId)?.name} saved to your wishlist.`
      : `${getProductById(productId)?.name} removed from wishlist.`,
    added ? 'success' : 'info'
  );
}
