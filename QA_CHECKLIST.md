# Pre-sale browser QA checklist

Run this in a real browser before any sale demo. The static + automated audits in `AUDIT_2026-04-24.md` and `STRATEGY_AUDIT.md` cover everything that can be verified without a running browser; this document covers everything that can't.

Total time: ~20 minutes for the full pass. Re-run after any non-trivial change.

---

## Setup

1. Deploy the latest `main` branch to a Vercel preview URL (`vercel deploy` from the repo root, or push and let auto-deploy run).
2. Open the preview URL in **three** browsers in parallel:
   - Desktop Chrome (latest), at 1440×900
   - iOS Safari on iPhone 14 / 15 (or Safari with iPhone preset in DevTools), 390×844
   - Android Chrome on a real phone or emulator, 360×640 or 412×915

Most issues that escape automated audits are mobile-only or browser-specific.

---

## Desktop Chrome — first pass

### Hero

- [ ] Hero photo loads within 2 seconds; first photo is `landscape_02.jpg`.
- [ ] Hero slideshow auto-advances every ~6.5 seconds.
- [ ] Left/right arrows navigate manually.
- [ ] Five dots at the bottom each jump to the corresponding slide.
- [ ] Clicking the hero opens the lightbox at full resolution.
- [ ] H1 reads exactly: *"We Produce Strong, Light-Weight, Welded Aluminium Frame Slide-In 4x4 Campers... Built to Survive!"* — preserving British "Aluminium," lowercase x, three dots, exclamation point.
- [ ] Eyebrow above H1 reads: *"Factory Direct · Built in Sacramento, California · Over 50 Years of Experience"*.
- [ ] "Build My Camper" button (top-right of nav, CTA-colored) scrolls to `#config`.
- [ ] "Find My Camper →" button in hero scrolls to `#config`.

### Lead-time strip (just below hero)

- [ ] Pulsing orange dot animates.
- [ ] Quote reads: *"Currently building to order. 'Please call us to see if we have any new campers in production for you to look at.'"*
- [ ] Phone CTA on the right calls 1-800-446-1003 when clicked.

### Trust bar

- [ ] All 4 click-through items open INFO modal.
- [ ] Each modal: × button closes, Escape closes, click on backdrop closes.
- [ ] Construction modal includes Clark's quote — verify the sentence *"I know both of them would be giving me high fives if they were alive to see this camper."* is present (it was missing in the pre-audit version).

### Truck-brand selector

- [ ] All 7 brands (Ford, Chevrolet, RAM, Toyota, GMC, Nissan, Jeep) open detail modals.
- [ ] Each modal closes via × / Escape / backdrop click.

### "Why ATC" comparison table (`#why`)

- [ ] All 7 rows render in a grid layout on desktop.
- [ ] ATC column is highlighted in CTA color.
- [ ] Footer cites all four source URLs (allterraincampers.com, fourwheelcampers.com, hallmarkrv.com, supertrampcampers.com) — links open in new tabs.

### Find My Camper configurator (`#config`)

- [ ] Step 1 (Truck Size) — both options selectable.
- [ ] Step 2 (Bed Length) — appears after step 1 selection.
- [ ] Step 3 (Model match) — recommended model card renders with a price.
- [ ] Step 4 (Options) — 12 accessory checkboxes with prices; live total updates as toggled.
- [ ] Step 5 (Quote) — scrolls to contact form, options carry over.
- [ ] "Reset" button restarts the flow.

### Models grid (`#models`)

- [ ] All 7 model detail modals (cougar, puma, panther, ocelot, bobcat, lynx, shell) open.
- [ ] Each modal renders: photo, full spec table, verbatim ATC quotes, price, shell-price.
- [ ] Verify Bobcat dimensions render as `78"X69"` (uppercase X, no space) — the verbatim form.
- [ ] Verify Shell-weight quote shows ATC's "weight" typo preserved verbatim.

### Shop (`#shop`)

- [ ] All 12 product cards render with photo, name, price.
- [ ] Click → product detail modal opens.
- [ ] Add to Cart updates the cart badge in the top nav.
- [ ] Cart icon (top right) opens the cart drawer.
- [ ] Quantity +/- buttons work.
- [ ] Remove button works.
- [ ] Checkout button shows the order-confirmation placeholder.
- [ ] Cart persists across hard reload (`Ctrl+R`) — verify localStorage.

### Cold Weather Pack section (`#cwp`)

- [ ] Verbatim CWP description renders.
- [ ] Photo loads and is clickable to open lightbox.

### Refurbishment section (`#refurb`)

- [ ] Verbatim Four Wheel Campers refurbishment quote renders.
- [ ] All 6 service prices visible.

### Delivered-price calculator (`#delivered-price`)

- [ ] Default model loads with $20,995 base price.
- [ ] Changing model updates the base price.
- [ ] Entering miles updates the shipping cost (×$1.50) and delivered total.
- [ ] Reference distances in the help text render correctly with non-breaking spaces.

### Adventure Gallery (`#gallery`)

- [ ] All 22 photos load.
- [ ] Click any photo → lightbox opens at full size.
- [ ] Lightbox arrow keys (← →) navigate.
- [ ] Escape closes the lightbox.

### Testimonials carousel (`#reviews`)

- [ ] Carousel auto-advances every ~7 seconds.
- [ ] Manual arrows + dots work.
- [ ] Each testimonial begins with verbatim ATC text — visible `[...]` cuts mark every omission.
- [ ] Marc's quote shows "1300 plus mile" (no comma — ATC's exact rendering).

### Standard Equipment list (`#features`)

- [ ] All 26+ items render as clickable list rows.
- [ ] Items with verbatim quotes (sink, stove, fire extinguisher, etc.) open with `<blockquote class="verb">` and "Source: verbatim" footer.
- [ ] Items ATC lists as bullet-only labels (Monitor panel, LED lights, Curtains, etc.) open WITHOUT a quote block — instead show "Listed on the All Terrain Campers Standard Features page as a standard-equipment bullet. ATC does not publish a separate written description for this item."

### Pricing tables (`#pricing`)

- [ ] Camper prices: Panther/Ocelot $20,995, Cougar/Puma $21,350, Bobcat $21,570, Lynx $21,925.
- [ ] Shell prices: standard $13,300, Bobcat/Lynx shell $13,875, Custom Flatbed Shell $18,250.
- [ ] All 23 camper options listed with prices.
- [ ] All 10 shell interior options listed with prices.
- [ ] All 6 refurbishment service prices listed.
- [ ] "Building to order" callout box renders with verbatim ATC quote.

### FAQ (`#faq`)

- [ ] All 17 FAQs accordion-expand on click.
- [ ] FAQ 7 ends with: *"Here is a page with customer photos that show long bed campers on short bed trucks."*
- [ ] FAQ 10 reads: *"…We currently change $1.50 a mile to ship one way."* (typo "change" preserved).
- [ ] FAQ 14 (care) renders **all 7 paragraphs** including: clamps paragraph, turnbuckles paragraph, 300–400 mile check paragraph, and the closing used-camper-call-us paragraph.

### Press & Community (`#press`)

- [ ] All 5 press cards open external links in new tabs.
- [ ] Wander the West community pull-quote renders the verbatim ATC homepage text.
- [ ] All 4 forum cards link out.

### Social hub + video gallery (`#social`)

- [ ] YouTube video embed (MQ6bDc9OMQU) loads and plays.
- [ ] All 4 "content slot" placeholder tiles render with their dashed border style.
- [ ] Each placeholder shows "Awaiting ATC footage" as the bottom tag.
- [ ] All 5 social channel cards (Instagram, Facebook, Marketplace, Group, YouTube) link out.

### Factory Visit + Map (`#visit`)

- [ ] Verbatim "please call" quote renders.
- [ ] Google Maps iframe loads showing 4391 Pell Dr.
- [ ] Address, phone, fax, email, hours, shipping rate all render.
- [ ] "Call to schedule a visit" button opens phone dialer.
- [ ] "Email to schedule" button opens mail client with pre-filled subject/body.

### Contact form (`#contact`)

- [ ] Form renders.
- [ ] Submitting required fields shows the success state.
- [ ] **Verify the success message does not falsely promise email delivery** — the form is currently a stub. The buyer's developer wires the backend after purchase.

---

## Mobile (iOS Safari + Android Chrome)

Repeat the desktop pass with these additional checks:

- [ ] Mobile breakpoint: nav collapses to hamburger at <900px width.
- [ ] Hamburger drawer slides in from the right; backdrop dims the page.
- [ ] Drawer close (× and outside-tap) both work.
- [ ] All drawer links scroll to the right anchor and close the drawer.
- [ ] Hero slideshow swipe gesture (left/right drag) works.
- [ ] Cart drawer doesn't conflict with the hamburger drawer (one closes the other).
- [ ] "Why ATC" comparison table reformats into per-feature stacked cards on narrow screens; ATC column heading is highlighted.
- [ ] Lightbox photos pinch-zoom.
- [ ] Configurator full flow completable with thumb-only scrolling.
- [ ] All modal close buttons reachable with thumb (top-right thumb zone).
- [ ] Phone-call buttons trigger the native phone app, not a popup.

---

## Cross-browser DevTools

- [ ] Console: no errors on page load.
- [ ] Network: no 404s in the static-asset list.
- [ ] Both `/css/main.css` and `/js/app.js` load successfully.
- [ ] Lighthouse (Chrome DevTools Audits) targets:
  - Performance: ≥90
  - Accessibility: ≥95
  - Best Practices: ≥90
  - SEO: ≥95
- [ ] Run **Google Rich Results Test** on the production URL: https://search.google.com/test/rich-results
  - Should validate **LocalBusiness**, **FAQPage**, and **ItemList/Product** schema with no errors.

---

## Dependency-free quick smoke test (no browser)

If you only have 2 minutes:

```sh
cd all-terrain-campers-website
node --check js/app.js                       # JS syntax check
python3 -c "
import re
h = open('index.html').read()
ids = set(re.findall(r'id=\"([^\"]+)\"', h))
anchors = set(re.findall(r'href=\"#([^\"]*)\"', h))
broken = [a for a in anchors if a and a not in ids]
print('IDs:', len(ids), 'anchors:', len(anchors), 'broken:', len(broken))
"                                            # broken-anchor check
ls images/ images/products/ | wc -l           # image count
```

Expected output: JS parse should be silent (no error), broken should be `0`, image count should be ~24.

---

## Sign-off

When every checkbox passes, sign here:

- Reviewer: ____________________________
- Date: _______________
- Browser stack: Chrome ___ · iOS ___ · Android ___
- Issues found: 0 · _____ (count + filed in repo issues)

Only after this sign-off should the demo be given to the prospective buyer.

— QA checklist generated 2026-04-24.
