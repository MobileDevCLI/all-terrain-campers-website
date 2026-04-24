# Technical Reference

For developers who need to understand, modify, or extend the site.

---

## Architecture

**Type:** Static single-file HTML site with client-side JavaScript for interactivity.

**File count:** 1 HTML file + ~20 images + a handful of config/docs files. Zero build step.

**Total wire weight:** ~210 KB HTML + ~1 MB images (all images compressed + self-hosted).

**Load performance:** First Contentful Paint under 1s on a decent 4G connection.

## Stack

| Layer | Choice | Why |
|---|---|---|
| HTML | Plain semantic HTML5 | No framework means no build, no dependencies, no breakage |
| CSS | Vanilla CSS with custom properties | All theme colors live in `:root` for easy retheming |
| JS | Vanilla ES2020+ | Widely supported, zero deps |
| Hosting | Vercel static | Free tier, instant deploys, custom domains, SSL |
| Images | Self-hosted under `/images/` | No hotlink risk, fast edge-cached |
| Analytics | None yet | Recommend Plausible when ready |
| Forms | Client-side only | Wire to Formspree or Vercel function when ready |

## File structure

```
/
├── index.html          — everything that renders in the browser
├── vercel.json         — deploy config + cache headers
├── robots.txt          — search engine directive
├── sitemap.xml         — SEO sitemap
├── camp.html           — legacy alias for index (mobilecli.com/camp)
├── .gitignore
│
├── images/             — all static images
│   ├── hero-w8.jpg
│   ├── landscape_01-03.jpg
│   ├── popup_01-03.jpg
│   └── products/       — e-commerce thumbnails
│
├── api/                — reserved for serverless functions (Phase 1+)
├── admin/              — reserved for admin panel (Phase 2+)
└── docs/               — owner docs
```

## Key code regions in `index.html`

Search the file for these markers to find each region:

| Find | What |
|---|---|
| `:root{` | Theme color palette (CSS variables) |
| `<!-- ============== HERO` | Hero slideshow markup + logic |
| `<!-- ============== TRUST BAR` | Trust bar (clickable) |
| `<!-- ============== SUPPORTED TRUCKS` | Truck brand selector |
| `<!-- ============== BUILD & PRICE` | Find My Camper configurator |
| `<!-- ============== FEATURED MODELS` | 3 hero model cards + full model grid |
| `<!-- ============== SHOP` | Product grid |
| `<!-- ============== COLD WEATHER PACK` | CWP deep dive |
| `<!-- ============== REFURBISHMENT` | Refurb + 4WC mention |
| `<!-- ============== ADVENTURE GALLERY` | Build photos lightbox |
| `<!-- ============== TESTIMONIALS` | Owner testimonial carousel |
| `<!-- ============== PRICING` | Pricing tables |
| `<!-- ============== FAQ` | Accordion FAQ |
| `<!-- ============== PRESS` | Press articles + forum links |
| `<!-- ============== SOCIAL HUB` | IG/FB/Marketplace/YouTube cards |
| `<!-- ============== LOCATION / MAP` | Google Maps embed |
| `<!-- ============== CONTACT FORM` | Inquiry form |
| `<!-- ============== FOOTER` | 5-column footer |
| `<!-- ============== CART DRAWER` | Shopping cart slide-in |
| `<!-- ============== LIGHTBOX` | Full-screen image viewer |
| `<!-- ============== TRUCK MODAL` | Truck brand detail modal |
| `<!-- ============== INFO MODAL` | Trust-bar deep-dive modal |
| `<!-- ============== SHOP MODAL` | Product detail + checkout |
| `<!-- ============== MODEL DETAIL MODAL` | Per-model detail popup |

## Key data structures in `index.html`

All defined in the `<script>` tag near the bottom:

| Variable | Purpose |
|---|---|
| `PRODUCTS` | Shop accessories (12 entries) |
| `MODELS` | Camper models (7 entries: cougar, puma, panther, ocelot, bobcat, lynx, shell) |
| `GALLERY` | Gallery + lightbox photos (22 entries) |
| `TESTIMONIALS` | Owner testimonials (5 entries) |
| `TRUCKS` | Truck brand detail content (7 entries) |
| `INFO` | Trust bar deep-dive content (4 topics) |
| `FEATURES` | Standard equipment items (26 entries) |
| `CFG_RESULTS` | Configurator truck-to-model mapping |

## Interactive behaviors

| Behavior | Function | Notes |
|---|---|---|
| Hero slideshow | `heroGo()` | 6.5s auto-advance, arrows + dots + swipe |
| Mobile drawer | `openDrawer()` / `closeDrawer()` | Hamburger menu |
| Cart | `addToCart()` / `renderCart()` | localStorage persistence |
| Checkout | `showCheckout()` / `placeOrder()` | Client-side only, no real payment |
| Truck selector | `openTruckModal()` | Per-brand modal |
| Model detail | `showModelDetail()` | Per-model popup |
| Product detail | `showProductDetail()` | Per-accessory popup |
| Trust bar | `openInfoModal()` | 4 deep-dive topics |
| Standard equipment | `showFeature()` | Per-feature popup |
| Configurator | `configPickSize()` / `configPickBed()` / `configNext()` | Multi-step build-out |
| Testimonial carousel | `carouselGo()` | 7s auto-advance |
| Gallery lightbox | `openLightbox()` / `lbNav()` | Arrow + escape keyboard |
| FAQ accordion | Native `<details>` element | No JS needed |

## Adding a serverless function (future)

When you need a backend (form submission, API key-protected call):

1. Create a file in `/api/`, e.g., `api/submit-inquiry.js`:
   ```js
   export default async function handler(req, res) {
     // req.body has the form data
     // Forward to email provider, DB, etc.
     res.json({ok: true});
   }
   ```
2. Vercel auto-detects + deploys it
3. Call from the page: `fetch('/api/submit-inquiry', {method:'POST', body: JSON.stringify(...)})`

Currently `api/README.md` holds the placeholder.

## SEO

- `<title>` and `<meta description>` match ATC's own website
- Open Graph + Twitter Card for social sharing
- JSON-LD schemas:
  - `LocalBusiness` with address, phone, hours, coordinates
  - `FAQPage` with 7 Q&A for rich results
  - `Product` offers for all 6 camper models (price, description)
- `sitemap.xml` + `robots.txt` for crawlers
- Canonical URL set to `https://allterraincampers.com/`
- All images have `loading="lazy"` and proper `alt` attributes

## Accessibility

- Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<article>`)
- All interactive elements are `<button>` or `<a>` with proper roles
- `aria-label` on icon-only buttons
- Keyboard: ESC closes modals, arrow keys navigate lightbox
- `prefers-reduced-motion` respected — disables all animations + transitions
- Color contrast ratios meet WCAG AA in the palette

## Browser support

Tested in latest Chrome/Safari/Firefox/Edge on Windows, macOS, iOS, Android. Uses:
- CSS Grid + Flexbox (universal)
- CSS Custom Properties (universal)
- `backdrop-filter` (universal; progressive enhancement)
- `aspect-ratio` CSS (universal since 2021)
- ES2020+ JS (optional chaining, nullish coalescing)

No IE11 support — ATC's visitor demographic is modern.

## Known limitations

- **Form submission is a stub** — shows success message without actually emailing. Wire to backend (Phase 1).
- **Checkout is a stub** — doesn't charge real payments. Wire to Stripe/PayPal when ready.
- **Admin panel doesn't exist yet** — all content edits go through GitHub commits. Phase 2 work.
- **No CMS** — adding new products means editing `index.html` (documented in `docs/CONTENT_GUIDE.md`).
- **Facebook Marketplace has no API** — "auto-post to Marketplace" is not technically possible today without approved commerce-partner status. Workaround: generate listing text for manual posting.
- **YouTube API has rate limits** — fine for weekly uploads, not for high-volume automation.
