# ShopSphere 🛍️

A complete, professional e-commerce website built with pure HTML, CSS, and Vanilla JavaScript.

## Live Features

- 10 fully-built pages
- Dark/Light mode with persistence
- Cart & Wishlist (localStorage)
- Product search, filter, sort, paginate
- Checkout with multi-step form
- Toast notifications
- Skeleton loading screens
- Responsive across all screen sizes

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage – hero, categories, featured/bestsellers, testimonials, newsletter |
| `products.html` | Products grid with sidebar filters, sort, search, pagination |
| `product-details.html` | Full product page – gallery, qty, reviews, related products |
| `cart.html` | Cart with qty controls, coupon code, live total |
| `wishlist.html` | Saved items, move to cart, clear all |
| `checkout.html` | 3-step checkout – shipping, payment, review + success screen |
| `about.html` | Company story, stats, team, values |
| `contact.html` | Contact form, info cards, FAQ accordion |
| `login.html` | Sign in with email/social + password toggle |
| `signup.html` | Register with password strength meter |
| `404.html` | Custom error page with search |

## Structure

```
shopsphere/
├── index.html
├── products.html
├── product-details.html
├── cart.html
├── wishlist.html
├── checkout.html
├── about.html
├── contact.html
├── login.html
├── signup.html
├── 404.html
├── css/
│   ├── style.css        # All styles + CSS variables + animations
│   └── responsive.css   # Media queries + layout grids
├── js/
│   ├── products.js      # Product data, card generator, utilities
│   ├── cart.js          # CartManager (localStorage)
│   ├── wishlist.js      # WishlistManager (localStorage)
│   └── app.js           # Theme, toasts, navbar, all page logic
└── README.md
```


## Tech

- HTML5 (semantic, accessible)
- CSS3 (variables, flexbox, grid, animations, glassmorphism)
- Vanilla JS ES6+ (no frameworks, no libraries)
- localStorage for cart, wishlist, theme persistence

