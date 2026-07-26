# Velora — Frontend

AI-powered e-commerce frontend built with React 19, Vite, Tailwind CSS v4, and React Router.
This is a **fully working, standalone frontend** running on mock data — no backend required yet.
Every data call lives in `src/data/mockData.js` and the three context providers, so swapping in
your real Express API later means editing those files, not the UI.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Demo accounts

- Customer: `demo@velora.com` / `demo1234`
- Admin: `admin@velora.com` / `admin1234` (unlocks `/admin`)

## What's implemented

- **Auth** — login/register/logout (mock, backed by localStorage) with protected routes
- **Catalog** — product grid, category filter, price filter, sort, search (`/products`)
- **Product detail** — image gallery, size selector, reviews, related products, AI try-on modal (placeholder)
- **Cart & wishlist** — persisted client-side, quantity controls
- **Checkout** — shipping + mock payment form, order confirmation
- **Order history** — per-user order list
- **Admin dashboard** — revenue/stock overview, product CRUD (table + modal form), order status management
- **AI chatbot** — floating widget with mocked responses, structured to swap in a real LLM call
- **Responsive** throughout, mobile nav and filter drawer included

## Project structure

```
src/
  data/mockData.js        mock products, categories, reviews, orders — swap for API calls
  context/                AuthContext, CartContext, WishlistContext (React state + localStorage)
  components/              Navbar, Footer, ProductCard, StarRating, ChatbotWidget, route guards
  pages/                  one file per route
  pages/admin/            admin-only routes (nested under /admin)
```

## Connecting the real backend

Every place that currently reads from `mockData.js` or writes to `localStorage` is a seam:

1. Replace `AuthContext` login/register with calls to your `/api/auth` endpoints and store the JWT.
2. Replace the `products`/`categories` imports in `Products.jsx`, `ProductDetail.jsx`, `Home.jsx`
   with fetch calls to your product API (consider React Query for caching).
3. `CartContext`/`WishlistContext` can stay client-side for guests, then sync to the server on login.
4. `Checkout.jsx`'s mock payment form is where Stripe Elements slots in.
5. `ChatbotWidget.jsx`'s `mockReply()` is where your OpenAI/Gemini call replaces the placeholder logic.
6. The AI try-on modal in `ProductDetail.jsx` is scoped as a separate feature to build once the rest
   of the stack is live — it needs an image upload plus a vision model call.

## Design system

Tokens live in `src/index.css` under `@theme` (Tailwind v4's CSS-based config): palette, type scale,
and the signature "tag corner" detail used on product cards are all defined there.
