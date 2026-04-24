# All Terrain Campers — Website

The official source code for **allterraincampers.com** — a modern, mobile-friendly website for All Terrain Campers Inc. of Sacramento, California. Built as a faithful, verbatim refresh of the original site with modern layout, e-commerce, a build-your-camper configurator, and owner-community links.

---

## Quick links

- **Live site (staging):** https://mobilecli.com/camp (will move to `allterraincampers.com` after domain cutover)
- **How to edit content:** see [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — written for non-technical owners, no coding required
- **How to deploy changes:** see [`docs/DEPLOY.md`](docs/DEPLOY.md)
- **Product vision / future features:** see [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## What this is

A **single-file static website** (`index.html`) that runs on any static-file host. No database, no server code, no build step. Just open the file in a browser and it works.

- Built in plain HTML + CSS + JavaScript
- Zero external framework dependencies
- All product photos and hero images self-hosted in `/images/`
- Designed to deploy on Vercel (free tier), Netlify, Cloudflare Pages, or even plain web hosting (GoDaddy, etc.)
- Content is 100% verbatim from All Terrain Campers' published website and FAQs — no invented marketing copy

## What's in each folder

```
all-terrain-campers-website/
├── index.html              ← The entire website (single file)
├── vercel.json             ← Deploy configuration for Vercel
├── README.md               ← You are here
├── .gitignore              ← Files Git should ignore
│
├── images/                 ← All photos used on the site
│   ├── hero-w8.jpg         ← Truck + camper (factory shot)
│   ├── landscape_01-03.jpg ← Owner-rig + interior hero shots
│   ├── popup_01-03.jpg     ← Pop-up sequence (down / midway / up)
│   ├── view_*.png          ← (legacy test files, safe to ignore)
│   │
│   └── products/           ← Shop accessory photos
│       ├── jacks.jpg       ← Happijac manual jacks
│       ├── solar.jpg       ← Renogy 200W panel
│       ├── awning.jpg      ← Fiamma side awning
│       ├── fridge.jpg      ← Dometic NRX 50C
│       ├── furnace.jpg     ← Dometic Mojave 12K BTU
│       ├── fan.jpg         ← Fan-Tastic roof vent
│       ├── rack.jpg        ← Luggage/boat rack
│       ├── steps.jpg       ← Rear wall steps
│       ├── tracks.jpg      ← Yakima tracks
│       ├── converter.jpg   ← 110V shore power converter
│       └── bed.jpg         ← Slide-out bed
│
├── api/                    ← Reserved for future serverless endpoints
│   └── README.md
│
├── admin/                  ← Reserved for future admin panel
│   └── README.md
│
└── docs/                   ← Owner-facing documentation
    ├── CONTENT_GUIDE.md    ← How to edit text, photos, prices (no code)
    ├── DEPLOY.md           ← How to ship changes to the live site
    ├── ROADMAP.md          ← Planned future features
    ├── CONTENT_SOURCES.md  ← Where every piece of text came from (audit trail)
    └── TECHNICAL.md        ← Under-the-hood details for developers
```

## How the site is built (plain English)

- **One HTML file does everything.** Open `index.html` in any browser and the full site renders. No compile step.
- **Pictures come from the `images/` folder.** If you want to change a photo, replace the file in `images/` with the same filename — the site picks up the new version automatically.
- **Product data (the shop) lives inside `index.html`** in a JavaScript list called `PRODUCTS` near the bottom of the file. You can edit product names, prices, and descriptions directly.
- **Model data (the campers) also lives inside `index.html`** in a JavaScript object called `MODELS`. Same pattern.
- **FAQs and press articles** are written as plain HTML — you can type over any of them.

See [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) for click-by-click instructions.

## How the site gets online

Two steps:

1. **You commit your changes** (save them to GitHub). Anyone with access to this repo can do this.
2. **Vercel automatically re-deploys** the live website within about 30 seconds.

See [`docs/DEPLOY.md`](docs/DEPLOY.md) for the full walkthrough.

## Features currently built

- ✅ Responsive single-page design (phones, tablets, desktops)
- ✅ Auto-rotating hero photo slideshow (5 photos) with swipe + arrows + manual dots
- ✅ Top sticky navigation with phone number always visible
- ✅ Floating "Call Us" button that's always on screen
- ✅ Every model (Cougar, Puma, Panther, Ocelot, Bobcat, Lynx, Shell) has its own detail page with floor plan, full spec table, and verbatim descriptions
- ✅ "Find My Camper" configurator — truck size → bed length → model match → options build-out with live price total
- ✅ Full shop with 12 accessories, product detail modal, cart, checkout flow, and order confirmation
- ✅ Clickable truck brand selector (Ford, Chevrolet, RAM, Toyota, GMC, Nissan, Jeep)
- ✅ Press & Owner Stories section with 5 real articles + 4 forum links
- ✅ Social media hub (Instagram, Facebook page, Marketplace, Owners Group, YouTube)
- ✅ Embedded public YouTube video
- ✅ 17 FAQs verbatim from their website
- ✅ 24+ standard equipment items with clickable detail popups (with photos + verbatim descriptions)
- ✅ Refurbishment/Four Wheel Campers service section
- ✅ Pre-built availability callout (verbatim)
- ✅ Testimonials carousel (5 owners)
- ✅ Build quality gallery with lightbox (22 photos)
- ✅ Google Maps embed of the Sacramento factory
- ✅ Inquiry form
- ✅ SEO schema markup (LocalBusiness, FAQPage, Product Offers)
- ✅ sitemap.xml + robots.txt for search engines

## Features planned (not yet built)

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the phased plan.

- 🔜 Real form submission (currently shows success message only — needs backend endpoint)
- 🔜 Admin login panel — edit site without code
- 🔜 AI-assisted content maintenance (autonomous updates)
- 🔜 Facebook Marketplace listing automation
- 🔜 YouTube channel integration (upload + comment management)
- 🔜 Community forum + buy/sell/trade
- 🔜 Real payment processing (Stripe or PayPal live)

## Technical details

- **Framework:** None. Plain HTML/CSS/JS.
- **Hosting:** Vercel (free tier sufficient for current traffic)
- **Domain:** allterraincampers.com (to be pointed at Vercel after cutover)
- **SSL:** Automatic via Vercel
- **Analytics:** Not yet installed. Recommend Plausible or Google Analytics.
- **Forms:** Client-side only. For live submissions, wire to Formspree, Vercel serverless, or ConvertKit.

See [`docs/TECHNICAL.md`](docs/TECHNICAL.md) for more.

## Contact / Support

For changes to the site, first check [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — most edits don't require a developer.

For technical issues or new features, contact your developer.

---

© All Terrain Campers, Inc. · 4391 Pell Dr., Suite E · Sacramento, CA 95838 · (800) 446-1003
