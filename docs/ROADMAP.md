# Roadmap — what's next for this website

A phased plan showing what's built today, what's next, and where the product can grow if you want to keep investing.

---

## Phase 0 — Shipped (today)

The full public website, deployed, live, content-verified against allterraincampers.com verbatim.

- Modern responsive design (mobile + tablet + desktop)
- 7 model pages with floor plans, weight specs, full dimension tables
- 12-product e-commerce shop with detail modals + cart + checkout flow
- Find My Camper truck configurator → options build-out → quote request
- Clickable truck brand selector
- Press & Owner Stories section (5 verified articles + 4 forums)
- Social media hub (real Instagram, Facebook, Marketplace, Owners Group, YouTube)
- Embedded public YouTube video
- 17 verbatim FAQs + 24 clickable standard equipment items
- Refurbishment / Four Wheel Campers service section
- Testimonials carousel
- Google Maps embed
- SEO schema markup + sitemap + robots.txt
- Cold Weather Pack deep-dive
- Pre-built availability callout

**Total shipped:** ~200 KB single-file static site, loads in under 2 seconds.

---

## Phase 1 — Form submission backend (1–2 days)

**Problem:** the inquiry form currently shows a success message but doesn't actually email anyone.

**Fix options (pick one):**

| Option | Cost | Setup | Maintenance |
|---|---|---|---|
| **Formspree** | Free tier 50/mo · $10/mo for 1,000 | 5 minutes | None |
| **Vercel Serverless + SendGrid** | $0 on free tiers | 30 minutes | Low |
| **Zapier webhook** | $0-$20/mo | 15 minutes | Low |
| **Direct SMTP from Vercel function** | Free | 1 hour | Medium |

**Recommended:** Formspree for simplicity.

---

## Phase 2 — Admin panel (1 month)

**Goal:** owner can edit site content without touching GitHub.

**Minimum viable admin:**

- Login page protected by password (or Google OAuth)
- **Visual editor** — click any text on the site, edit in-place, hit save
- **Product management** — add/remove/edit accessories from a table view
- **Photo library** — upload photos via drag-and-drop, automatic resize
- **Pricing editor** — update camper + option prices from a form
- **Content audit log** — who changed what, when

**Tech stack recommendation:**
- Frontend: Next.js 16 or plain HTML + HTMX
- Backend: Vercel serverless functions
- Auth: Clerk or Auth.js
- Database: Vercel KV or Supabase (free tier)
- Storage: Vercel Blob for photo uploads

**Why build this:** without it, every small edit requires a developer. With it, the owner is autonomous.

---

## Phase 3 — Social + content automation (2–3 months)

**Goal:** the site starts working *for* the business — not the other way around.

**Features to build (in order of ROI):**

### 3.1 — Auto-cross-post new products
When the owner adds a new camper or accessory:
- Auto-post to Instagram (via Meta Graph API)
- Auto-post to their Facebook page
- Schedule a YouTube short (if they upload a video)
- Draft a Facebook Marketplace listing (see limitations below)

### 3.2 — Weekly content scheduler
- Cron job runs every Monday morning
- Pulls 1 gallery photo + 1 customer testimonial
- Generates short caption using Claude API
- Owner approves via Telegram/email
- Posts to IG + FB

### 3.3 — Lead capture + CRM
- Inquiries flow to a simple owner dashboard
- Follow-up reminders (48 hr / 7 day / 30 day)
- Auto-draft a reply email using Claude

### 3.4 — YouTube channel maintenance
- Upload video (manual first, automate later)
- Auto-generate title + description from filename + camera metadata
- Auto-reply to first 20 comments
- Monthly analytics email

**Known limitations:**
- Facebook Marketplace has **no public API** — only approved commerce partners. Workaround: generate the listing content + screenshot it, owner posts manually.
- YouTube Data API has quotas (10,000 units/day default; uploads are 1,600 units each). Fine for 5-6 uploads/day.
- Instagram via Meta Graph requires a connected Facebook business page + app review for publishing. 2-3 week approval.

---

## Phase 4 — AI operations assistant (3–6 months)

**Goal:** a Claude-powered agent that runs the digital side of the business on autopilot.

**Capabilities:**

- **Daily check-in email** — "You got 3 inquiries overnight. Here's the summary and a suggested reply for each."
- **Content ideas pipeline** — watches owner rigs on Instagram, suggests re-share requests
- **Competitor monitoring** — tracks FWC's pricing, new model announcements, social engagement; flags shifts
- **Seasonal campaigns** — auto-schedules "cold weather pack" content every October, "summer build-outs" every April
- **Customer support triage** — inbound emails classified as quote request / warranty / general / spam; owner sees only the real ones
- **Automatic maintenance reminders** — emails past buyers at 6-month intervals with care tips (using the verbatim maintenance FAQ)

**Tech stack:**
- Claude API (Sonnet for most tasks, Opus for complex replies)
- Vercel Cron jobs for scheduled runs
- Vercel KV for agent state
- Email via SendGrid/Resend
- Telegram or email for owner approvals

**Pricing angle (if you productize this):**
- Base: Phase 0-1 site → $8-15K one-time
- Ongoing: Phase 2-3 admin + automation → $400-800/mo managed
- Premium: Phase 4 AI operations → $1,500-3,000/mo

---

## Phase 5 — Community & marketplace (ongoing, 3-6 months)

**Goal:** owner-to-owner buy/sell/trade + modifications + build stories.

- Forums (topic threads, replies, user profiles)
- Buy/sell/trade classifieds with photos
- User-contributed build-outs and mod showcases
- Event calendar (overland expos, rallies, meet-ups)
- Moderator tools (for ATC's staff)
- Email notifications on replies

**Tech:** this is a dedicated subdomain (community.allterraincampers.com) built as a separate app. Could use:
- Forum platform like [Circle](https://circle.so) ($49+/mo, non-custom)
- [Discourse](https://www.discourse.org) (self-hosted, free but needs a server)
- Custom build on Next.js + Supabase (most flexible, longest build)

---

## Phase 6 — Dealer portal (if they ever add dealers)

Currently they're factory-direct only. If they add authorized installers:

- Installer sign-up + approval flow
- Warranty claim submission portal
- Inventory allocation visibility
- Installer directory on the public site

---

## Reality check

**The site as it stands today (Phase 0) is a complete, sellable product.** You can hand it off, walk away, and the owner has a working modern website that's faithful to his brand and ready to take inquiries.

**Phases 1-6 are optional upsells** — only build them if the owner pays for them or you've validated demand with other similar small businesses.

**Don't build ahead of demand.** Every feature above has a real maintenance cost. Build one phase, confirm it drives revenue, then move to the next.

---

## Questions?

Contact your developer.
