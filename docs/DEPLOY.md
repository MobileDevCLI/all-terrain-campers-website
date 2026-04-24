# Deploy Guide — going from GitHub to the live site

This walks you through getting the website online for the first time, pointing your domain at it, and how changes flow to production.

---

## One-time setup (first deploy)

### Step 1: Create a Vercel account

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"** — use the same GitHub account that owns this repo
3. Approve the permissions Vercel asks for

### Step 2: Import this repo to Vercel

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find **`all-terrain-campers-website`** in the list and click **"Import"**
3. Leave every setting at defaults (Vercel auto-detects this is a static site)
4. Click **"Deploy"**
5. Wait ~30 seconds. You'll get a live URL like `all-terrain-campers-website.vercel.app`

### Step 3: Point your domain

If you own `allterraincampers.com` at GoDaddy (or any registrar):

1. In Vercel project → **"Settings"** → **"Domains"**
2. Click **"Add"** → type `allterraincampers.com` → click **"Add"**
3. Vercel shows you 2 DNS records to add. Screenshot or copy them.
4. Log into your domain registrar (GoDaddy, etc.)
5. Find DNS management for `allterraincampers.com`
6. Delete existing A records pointing to the old site
7. Add the new A record from Vercel (usually `76.76.21.21`)
8. Add the CNAME for `www` (Vercel provides)
9. Save. Propagation takes 5-60 minutes. Vercel will auto-issue an SSL certificate.

**If you don't want to do the DNS step yourself:** your developer can do this in 30 minutes with your GoDaddy login.

---

## Ongoing — how changes go live

Once the initial setup is done, every change flows like this:

```
Edit a file on GitHub
         ↓
Click "Commit changes"
         ↓
Vercel detects the change automatically
         ↓
Vercel builds + deploys (30 seconds)
         ↓
Live site updates
```

**You never have to manually "deploy" again.** Just commit on GitHub.

### Every commit creates two URLs

- **Preview URL** — `all-terrain-campers-website-[hash].vercel.app` (unique per commit, shows the change before it goes live)
- **Production URL** — `allterraincampers.com` (the real customer-facing site)

The production URL updates automatically when you commit to the `main` branch (the default).

---

## Rollback — undoing a bad change

If a commit breaks something:

### Option A: GitHub revert (recommended for non-developers)

1. On GitHub, open `index.html`
2. Click the **"History"** button (top right)
3. Find the commit that was working (before the bad one)
4. Click the SHA link (e.g., `a1b2c3d`)
5. Click **"..."** → **"Revert"**
6. GitHub creates a new commit that undoes the bad one
7. Vercel redeploys within 30 seconds with the old version restored

### Option B: Vercel instant rollback

1. In Vercel dashboard → your project → **"Deployments"**
2. Find the previous working deployment
3. Click **"..."** → **"Promote to Production"**
4. Live in under 10 seconds

Vercel keeps deployment history forever. You can always roll back.

---

## Staging environment (optional but recommended)

You can set up a separate staging site that mirrors production but lets you test before going live:

1. On Vercel → **"Settings"** → **"Git"** → enable preview deployments for branches
2. Create a new branch on GitHub (e.g., `staging`)
3. Push changes to `staging` first
4. Vercel auto-creates `all-terrain-campers-website-git-staging.vercel.app`
5. Verify changes look good on the staging URL
6. Merge `staging` → `main` to push to production

Only do this if you're comfortable with Git branches. Otherwise, commit directly to main + use the preview URL for testing.

---

## Cost

- **Vercel free tier** is sufficient for this site. Covers ~100 GB bandwidth/month and unlimited deployments.
- **Domain renewal** at GoDaddy (or your registrar) — ~$15-20/year
- **SSL certificate** — free (auto-issued by Vercel)

Upgrade to Vercel Pro ($20/mo) only if you:
- Exceed 100 GB bandwidth/month (unlikely with a small biz site)
- Need team collaboration features
- Want priority support

---

## Analytics

Recommended: install [Plausible Analytics](https://plausible.io) ($9/mo, privacy-friendly, no cookie banner required).

Or: Google Analytics 4 (free, requires cookie banner).

Ask your developer to wire this up — takes about 15 minutes.

---

## Moving to a different host

If you ever want to move off Vercel (to Netlify, Cloudflare Pages, AWS, etc.):

1. The entire site is in this repo — nothing is locked to Vercel
2. Any static hosting service can serve `index.html` + the folders directly
3. Point your DNS at the new provider
4. Copy the `vercel.json` contents into the equivalent config for the new host

**The site is 100% portable.**

---

## Support

- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Need human help? Call your developer.
