# Technical Reference

For developers who need to understand, modify, or extend the site.

---

## Architecture

**Type:** Static site with three plain-text source files (HTML + CSS + JS), no build step, no framework, no bundler.

**Layout:** standard separation of concerns &mdash; markup in `index.html`, presentation in `css/main.css`, behavior in `js/app.js`. Every change to one of those three files takes effect on the next deploy.

**Total wire weight:** ~96 KB HTML + ~65 KB CSS + ~76 KB JS + ~1 MB images (all images compressed + self-hosted).

**Load performance:** First Contentful Paint under 1s on a decent 4G connection. JS is loaded with `defer` so it doesn't block render.

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
├── index.html               — HTML markup only; references css/ and js/
├── css/
│   └── main.css             — all styles (theme, layout, sections, components)
├── js/
│   └── app.js               — all behavior (data + render + handlers + init)
│
├── vercel.json              — deploy config + cache headers
├── robots.txt               — search engine directive
├── sitemap.xml              — SEO sitemap
├── .gitignore
│
├── images/                  — all static images
│   ├── hero-w8.jpg
│   ├── landscape_01-03.jpg
│   ├── popup_01-03.jpg
│   └── products/            — accessory shop thumbnails
│
├── api/                     — reserved for serverless functions (future)
├── admin/                   — reserved for admin panel (future)
└── docs/                    — owner + developer docs
    ├── CONTENT_GUIDE.md     — non-technical owner content edits
    ├── DEPLOY.md            — deploy + DNS + rollback runbook
    ├── ROADMAP.md           — phased future feature plan
    ├── CONTENT_SOURCES.md   — verbatim-content audit trail
    └── TECHNICAL.md         — this file
```

The three source files are deliberately small and orthogonal: HTML names every visible element, CSS styles them, JS animates them. There is no build step. Edit any of the three and the next deploy reflects the change. (Vercel serves them as static assets with the cache headers in `vercel.json`.)

## Key code regions in `index.html`

The HTML is plain semantic markup. Section banners use the form `<!-- ============== NAME ============== -->` and are easily searched:

| Marker | Region |
|---|---|
| `<!-- ============== ANNOUNCEMENT BAR` | Top phone/social strip |
| `<!-- ============== MAIN NAV` | Sticky header + persistent "Build My Camper" CTA |
| `<!-- ============== MOBILE DRAWER` | Hamburger drawer |
| `<!-- ============== HERO` | Hero slideshow + headline |
| `<!-- ============== LEAD-TIME STATUS STRIP` | Verbatim "building to order" banner |
| `<!-- ============== TRUST BAR` | 4 clickable trust topics |
| `<!-- ============== SUPPORTED TRUCKS` | Truck brand selector |
| `<!-- ============== WHY ATC — HONEST COMPARISON` | 7-row competitor comparison |
| `<!-- ============== BUILD & PRICE` | "Find My Camper" configurator |
| `<!-- ============== FEATURED MODELS` | 3 hero model cards + full model grid |
| `<!-- ============== SHOP` | Product grid + cart entry |
| `<!-- ============== COLD WEATHER PACK` | CWP deep-dive |
| `<!-- ============== REFURBISHMENT` | Refurb + Four Wheel Campers mention |
| `<!-- ============== DELIVERED-PRICE CALCULATOR` | Distance-based delivered total |
| `<!-- ============== ADVENTURE GALLERY` | Build photos + lightbox |
| `<!-- ============== TESTIMONIALS CAROUSEL` | 5 owner testimonials |
| `<!-- ============== PRICING` | Pricing tables (campers, shells, options, refurb) |
| `<!-- ============== FAQ` | Accordion of 17 verbatim FAQs |
| `<!-- ============== PRESS & COMMUNITY HUB` | Press articles + forum cards + Wander the West quote |
| `<!-- ============== SOCIAL HUB` | YouTube embed + video gallery slots + IG/FB cards |
| `<!-- ============== LOCATION / MAP / FACTORY VISIT` | Map + verbatim "please call" invite |
| `<!-- ============== CONTACT FORM` | Inquiry form (stub — wire to backend on purchase) |
| `<!-- ============== FOOTER` | 5-column footer |
| `<!-- ============== TRUCK MODAL` | Per-brand detail popup |
| `<!-- ============== INFO MODAL` | Trust-bar deep-dive popup |
| `<!-- ============== SHOP MODAL` | Product detail + checkout flow |
| `<!-- ============== MODEL DETAIL MODAL` | Per-model detail popup |
| `<!-- ============== CART DRAWER` | Shopping cart slide-in |
| `<!-- ============== LIGHTBOX` | Full-screen image viewer |

## Key code regions in `css/main.css`

CSS section banners use `/* ============== NAME ============== */` &mdash; same convention. Search for any of the HTML region names above to find its styles.

The first region of `main.css` declares the theme custom properties:

```css
:root{
  --bg:#faf8f4; --bg-1:#f2ecdd; --bg-2:#ede5d1; --bg-3:#e4dbc3;
  --ink:#1c1f24; --ink-dim:#3a3c40; --mute:#7e8085;
  --cta:#e89463; --cta-2:#c26139; --rule:rgba(0,0,0,.10);
  --f-disp: 'Cinzel', Georgia, serif; --f-body: -apple-system, sans-serif;
  /* ... */
}
```

To rebrand, change the values in `:root` &mdash; every section uses these variables.

## Key data structures in `js/app.js`

The application is organized in a single file with section banners (`/* ================ NAME ================ */`):

| Section | Purpose |
|---|---|
| `DATA` | The eight content arrays below |
| `RENDER` | Functions that inject data into the DOM at page load |
| `CART` | `addToCart`, `renderCart`, `removeFromCart`, `changeQty`, checkout flow |
| `DRAWER` | `openDrawer` / `closeDrawer` (mobile hamburger) |
| `CAROUSEL` | Testimonial carousel auto-advance + manual nav |
| `LIGHTBOX` | Photo gallery full-screen viewer |
| `CONFIGURATOR` | "Find My Camper" multi-step build-out |
| `TRUCK MODAL` | Per-brand detail popups |
| `INFO MODAL` | Trust-bar verbatim deep-dives |
| `MODEL DETAIL MODAL` | Per-camper detail popups |
| `HERO SLIDESHOW` | Auto-rotating hero photos |
| `DELIVERED-PRICE CALCULATOR` | `computeDelivered()` — pure function |
| `INIT` | Bootstrap calls at page load (renderShop, renderGallery, etc.) |

The eight ATC-content arrays:

| Variable | Content |
|---|---|
| `PRODUCTS` | 12 shop accessories (name, price, desc, specs) |
| `MODELS` | 7 camper models (cougar, puma, panther, ocelot, bobcat, lynx, shell) with verbatim ATC quotes + spec tables |
| `GALLERY` | 22 build/lightbox photos |
| `TESTIMONIALS` | 5 verbatim owner letters with `[...]` cuts marked |
| `TRUCKS` | 7 truck-brand detail blocks |
| `INFO` | 4 trust-bar deep-dive topics with verbatim ATC blockquotes |
| `FEATURES` | 26 standard-equipment entries (mode 1: verbatim quote · mode 2: label-only when ATC has no description) |
| `CFG_RESULTS` | Configurator truck-bed-size → recommended-model mapping |

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
