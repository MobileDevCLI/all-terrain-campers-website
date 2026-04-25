# Content Sources — Where Every Piece of Text Came From

This is the audit trail. For every non-trivial piece of copy on the site, this document records where it was sourced from. If you're ever asked "did you make this up?" the answer is here: no, we didn't.

**Policy:** Every passage on this site that is presented as All Terrain Campers' own words — inside a `<blockquote class="verb">`, attributed to a named ATC customer, or rendered as a quoted model spec — is pulled **verbatim** from `allterraincampers.com` (scraped 2026-04-24 10:48 PDT; confirmed identical to live site via spot-check the same day). Testimonial length-cuts are marked with a visible `[...]` so the reader knows text was omitted; the words on either side of the cut are ATC's exact words, not a rewrite. No invented claims. No synthetic reviews. No paraphrasing in quote blocks.

Items where ATC publishes no description (bullet-list labels on the Standard Features page) are rendered as labels with an honest note that ATC does not publish a description — the site does not fabricate one.

Developer-written copy (shop product descriptions, spec-table labels, CTA buttons, nav labels, section headings, SEO meta tags) stands as the developer's voice and is **not** wrapped in verbatim markup.

For the audit that produced this policy, see `../AUDIT_2026-04-24.md`.

---

## Hero section

- **Tagline** *("Strong, Light-Weight, Welded Aluminum Frame Slide-In 4×4 Campers... Built to Survive.")* → allterraincampers.com homepage, verbatim
- **Lede paragraph** *("We produce the lightest weight, lowest profile, and most durable pop-up campers on the market today...")* → homepage, verbatim
- **Stats (50+ Years / 7 Models / 1 Factory)** → homepage + our-campers page + contact page

## Trust bar (4 click-through topics)

| Topic | Source |
|---|---|
| **50+ Years Experience** | homepage + standard-features page ("built by campers for campers"). Verbatim blockquotes only. |
| **Welded Aluminum (Construction)** | standard-features page. All blockquotes verbatim, including "particle or pressboard" line + Clark's testimonial from homepage. |
| **Factory Direct** | FAQ page — all blockquotes pulled directly from ATC's answers. |
| **Custom Built** | FAQ + standard-features + contact-us pages. All verbatim. |

## Truck brand selector (Ford, Chevy, RAM, Toyota, GMC, Nissan, Jeep)

- Model-to-truck-bed mapping → **FAQ page** verbatim ("What Camper Will Fit My Truck?")
- GMC modal references ATC's own mention of Four Wheel Campers → **our-campers page** verbatim
- Jeep modal quotes ATC's custom-work FAQ

## Camper model detail pages (Cougar, Puma, Panther, Ocelot, Bobcat, Lynx, Shell)

Each model shows only verbatim content from our-campers.html:

- Floor plan captions: "Cougar/Puma Floor Plan — Long Bed Trucks", "Panther/Ocelot Floor Plan / Short Bed Full-size Truck", "Bobcat Floor Plan - Mid/Small Trucks - 6' Bed", "Shell Model Floor Plan (Ocelot Shown)"
- Dimensions (floor/roof/width) → our-campers page, verbatim
- Couch dimensions (including "(28" extended)" annotations) → our-campers page
- Upper/overhead bed sizes (including slide option) → our-campers page
- *"The bottom bed can sleep one person comfortably or two (if friendly)."* → our-campers page, Panther/Ocelot section
- Weight range *"895 pounds – 1200 pounds"* + shell weight *"560 pounds – 1200 pounds"* → pricing-and-options page
- Roof load *"1000 pounds of snow weight in the up position"* → FAQ page
- Truck fit lists → FAQ page
- Shell equipment list ("Large passenger side window, Finished floor, Interior walls...") → our-campers page
- Shell interior options with prices → pricing-and-options page

## Shop accessories (12 products)

- **Names and prices** — pulled directly from pricing-and-options page:
  - Mechanical Jacks Set of 4 — $975
  - Solar Panel 200W Renogy — $1,095
  - Fiamma Awning 8 Foot Side — $1,600
  - Cold Weather Pack — $950
  - Dometic Refrigerator NRX 50C — $1,050
  - Dometic Automatic Furnace 12,000 BTU — $995
  - Slide Out Bed Cougar/Panther/Ocelot — $575
  - Luggage & Boat Rack — $395
  - Fantastic Fan 3 Speed Roof Vent — $325
  - Rear Wall Steps — $275
  - Yakama Tracks 108" — $495
  - 110 Volt System w/Converter — $650
- **Technical specs** — publicly-known manufacturer data (Renogy, Dometic, Fiamma, Yakima, Fan-Tastic, Happijac, Progressive Dynamics)
- **Product photos** — sourced from Amazon product listings + manufacturer sites, self-hosted in `/images/products/`
- **Cold Weather Pack description** — allterraincampers.com FAQ, verbatim blockquote included

## Standard Equipment — clickable items

**Policy (post-2026-04-24 audit):** items render in one of two modes depending on what ATC has actually published about each.

**Mode 1 — Verbatim quote.** Items where ATC publishes a standalone written description, or where the item appears inside one of ATC's multi-item sentences. Each shows a `<blockquote class="verb">` of ATC's exact words, with source attribution:

- **Stove:** "The stove is a 2 burner, flush mount with a protective glass top lid. The lid folds down when not in use, protecting the stove and giving you a usable, flat surface."
- **Sink:** "Stainless steel sink and foldable faucet.  Comes with electric water pump."
- **12V outlet with USB:** "A 12-volt outlet w/USB is standard in each model camper. Located in the cabinet to the right of the sink, you can plug in an appliance and set it on top of the icebox. Another outlet can be added to the camper in the front of the cabinet. Storage in cabinet."
- **Fire extinguisher & smoke alarm:** "Each camper comes with a fire extinguisher and a smoke alarm. Hopefully, you'll never have to use the extinguisher."
- **Generous storage:** "A generous amount of storage space in the cabinet and under the couch."
- **Welded aluminum frame:** "Every camper is built with an aluminum frame that is made to flex with your truck bed without coming apart as most camper frames do over time."
- **Materials pride (no particle or pressboard):** "Everyone at All Terrain Campers takes a lot of pride not only in our workmanship but also in the materials we use to build your camper. That's why you will never find any particle or pressboard in our campers."
- **Overhead bed:** "Our standard bed extends 48\" over your cab and has a very comfortable 4\" thick mattress. The bed's overall size varies with the model."
- **Built by campers for campers:** "When you purchase an All-Terrain camper, you are buying a camper built by campers for campers. We use the campers we build... all the time!"
- **Marine/RV Deep-Cycle battery / Screen door with deadbolt / Front picture window** — each shows ATC's composite sentence: "Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window."
- **20-pound propane tank / 15-gallon water tank with monitor panel / 4 corner jack brackets / Roof Struts / Pre-wired for Solar Panel** — each shows ATC's full standard-features paragraph where that item is named, verbatim.
- **Portable table / Lower couch that makes into a bed / Storage in cabinets and under couches** — each shows ATC's "Standard features include…" sentence where that item is named.

**Mode 2 — Label only, no quote.** Items ATC lists only as bullet labels (no written description). Render shows the label and an honest note: *"Listed on the All Terrain Campers Standard Features page as a standard-equipment bullet. ATC does not publish a separate written description for this item."* **Nothing is invented and placed inside quote marks.** Items in this group: Monitor panel · Inside and Porch LED lights · LED Marker lights · Large passenger side window · Curtains · 5-gallon propane tank · Drawer in cabinet · Roof vent · CO and LP monitor Alarm.

**What changed vs the original build:** the original FEATURES array rendered every item inside a `<blockquote class="verb">` with a "Source: verbatim" footer regardless of whether ATC had actually published a description — about 18 of the 26 items had developer-written marketing copy presented as ATC's words. This was caught and fixed 2026-04-24. Full line-by-line record in `AUDIT_2026-04-24.md`.

## FAQ section (17 questions)

100% verbatim from allterraincampers.com/faq. Including the small typo ("change" not "charge" in the shipping cost answer) — we preserved it rather than silently correcting, because the site should look like ATC's own voice.

Unique phrases verified present:
- "never had a customer complain" (negotiable)
- "understand our position" (install yourself)
- "change $1.50 a mile" (shipping — typo intentional, matches source)
- "rub on the edge" (care FAQ)
- "proud of the fact" (warranty)

## Testimonials (5 owners, carousel)

All verbatim from allterraincampers.com homepage:
- **Marc** — Cougar owner, 1,300-mile Sierras/Coast trip
- **Pat & Carolin** — rough roads / steep hills / turnbuckles
- **George** — Bobcat owner, Toyota Tacoma
- **Dan** — Baja trip + rescue story
- **Clark** — aerospace-quality workmanship letter

Author photos also sourced from ATC's CDN.

## Press & Owner Stories (5 articles + 4 forums)

All external — verified live April 2026:

- **Truck Camper Magazine** "All Terrain Camper Total Build Out" (Sept 2024)
- **ski3pin.blogspot.com** "11 Years · 169,000 Miles · 907 Nights" (Oct 2024) 
- **ski3pin.blogspot.com** "A Fresh Bobcat on a 2021 Ford Ranger" (Oct 2024)
- **overthelandwego.com** "Why the All Terrain Camper?"
- **manystepsmakemountains.com** "Bobcat on a Tacoma"
- **Wander the West** — official ATC subforum + April 2024 shop visit thread
- **Expedition Portal** — Cougar review + Panther thread

## Social media links

- **Instagram** @allterraincampers → verified: 1,053 followers, 24 posts (Sept 2025)
- **Facebook Page** facebook.com/61584007975323/ → verified live business page
- **Facebook Marketplace** → search query for "all terrain camper" (they post there)
- **Facebook Group** facebook.com/groups/684114249419188/ → customer-run ATC owners community
- **YouTube embed** → `MQ6bDc9OMQU` (public, verified via YouTube oEmbed API)

## Contact info

All from allterraincampers.com/contact-us page:
- 1 (800) 446-1003 · (916) 565-1600 · Fax (916) 565-1007
- atc@allterraincampers.com
- 4391 Pell Dr., Suite E, Sacramento, CA 95838
- Mon-Fri 8 AM – 5 PM
- Shipping: $1.50 per mile (from FAQ)

## Refurbishment section (Four Wheel Campers mention)

ATC mentions Four Wheel Campers themselves on our-campers page: *"We refurbish, repair, upgrade not only our own All Terrain Campers but Four Wheel campers (up to 2005) as well. We have worked on Four Wheel campers for years and are very familiar with them."*

This is used verbatim, attributed to ATC's own page. No competitive claims invented.

## Pre-built availability callout

Exact quote from standard-features page: *"We currently are building to order. Please call us to see if we have any new campers in production for you to look at."*

## Pricing & Options tables

100% verbatim from allterraincampers.com/pricing-and-options:
- Fully-equipped camper prices ($20,995 – $21,925)
- Shell model prices ($13,300 / $13,875 / $18,250)
- 23 camper options with prices
- 10 shell interior options with prices
- 6 refurbishment services with prices

---

## What is NOT from their site

A small number of UI-only elements were authored by the developer (not from ATC's content):
- Section headings ("Built to survive any terrain", "Follow the build", etc.) — descriptive, not factual claims
- Call-to-action button text ("Find My Camper", "Request Quote", "Add to Cart")
- The "★ FOLLOW US ON" label above hero social icons
- Navigation labels (Campers / Shop / Build & Price / Gallery / FAQ / Contact)
- The generic spec labels that don't have a direct ATC equivalent (e.g., "Roof Load (up position)" — the source says "The roof is designed to hold 1000 pounds of snow weight in the up position" which we've quoted verbatim in the detail popups; the table uses a short label for readability)

These are standard web conventions, not claims about the product.

---

**Last audit:** April 2026. Re-audit whenever allterraincampers.com is materially updated.
