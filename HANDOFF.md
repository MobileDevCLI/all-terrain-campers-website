# Handoff — 2026-04-24 (sleep break)

This document hands off the All Terrain Campers website project state at the end of the 2026-04-24 evening session. If a new Claude session reads this tomorrow, **start here.**

---

## Where this project lives

- **Local working copy:** `~/all-terrain-campers-website/` (this repo).
- **GitHub:** [`MobileDevCLI/all-terrain-campers-website`](https://github.com/MobileDevCLI/all-terrain-campers-website) — public.
- **Source content archive (audit-trail evidence):** `~/atc-scrape/` — six HTML scrapes of allterraincampers.com from 2026-04-24 10:48, plus plain-text extractions in `atc-scrape/plain/`. Verified identical to live site via WebFetch the same day. **Don't move this directory** — every verbatim claim on the site is verified against it.

## Why this project exists (1-line)

Robert is preparing the ATC website as a polished sale asset to trade to **All Terrain Campers Inc. of Sacramento, CA in exchange for an Ocelot camper** (~$13K trade value). 100% verbatim content from ATC's own website is the legal/integrity foundation.

**This is a mock-up they could buy.** It is not yet ATC's actual production site. Robert is the builder; ATC is the prospective buyer. They have not seen it yet.

## What was done in the 2026-04-24 evening session

Four commits, all pushed:

1. **`725f544` — Verbatim integrity fix pass.** Found and fixed ~18 fabricated FEATURES descriptions, 5 condensed/altered testimonials (including Dan's invented phrase "pulled him out" → ATC's actual "hauled off"), Clark's frankenstein sentence, FAQ 14 missing 4 paragraphs, FAQ 7 missing trailing sentence, hero H1 "Aluminum"→"Aluminium", multiple typography alterations across MODELS. Forensic audit at `AUDIT_2026-04-24.md`.

2. **`32744f8` — Tier 1 + Tier 2 strategic upgrades.**
   - Tier 1 (5 items): hero eyebrow with verbatim positioning fragments, persistent "Build My Camper" nav CTA, "Why ATC vs the rest" 7-row honest comparison vs FWC/Hallmark/Supertramp, lead-time status strip with verbatim "currently building to order" quote, Wander the West community pull-quote.
   - Tier 2 (3 items): video gallery with 1 real YouTube embed + 4 clearly-marked content-slot placeholders ("Awaiting ATC footage"), Factory-visit block with verbatim "please call" quote + scheduling CTAs, delivered-price calculator using ATC's published $1.50/mile shipping rate.
   - Strategic analysis at `STRATEGY_AUDIT.md` covering FWC, Hallmark, Supertramp, Airstream.

3. **`cd5d0b8` — Code refactor.** Split the 3,381-line monolithic `index.html` into the standard senior-developer file layout: `index.html` (1,493 lines, markup) + `css/main.css` (754 lines) + `js/app.js` (1,200 lines). No build step, no framework, no bundler. Vercel serves all three as static assets. Caught and fixed a parser bug introduced when my own header comments contained nested `/* */` blocks that closed the wrapping comment early.

4. **`fbb0128` — Audit polish.** Sitemap expanded from 1 URL to 11. Meta tags switched to British "Aluminium" to match the H1. Added `og:locale`, `og:site_name`, `og:image:alt`, full Twitter Card. Rebuilt FAQPage JSON-LD with verbatim ATC answers (preserves the "change $1.50 a mile" typo). Added missing Product/ItemList schema for all 7 models. All `<img>` tags have descriptive alt text and below-the-fold images use `loading="lazy"`. New `QA_CHECKLIST.md` for the browser-based pre-sale test.

## Current technical state — GREEN

- index.html: 100,245 bytes / 1,493 lines · 81 ids · 18 internal anchors · **0 broken**
- css/main.css: 66,428 bytes / 754 lines · 715/715 brace balance
- js/app.js: 77,344 bytes / 1,200 lines · `node --check` passes · all 24 onclick handlers resolve
- 3 valid JSON-LD blocks (LocalBusiness, FAQPage, ItemList/Product)
- All 7 `<img>` tags have alt text; 6 of 7 (the modal-fill stubs excepted) use lazy-loading
- 17 section anchors + sitemap covers homepage + 10 deep-links
- All verbatim ATC content traceable to `~/atc-scrape/` byte-for-byte (FAQ Q15 has an HTML rendering artifact in the scrape's plain-text version — not a real miss)

## Current strategic state

Beats the three direct competitors on **12 of 15 dimensions** (was 10 before Tier 1). Wins on: pricing transparency, testimonial depth, e-commerce shop, model detail pages, FAQ on homepage, truck selector, comparison block, refurbishes-FWC dig, lead-time strip, verbatim integrity, JSON-LD coverage, factory-visit invitation. Loses on: video library depth (FWC has 20+, we have 1), heritage punch ("Since YYYY" — ATC's site doesn't publish a year), and live events calendar.

## What is NOT done

1. **Browser QA pass** — see `QA_CHECKLIST.md`. Needs ~20 min of clicking through Chrome desktop + iOS Safari + Android Chrome. **Do this before showing the site to anyone.** Especially: configurator end-to-end, cart persistence across reload, all 7 model modals, mobile drawer, lightbox keyboard nav.
2. **Real form-submission backend.** The contact form is a stub. Per Roadmap Phase 1, ATC's developer wires Formspree / Vercel function / Zapier after purchase. Don't add it now — it would need ATC's own email destination.
3. **Vercel deployment for this specific repo.** The site is on GitHub but no Vercel project is currently linked from this machine (no `.vercel/` dir; `mobilecli.com/camp` returns 404). To preview: clone the repo on a machine with `vercel` CLI, `vercel link`, `vercel --prod`. Or deploy manually to Netlify / Cloudflare Pages — `docs/DEPLOY.md` has the runbook.
4. **Lighthouse / Google Rich Results Test scores** — both are browser-based, not run yet. Listed in `QA_CHECKLIST.md`.
5. **The empty `admin/` and `api/` placeholder folders.** They have stub READMEs that say "reserved for future Phase 2+". Either keep (signal future upsells per `docs/ROADMAP.md`) or remove. **No decision made yet.** If the buyer asks, frame as "wired-but-empty Phase 2 hook."

## What is NOT my work but is on this machine

- **`~/MobileCLI-v9.0.0/`** has 3 dirty files (`docs/ai-memory/MEMORY.md` modified, `invention_222_mcli_capture.md` deleted, `invention_220_mcli_capture.md` added). This is **another Claude session's in-progress work** on Invention #226 (IWP Drawer button + mcli-iwp-pilot Phase 2 — see commits `1061a98`, `5cbe742`, `546f815`). RULE #6 says don't clobber another agent's work. **Leave this alone.** The session-zero brief at the top of this conversation flagged it as priority-1 to commit, but the right resolution is for whichever Claude was working on Invention #226 to come back and finish — not for me to commit half their work.

- **`~/iwp/`** — the IWP product (Invention #160-related). Built by another Claude session today. Out of scope for this ATC website project. Touch only if explicitly asked.

## Files in this repo (what each one does)

```
~/all-terrain-campers-website/
├── index.html              ← Markup (1,493 lines)
├── css/main.css            ← All styles (754 lines)
├── js/app.js               ← All behavior + data (1,200 lines)
├── vercel.json             ← Vercel cache headers + cleanUrls
├── robots.txt              ← Allow all + sitemap reference
├── sitemap.xml             ← Homepage + 10 section anchors
├── README.md               ← Buyer-facing project intro
├── HANDOFF.md              ← THIS FILE
├── AUDIT_2026-04-24.md     ← Forensic verbatim-content audit + fix log
├── STRATEGY_AUDIT.md       ← Competitive analysis (FWC / Hallmark / Supertramp / Airstream)
├── QA_CHECKLIST.md         ← Pre-sale browser test script
├── images/                 ← 7 hero/landscape/popup + 11 product photos
├── api/README.md           ← Stub for future serverless endpoints
├── admin/README.md         ← Stub for future admin panel
└── docs/
    ├── CONTENT_GUIDE.md    ← Non-technical owner: how to edit text/photos/prices
    ├── DEPLOY.md           ← Vercel + DNS + rollback walkthrough
    ├── ROADMAP.md          ← Phased future features (Phase 0 shipped through Phase 6)
    ├── CONTENT_SOURCES.md  ← Per-passage provenance (the audit trail)
    └── TECHNICAL.md        ← Senior-dev architecture map (HTML/CSS/JS region tables)
```

## How to pick up tomorrow — three plausible next moves

Pick whichever applies based on what Robert says:

**A. "Run the QA checklist."** Open `https://github.com/MobileDevCLI/all-terrain-campers-website` in a browser, deploy via Vercel CLI or push to a Vercel-linked repo, then walk through every checkbox in `QA_CHECKLIST.md` on real Chrome desktop + real iPhone + real Android. Document any issues found with line numbers. ~20 minutes.

**B. "Deploy and demo it."** Clone the repo to a machine with the `vercel` CLI, `vercel link` to a new project, `vercel --prod`. The deployed URL is what Robert shows ATC. Hand them the URL + tell them where the GitHub repo is. They evaluate. ~10 minutes.

**C. "ATC said yes, prepare the transfer."** Need a `LICENSE` file (proprietary, transferred-on-payment), a `LICENSE_TRANSFER.md` template letter ATC signs, GitHub repo transfer instructions, Vercel project transfer instructions, domain (allterraincampers.com) DNS cutover walkthrough. None of this exists yet. ~2 hours of doc work + the GitHub repo transfer itself (which Robert has to initiate from his account).

**D. "Continue polish."** Tier 3 items from `STRATEGY_AUDIT.md` (footer refactor, exit-intent capture, Lighthouse + Rich Results validation). ~2 hours. Lower priority — current state is shippable.

## Hardline rules in force on this project

- **Verbatim only.** Every passage attributed to ATC must be findable in `~/atc-scrape/`. Cuts allowed only as visible `[…]` markers. **Never paraphrase inside `<blockquote class="verb">`.** This is the foundational legal/integrity claim of the entire sale.
- **No fake stuff.** No fake videos, no stock thumbnails dressed as ATC content, no fabricated reviews, no invented quotes attributed to real named customers, no "Since 1972" if ATC doesn't publish a year. The 4 video-gallery placeholders are explicitly labeled "Awaiting ATC footage."
- **No live form backend.** The contact form is a stub. ATC wires it after purchase to their own destination.
- **No newsletter signup.** Unless ATC asks for one, signups go nowhere.
- **No real admin panel build.** Deferred to Phase 2 in `docs/ROADMAP.md`.
- **`~/atc-scrape/` is sacred.** Do not delete, modify, or "clean up" the scrape archive. It is the dated evidence that every verbatim claim came from ATC's actual published text on 2026-04-24.

## How to verify integrity quickly (2 minutes, no browser)

```sh
cd ~/all-terrain-campers-website
node --check js/app.js                            # JS syntax
python3 -c "
import re
h = open('index.html').read()
ids = set(re.findall(r'id=\"([^\"]+)\"', h))
anchors = set(re.findall(r'href=\"#([^\"]*)\"', h))
broken = [a for a in anchors if a and a not in ids]
print('IDs:', len(ids), 'anchors:', len(anchors), 'broken:', len(broken))
"                                                  # broken-link check
git status --short                                 # working-tree clean?
git log --oneline @{u}..                           # any unpushed commits?
```

Expected: JS parse silent, broken == 0, working tree clean, no unpushed commits.

## Memory entries that should exist (sanity check for next-Claude)

The next Claude session, on session start, should see these in `MEMORY.md` index:

- A reference to `~/all-terrain-campers-website/` — **may not exist yet**; recommend adding one if missing. Suggested entry: *"ATC website sale asset — verbatim content audit + Tier 1/2 strategic upgrades + standard css/js refactor done 2026-04-24 evening. See HANDOFF.md in repo for pickup point. ~/atc-scrape/ is the source-truth archive."*

If the next session is a totally different machine or memory got cleared, this HANDOFF.md file is the canonical pickup point.

## Final sign-off

- All 4 commits pushed to `origin/main`. Working tree clean.
- Verbatim integrity verified — see `AUDIT_2026-04-24.md` post-fix section for the 24/24 spot-check pass.
- Strategic positioning verified — see `STRATEGY_AUDIT.md` for the 12-of-15 wins-vs-competitors tally.
- Browser QA pending — that's the one open item.
- No code, doc, or dependency surprises.

— Handoff written 2026-04-24 evening session, by Claude Code (Opus 4.7, 1M context).
