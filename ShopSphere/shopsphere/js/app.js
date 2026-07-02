/* ============================================
   ShopSphere - Core App Logic
   ============================================ */

/* ---------- Theme Manager ---------- */
const ThemeManager = {
  key: 'shopsphere_theme',

  init() {
    const saved = localStorage.getItem(this.key) || 'light';
    this.apply(saved);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  },

  toggle() {
    const current = localStorage.getItem(this.key) || 'light';
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

/* ---------- Toast Notifications ---------- */
function showToast(title, message, type, duration) {
  type = type || 'info';
  duration = duration || 3500;
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML =
    '<div class="toast-icon">' + (icons[type] || 'ℹ️') + '</div>' +
    '<div class="toast-body">' +
      '<div class="toast-title">' + title + '</div>' +
      '<div class="toast-message">' + message + '</div>' +
    '</div>' +
    '<button class="toast-close" onclick="removeToast(this.parentElement)">✕</button>';

  container.appendChild(toast);
  setTimeout(function() { removeToast(toast); }, duration);
}

function removeToast(toast) {
  if (!toast || toast.classList.contains('removing')) return;
  toast.classList.add('removing');
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 350);
}

/* ---------- Navbar ---------- */
function initNavbar() {
  window.addEventListener('scroll', function() {
    var nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }

  var links = document.querySelectorAll('.nav-links a, .mobile-menu .nav-links a');
  links.forEach(function(link) {
    if (link.href === window.location.href) link.classList.add('active');
  });

  var navSearchInput = document.getElementById('nav-search');
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var q = navSearchInput.value.trim();
        if (q) window.location.href = 'products.html?search=' + encodeURIComponent(q);
      }
    });
  }
}

/* ---------- Scroll to Top ---------- */
function initScrollTop() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Quick View Modal ---------- */
function openQuickView(productId) {
  var product = getProductById(productId);
  if (!product) return;

  var overlay = document.getElementById('quick-view-modal');
  if (!overlay) return;

  var discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start">';
  html += '<div style="background:var(--bg-secondary);border-radius:16px;height:300px;display:flex;align-items:center;justify-content:center;font-size:6rem">' + product.emoji + '</div>';
  html += '<div>';
  html += '<div class="product-category">' + product.category + '</div>';
  html += '<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:10px;color:var(--text-primary)">' + product.name + '</h2>';
  html += '<div class="product-rating" style="margin-bottom:12px">' + generateStars(product.rating) + '<span class="rating-count">(' + product.reviews.toLocaleString() + ' reviews)</span></div>';
  html += '<div class="product-price" style="margin-bottom:14px">';
  html += '<span class="price-current" style="font-size:1.4rem;font-weight:800">$' + product.price.toFixed(2) + '</span>';
  if (product.originalPrice) html += '<span class="price-original">$' + product.originalPrice.toFixed(2) + '</span>';
  if (discount) html += '<span class="price-discount">-' + discount + '%</span>';
  html += '</div>';
  html += '<p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;margin-bottom:16px">' + product.description + '</p>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">' + product.features.map(function(f) { return '<span class="chip active" style="font-size:0.75rem">✓ ' + f + '</span>'; }).join('') + '</div>';
  html += '<div style="display:flex;gap:10px">';
  html += '<button class="btn btn-primary" onclick="CartManager.addItem(' + product.id + '); closeModal(\'quick-view-modal\')">🛒 Add to Cart</button>';
  html += '<a href="product-details.html?id=' + product.id + '" class="btn btn-secondary">View Details</a>';
  html += '</div></div></div>';

  overlay.querySelector('.modal-body').innerHTML = html;
  overlay.classList.add('open');
}

function closeModal(id) {
  var overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}

/* ---------- Loading Screen ---------- */
function initLoadingScreen() {
  var screen = document.getElementById('loading-screen');
  if (!screen) return;
  window.addEventListener('load', function() {
    setTimeout(function() { screen.classList.add('hidden'); }, 800);
  });
}

/* ---------- Intersection Observer Animations ---------- */
function initAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card:not([data-animated]), .category-card:not([data-animated]), .testimonial-card:not([data-animated])').forEach(function(el) {
    el.setAttribute('data-animated', '1');
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  var form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = form.querySelector('input[type="email"]').value;
    if (email) {
      showToast('Subscribed! 🎉', 'Thanks for subscribing to our newsletter.', 'success');
      form.reset();
    }
  });
}

/* ---------- App Initialization ---------- */
document.addEventListener('DOMContentLoaded', function() {
  ThemeManager.init();
  initNavbar();
  initScrollTop();
  initLoadingScreen();
  initNewsletter();
  CartManager.updateBadge();
  WishlistManager.updateBadge();

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() { ThemeManager.toggle(); });
  }

  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  setTimeout(initAnimations, 300);
  initPageLogic();
});

/* ---------- Page-Specific Logic Router ---------- */
function initPageLogic() {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') initHomePage();
  else if (page === 'products.html') initProductsPage();
  else if (page === 'product-details.html') initProductDetailsPage();
  else if (page === 'cart.html') initCartPage();
  else if (page === 'wishlist.html') initWishlistPage();
  else if (page === 'checkout.html') initCheckoutPage();
  else if (page === 'contact.html') initContactPage();
}

/* ============================================
   HOME PAGE
   ============================================ */
function initHomePage() {
  renderFeaturedProducts();
  renderBestSellers();
  renderRecentlyViewed();
  renderCategories();
}

function renderFeaturedProducts() {
  var container = document.getElementById('featured-products');
  if (!container) return;

  container.innerHTML = Array(4).fill(generateSkeletonCard()).join('');

  setTimeout(function() {
    var products = getAllProducts().slice(0, 4);
    container.innerHTML = products.map(generateProductCard).join('');
    addProductCardListeners();
    initAnimations();
  }, 800);
}

function renderBestSellers() {
  var container = document.getElementById('bestsellers-products');
  if (!container) return;

  container.innerHTML = Array(4).fill(generateSkeletonCard()).join('');

  setTimeout(function() {
    var products = getAllProducts({ sort: 'popular' }).slice(0, 4);
    container.innerHTML = products.map(generateProductCard).join('');
    addProductCardListeners();
    initAnimations();
  }, 1000);
}

function renderRecentlyViewed() {
  var section = document.getElementById('recently-viewed-section');
  var container = document.getElementById('recently-viewed-products');
  if (!section || !container) return;

  var viewed = getRecentlyViewed();
  if (viewed.length === 0) { section.style.display = 'none'; return; }

  section.style.display = 'block';
  container.innerHTML = viewed.slice(0, 4).map(generateProductCard).join('');
  addProductCardListeners();
}

function renderCategories() {
  var container = document.getElementById('categories-grid');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(function(cat) {
    return '<a href="products.html?category=' + encodeURIComponent(cat.name) + '" class="category-card">' +
      '<span class="category-icon">' + cat.icon + '</span>' +
      '<div class="category-name">' + cat.name + '</div>' +
      '<div class="category-count">' + cat.count + ' products</div>' +
      '</a>';
  }).join('');
}

function addProductCardListeners() {
  document.querySelectorAll('.product-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      var id = card.dataset.id;
      if (id) {
        trackRecentlyViewed(Number(id));
        window.location.href = 'product-details.html?id=' + id;
      }
    });
  });
}

/* ============================================
   PRODUCTS PAGE
   ============================================ */
function initProductsPage() {
  var urlParams = new URLSearchParams(window.location.search);
  var searchParam = urlParams.get('search') || '';
  var categoryParam = urlParams.get('category') || '';

  var currentPage = 1;
  var perPage = 8;
  var currentFilter = { search: searchParam, category: categoryParam, sort: 'popular' };

  var searchInput = document.getElementById('product-search');
  if (searchInput && searchParam) searchInput.value = searchParam;

  renderSidebar();
  renderProducts();

  function renderSidebar() {
    var sidebarCats = document.getElementById('sidebar-categories');
    if (!sidebarCats) return;

    var allCategories = ['All'].concat(CATEGORIES.map(function(c) { return c.name; }));
    sidebarCats.innerHTML = allCategories.map(function(cat) {
      var count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(function(p) { return p.category === cat; }).length;
      var checked = (cat === 'All' && !categoryParam) || cat === categoryParam ? 'checked' : '';
      return '<label class="filter-item" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px;cursor:pointer;transition:var(--transition);margin-bottom:4px">' +
        '<span style="display:flex;align-items:center;gap:8px"><input type="radio" name="category" value="' + cat + '" ' + checked + ' style="accent-color:var(--primary)"> ' + cat + '</span>' +
        '<span class="filter-count" style="background:var(--bg-secondary);padding:2px 8px;border-radius:50px;font-size:0.72rem;color:var(--text-muted)">' + count + '</span>' +
        '</label>';
    }).join('');

    sidebarCats.querySelectorAll('input[type="radio"]').forEach(function(input) {
      input.addEventListener('change', function() {
        currentFilter.category = input.value === 'All' ? '' : input.value;
        currentPage = 1;
        renderProducts();
      });
    });

    var priceMin = document.getElementById('price-min');
    var priceMax = document.getElementById('price-max');
    if (priceMin && priceMax) {
      priceMin.addEventListener('input', function() {
        currentFilter.minPrice = Number(priceMin.value) || undefined;
        renderProducts();
      });
      priceMax.addEventListener('input', function() {
        currentFilter.maxPrice = Number(priceMax.value) || undefined;
        renderProducts();
      });
    }
  }

  function renderProducts() {
    var container = document.getElementById('products-grid');
    var countEl = document.getElementById('products-count');
    if (!container) return;

    container.innerHTML = Array(perPage).fill(generateSkeletonCard()).join('');

    setTimeout(function() {
      var allFiltered = getAllProducts(currentFilter);
      var totalPages = Math.ceil(allFiltered.length / perPage);
      var paginated = allFiltered.slice((currentPage - 1) * perPage, currentPage * perPage);

      if (countEl) countEl.textContent = allFiltered.length + ' products found';

      if (paginated.length === 0) {
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><h3>No products found</h3><p>Try adjusting your search or filters</p><a href="products.html" class="btn btn-primary">Clear Filters</a></div>';
      } else {
        container.innerHTML = paginated.map(generateProductCard).join('');
        addProductCardListeners();
        initAnimations();
      }

      renderPagination(totalPages);
    }, 600);
  }

  function renderPagination(total) {
    var paginationEl = document.getElementById('pagination');
    if (!paginationEl || total <= 1) { if (paginationEl) paginationEl.innerHTML = ''; return; }

    var html = '<button class="page-btn ' + (currentPage === 1 ? 'disabled' : '') + '" onclick="changePage(' + (currentPage - 1) + ')">‹</button>';
    for (var i = 1; i <= total; i++) {
      html += '<button class="page-btn ' + (i === currentPage ? 'active' : '') + '" onclick="changePage(' + i + ')">' + i + '</button>';
    }
    html += '<button class="page-btn ' + (currentPage === total ? 'disabled' : '') + '" onclick="changePage(' + (currentPage + 1) + ')">›</button>';
    paginationEl.innerHTML = html;
  }

  window.changePage = function(page) {
    var allFiltered = getAllProducts(currentFilter);
    var totalPages = Math.ceil(allFiltered.length / perPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderProducts();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentFilter.sort = sortSelect.value;
      currentPage = 1;
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentFilter.search = searchInput.value.trim();
      currentPage = 1;
      renderProducts();
    });
  }

  var filterToggle = document.getElementById('filter-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

/* ============================================
   PRODUCT DETAILS PAGE
   ============================================ */
function initProductDetailsPage() {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = Number(urlParams.get('id'));
  var product = getProductById(productId);

  if (!product) { window.location.href = '404.html'; return; }

  trackRecentlyViewed(productId);
  document.title = product.name + ' - ShopSphere';

  var detailsContainer = document.getElementById('product-details-content');
  if (!detailsContainer) return;

  var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  var currentQty = 1;

  var html = '<div class="product-details-grid">';

  // Gallery
  html += '<div class="product-gallery">';
  html += '<div class="gallery-main" style="background:var(--bg-secondary);border-radius:20px;height:420px;display:flex;align-items:center;justify-content:center;font-size:8rem;margin-bottom:16px;border:2px solid var(--border-light)">' + product.emoji + '</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">';
  product.images.forEach(function(img, i) {
    html += '<div onclick="selectImage(this,\'' + img + '\')" class="thumb-item' + (i === 0 ? ' active' : '') + '" style="background:var(--bg-secondary);border-radius:12px;height:90px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;cursor:pointer;border:2px solid ' + (i === 0 ? 'var(--primary)' : 'var(--border-light)') + ';transition:var(--transition)">' + img + '</div>';
  });
  html += '</div></div>';

  // Info
  html += '<div class="product-info">';
  html += '<div class="product-category" style="margin-bottom:8px">' + product.category + '</div>';
  html += '<h1 style="font-size:clamp(1.4rem,3vw,2rem);font-weight:800;margin-bottom:14px;color:var(--text-primary);line-height:1.3">' + product.name + '</h1>';
  html += '<div class="product-rating" style="margin-bottom:16px">' + generateStars(product.rating) + '<span class="rating-count">(' + product.reviews.toLocaleString() + ' reviews)</span>';
  if (product.stock < 20) html += '<span style="background:rgba(225,112,85,0.15);color:var(--danger);padding:3px 10px;border-radius:50px;font-size:0.75rem;font-weight:600;margin-left:8px">Only ' + product.stock + ' left!</span>';
  html += '</div>';
  html += '<div class="product-price" style="margin-bottom:20px"><span class="price-current" style="font-size:2rem;font-weight:800">$' + product.price.toFixed(2) + '</span>';
  if (product.originalPrice) html += '<span class="price-original" style="font-size:1.1rem">$' + product.originalPrice.toFixed(2) + '</span>';
  if (discount) html += '<span class="price-discount" style="font-size:0.9rem">-' + discount + '% OFF</span>';
  html += '</div>';
  html += '<p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8;margin-bottom:20px">' + product.description + '</p>';
  html += '<div style="margin-bottom:24px"><div style="font-weight:600;font-size:0.9rem;margin-bottom:10px">Features:</div><div style="display:flex;flex-wrap:wrap;gap:8px">' + product.features.map(function(f) { return '<span class="chip active">✓ ' + f + '</span>'; }).join('') + '</div></div>';
  html += '<div style="margin-bottom:24px"><div style="font-weight:600;font-size:0.9rem;margin-bottom:10px">Quantity:</div><div class="qty-input"><button class="qty-btn" id="qty-minus">−</button><input type="number" class="qty-value" id="detail-qty" value="1" min="1" max="10" readonly><button class="qty-btn" id="qty-plus">+</button></div></div>';
  html += '<div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">';
  html += '<button class="btn btn-primary btn-lg" id="add-to-cart-btn">🛒 Add to Cart</button>';
  html += '<button class="btn btn-secondary btn-lg" id="wishlist-detail-btn">' + (WishlistManager.has(productId) ? '❤️ Wishlisted' : '🤍 Wishlist') + '</button>';
  html += '</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:12px;padding-top:20px;border-top:1px solid var(--border-color)">';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-secondary)">🚚 Free Shipping</span>';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-secondary)">↩️ Easy Returns</span>';
  html += '<span style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-secondary)">🔒 Secure Payment</span>';
  html += '</div></div></div>';

  detailsContainer.innerHTML = html;

  // Bind events
  document.getElementById('qty-minus').addEventListener('click', function() {
    currentQty = Math.max(1, currentQty - 1);
    document.getElementById('detail-qty').value = currentQty;
  });

  document.getElementById('qty-plus').addEventListener('click', function() {
    currentQty = Math.min(10, currentQty + 1);
    document.getElementById('detail-qty').value = currentQty;
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    CartManager.addItem(product.id, currentQty);
  });

  document.getElementById('wishlist-detail-btn').addEventListener('click', function() {
    var added = WishlistManager.toggle(product.id);
    this.textContent = added ? '❤️ Wishlisted' : '🤍 Wishlist';
    showToast(added ? 'Added to Wishlist ❤️' : 'Removed', added ? 'Saved to your wishlist.' : 'Removed from wishlist.', added ? 'success' : 'info');
  });

  window.selectImage = function(el, emoji) {
    document.querySelector('.gallery-main').textContent = emoji;
    document.querySelectorAll('.thumb-item').forEach(function(t) { t.style.borderColor = 'var(--border-light)'; });
    el.style.borderColor = 'var(--primary)';
  };

  renderRelatedProducts(product);
  renderReviews(product);
}

function renderRelatedProducts(product) {
  var container = document.getElementById('related-products');
  if (!container) return;
  var related = getRelatedProducts(product, 4);
  if (related.length === 0) { var sec = container.closest('section'); if (sec) sec.style.display = 'none'; return; }
  container.innerHTML = related.map(generateProductCard).join('');
  addProductCardListeners();
  initAnimations();
}

function renderReviews(product) {
  var container = document.getElementById('reviews-container');
  if (!container) return;

  var reviews = [
    { name: 'Alex Johnson', rating: 5, date: 'June 1, 2026', text: 'Absolutely love this product! Exceeded my expectations in every way. The quality is outstanding.' },
    { name: 'Sarah M.', rating: 4, date: 'May 28, 2026', text: 'Great product overall. Shipping was fast and packaging was excellent. Would buy again.' },
    { name: 'Mike Chen', rating: 5, date: 'May 20, 2026', text: "Best purchase I've made this year. Highly recommended to anyone looking for quality." }
  ];

  container.innerHTML = reviews.map(function(r) {
    return '<div style="padding:20px 0;border-bottom:1px solid var(--border-light)">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
      '<div style="width:40px;height:40px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.9rem">' + r.name[0] + '</div>' +
      '<div><div style="font-weight:600;font-size:0.9rem">' + r.name + '</div><div style="font-size:0.75rem;color:var(--text-muted)">' + r.date + '</div></div>' +
      '<div style="margin-left:auto">' + generateStars(r.rating) + '</div>' +
      '</div>' +
      '<p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7">' + r.text + '</p>' +
      '</div>';
  }).join('');
}

/* ============================================
   CART PAGE
   ============================================ */
function initCartPage() { renderCart(); }

function renderCart() {
  var cartContainer = document.getElementById('cart-items');
  var summaryContainer = document.getElementById('cart-summary');
  if (!cartContainer) return;

  var items = CartManager.getItems();

  if (items.length === 0) {
    cartContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🛒</div><h3>Your cart is empty</h3><p>Looks like you have not added anything yet</p><a href="products.html" class="btn btn-primary">Start Shopping</a></div>';
    if (summaryContainer) summaryContainer.innerHTML = '';
    return;
  }

  cartContainer.innerHTML = items.map(function(item) {
    return '<div class="cart-item card" style="display:flex;align-items:center;gap:16px;padding:16px;margin-bottom:12px">' +
      '<div style="width:90px;height:90px;background:var(--bg-secondary);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;flex-shrink:0">' + item.emoji + '</div>' +
      '<div style="flex:1;min-width:0">' +
      '<div style="font-size:0.75rem;color:var(--primary);font-weight:600;margin-bottom:4px">' + item.category + '</div>' +
      '<h4 style="font-size:0.95rem;font-weight:600;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + item.name + '</h4>' +
      '<div style="font-size:1rem;font-weight:700">$' + item.price.toFixed(2) + '</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px">' +
      '<div class="qty-input">' +
      '<button class="qty-btn" onclick="updateCartQty(' + item.id + ',' + (item.qty - 1) + ')">−</button>' +
      '<input type="number" class="qty-value" value="' + item.qty + '" min="1" max="10" onchange="updateCartQty(' + item.id + ',parseInt(this.value))">' +
      '<button class="qty-btn" onclick="updateCartQty(' + item.id + ',' + (item.qty + 1) + ')">+</button>' +
      '</div>' +
      '<div style="font-weight:700;color:var(--primary)">$' + (item.price * item.qty).toFixed(2) + '</div>' +
      '<button onclick="removeFromCart(' + item.id + ')" style="color:var(--danger);font-size:0.82rem;cursor:pointer;background:none;border:none">🗑️ Remove</button>' +
      '</div>' +
      '</div>';
  }).join('');

  renderCartSummary(items, summaryContainer);
}

function renderCartSummary(items, container) {
  if (!container) return;

  var subtotal = CartManager.getSubtotal();
  var shipping = subtotal > 50 ? 0 : 9.99;
  var tax = subtotal * 0.08;
  var total = subtotal + shipping + tax;
  var couponApplied = false;
  var discount = 0;

  function summaryLines(disc) {
    var t = subtotal + shipping + tax - disc;
    return '<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:0.9rem;color:var(--text-secondary)"><span>Subtotal</span><span style="color:var(--text-primary);font-weight:500">$' + subtotal.toFixed(2) + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:0.9rem;color:var(--text-secondary)"><span>Shipping</span><span style="color:' + (shipping === 0 ? 'var(--success)' : 'var(--text-primary)') + ';font-weight:500">' + (shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)) + '</span></div>' +
      (disc > 0 ? '<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:0.9rem;color:var(--success)"><span>Discount (SAVE10)</span><span>-$' + disc.toFixed(2) + '</span></div>' : '') +
      '<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:0.9rem;color:var(--text-secondary)"><span>Tax (8%)</span><span style="color:var(--text-primary);font-weight:500">$' + tax.toFixed(2) + '</span></div>' +
      '<div class="divider"></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:1.15rem;font-weight:800;margin-top:12px"><span>Total</span><span style="color:var(--primary)">$' + t.toFixed(2) + '</span></div>';
  }

  container.innerHTML = '<div class="card" style="padding:24px;position:sticky;top:90px">' +
    '<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:20px">Order Summary</h3>' +
    '<div id="summary-lines">' + summaryLines(0) + '</div>' +
    '<div style="margin:16px 0;display:flex;gap:8px">' +
    '<input id="coupon-input" type="text" class="form-control" placeholder="Coupon code (SAVE10)" style="flex:1">' +
    '<button id="coupon-btn" class="btn btn-secondary btn-sm">Apply</button>' +
    '</div>' +
    '<a href="checkout.html" class="btn btn-primary" style="width:100%;display:block;text-align:center">Proceed to Checkout →</a>' +
    '<a href="products.html" class="btn btn-secondary" style="width:100%;display:block;text-align:center;margin-top:10px">Continue Shopping</a>' +
    '</div>';

  document.getElementById('coupon-btn').addEventListener('click', function() {
    var code = document.getElementById('coupon-input').value.trim().toUpperCase();
    if (code === 'SAVE10' && !couponApplied) {
      couponApplied = true;
      discount = subtotal * 0.1;
      document.getElementById('summary-lines').innerHTML = summaryLines(discount);
      showToast('Coupon Applied! 🎉', '10% discount applied.', 'success');
    } else if (couponApplied) {
      showToast('Already Applied', 'Coupon already in use.', 'warning');
    } else {
      showToast('Invalid Code', 'Try SAVE10 for 10% off.', 'error');
    }
  });
}

window.updateCartQty = function(id, qty) {
  CartManager.updateQty(id, qty);
  renderCart();
};

window.removeFromCart = function(id) {
  CartManager.removeItem(id);
  showToast('Removed', 'Item removed from cart.', 'info');
  renderCart();
};

/* ============================================
   WISHLIST PAGE
   ============================================ */
function initWishlistPage() {
  var container = document.getElementById('wishlist-grid');
  if (!container) return;
  var products = WishlistManager.getProducts();

  if (products.length === 0) {
    container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">❤️</div><h3>Your wishlist is empty</h3><p>Save products you love for later</p><a href="products.html" class="btn btn-primary">Browse Products</a></div>';
    return;
  }

  container.innerHTML = products.map(generateProductCard).join('');
  addProductCardListeners();
  initAnimations();
}

/* ============================================
   CHECKOUT PAGE
   ============================================ */
function initCheckoutPage() {
  renderCheckoutSummary();
  initCheckoutSteps();
}

function renderCheckoutSummary() {
  var container = document.getElementById('checkout-order-summary');
  if (!container) return;

  var items = CartManager.getItems();
  var subtotal = CartManager.getSubtotal();
  var shipping = subtotal > 50 ? 0 : 9.99;
  var tax = subtotal * 0.08;
  var total = subtotal + shipping + tax;

  if (items.length === 0) {
    container.innerHTML = '<div class="card" style="padding:24px;text-align:center"><p style="color:var(--text-secondary)">No items in cart.</p><a href="products.html" class="btn btn-primary" style="margin-top:12px">Shop Now</a></div>';
    return;
  }

  var itemsHtml = items.map(function(item) {
    return '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
      '<div style="width:48px;height:48px;background:var(--bg-secondary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0">' + item.emoji + '</div>' +
      '<div style="flex:1;min-width:0"><div style="font-size:0.85rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + item.name + '</div><div style="font-size:0.75rem;color:var(--text-muted)">Qty: ' + item.qty + '</div></div>' +
      '<div style="font-weight:700;font-size:0.9rem">$' + (item.price * item.qty).toFixed(2) + '</div>' +
      '</div>';
  }).join('');

  container.innerHTML = '<div class="card" style="padding:24px;position:sticky;top:90px">' +
    '<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:20px">Order Summary</h3>' +
    '<div style="max-height:220px;overflow-y:auto;margin-bottom:16px">' + itemsHtml + '</div>' +
    '<div class="divider"></div>' +
    '<div style="display:flex;justify-content:space-between;margin:8px 0;font-size:0.9rem;color:var(--text-secondary)"><span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;margin:8px 0;font-size:0.9rem;color:var(--text-secondary)"><span>Shipping</span><span style="color:' + (shipping === 0 ? 'var(--success)' : '') + '">' + (shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;margin:8px 0;font-size:0.9rem;color:var(--text-secondary)"><span>Tax</span><span>$' + tax.toFixed(2) + '</span></div>' +
    '<div class="divider"></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:1.15rem;font-weight:800;margin-top:10px"><span>Total</span><span style="color:var(--primary)">$' + total.toFixed(2) + '</span></div>' +
    '</div>';
}

function initCheckoutSteps() {
  var currentStep = 1;

  function showStep(step) {
    document.querySelectorAll('.checkout-step-content').forEach(function(el) { el.classList.add('hidden'); });
    document.querySelectorAll('.step-indicator').forEach(function(el, i) {
      el.classList.toggle('active', i + 1 === step);
      el.classList.toggle('completed', i + 1 < step);
    });
    var stepEl = document.getElementById('step-' + step);
    if (stepEl) stepEl.classList.remove('hidden');
    currentStep = step;
  }

  window.nextStep = function() { if (currentStep < 3) showStep(currentStep + 1); };
  window.prevStep = function() { if (currentStep > 1) showStep(currentStep - 1); };
  window.placeOrder = function() {
    CartManager.clear();
    showStep(4);
    CartManager.updateBadge();
  };

  showStep(1);
}

/* ============================================
   CONTACT PAGE
   ============================================ */
function initContactPage() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Message Sent! 📧', "We'll get back to you within 24 hours.", 'success');
    form.reset();
  });
}
