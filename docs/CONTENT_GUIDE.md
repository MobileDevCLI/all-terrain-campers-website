# Content Editing Guide — for non-technical owners

This guide walks you through **every common change** you might want to make to your website, with no coding required.

You'll need:
- A computer (Windows, Mac, or Chromebook)
- A free [GitHub account](https://github.com/join) — one-time setup
- A free [Vercel account](https://vercel.com/signup) — one-time setup (linked to your GitHub)

Once those are set up, you can edit your website from your browser — no programs to install, no files to download.

---

## Table of contents

1. [The basics — how editing works](#the-basics)
2. [Change the phone number](#change-phone)
3. [Update your address or hours](#change-address)
4. [Change a product price](#change-price)
5. [Add a new accessory to the shop](#add-product)
6. [Replace a product photo](#replace-product-photo)
7. [Update a camper model's description](#update-model)
8. [Add a new hero slideshow photo](#add-hero-photo)
9. [Update an FAQ answer](#update-faq)
10. [Add a new press/review link](#add-press)
11. [Change a testimonial](#change-testimonial)
12. [Update social media links](#update-social)
13. [Safety — what to avoid](#safety)
14. [Preview before going live](#preview)

---

<a name="the-basics"></a>
## 1. The basics — how editing works

Your website lives in one file: **`index.html`**. Think of it like a big Word document with code and text mixed together. When you change the text, save, and commit, the live site updates within 30 seconds.

**Three steps every time:**
1. Go to https://github.com/MobileDevCLI/all-terrain-campers-website (your repo)
2. Click the file you want to edit (usually `index.html`)
3. Click the pencil (✏️) icon top-right → make your change → scroll down → click **"Commit changes"** → confirm

That's it. The live site auto-updates.

**To search within the file:** use Ctrl+F (Windows) or Cmd+F (Mac) after you click the file on GitHub. Type the text you want to change and it'll jump you to the right spot.

---

<a name="change-phone"></a>
## 2. Change the phone number

**Current:** 1 (800) 446-1003

The phone number appears in about 12 places. Easiest way:

1. Open `index.html` on GitHub
2. Click the pencil icon (✏️)
3. Press **Ctrl+F** (or Cmd+F on Mac)
4. Type: `446-1003`
5. For each result, change it to the new number
6. Also change `+18004461003` (the `tel:` link version — no spaces or parens) to the new number in the same format
7. Click **"Commit changes"** at the bottom

**Tip:** Use "Find and replace" (small arrow next to the Find box) to change all instances at once.

---

<a name="change-address"></a>
## 3. Update your address or hours

1. Open `index.html` on GitHub
2. Press Ctrl+F, search: `4391 Pell Dr`
3. Change the street address where it appears (8 places)
4. For hours, search for `Monday – Friday` and change

**Also update the Google Maps embed:**

1. Go to https://www.google.com/maps
2. Type the new address, hit enter
3. Click "Share" → "Embed a map" → "Copy HTML"
4. In `index.html`, search: `google.com/maps?q=4391`
5. Replace the `src=` URL with the new one from Google

---

<a name="change-price"></a>
## 4. Change a product price

**Shop accessories** (jacks, solar, awning, etc.):

1. Open `index.html` on GitHub
2. Press Ctrl+F, search: `const PRODUCTS`
3. Find the product you want to update. Each entry looks like:
   ```
   { id:'solar', cat:'Solar & Electric', name:'Solar Panel — 200W Renogy', brand:'Renogy', price:1095, ...
   ```
4. Change the number after `price:` (no dollar sign, no commas — just the number)
5. Commit

**Camper model prices** (Cougar, Ocelot, etc.):

1. Search: `MODELS = {`
2. Find the model. Each entry has `price:'$21,350'`
3. Change the number (keep the dollar sign and commas here — this one shows on the page)
4. The same price also appears in the **pricing table** further up. Search for `$21,350` and update both places.
5. Commit

---

<a name="add-product"></a>
## 5. Add a new accessory to the shop

1. First, **get a photo** of the product:
   - Square photo ideally, 800×800 pixels or larger
   - Save as `.jpg` format
   - Name it something simple like `new-awning.jpg` (no spaces, lowercase)

2. **Upload the photo:**
   - Go to the `images/products/` folder on GitHub
   - Click "Add file" → "Upload files"
   - Drag your photo in
   - Scroll down, click "Commit changes"

3. **Add the product to the shop:**
   - Open `index.html`, search: `const PRODUCTS`
   - Copy an existing entry (one line starting with `{ id:`)
   - Paste it below, between two existing entries
   - Change the fields:
     - `id:` a short unique name (letters only, no spaces) like `'new-awning'`
     - `cat:` the category ("Awnings & Racks", "Solar & Electric", etc.)
     - `name:` the product name as customers see it
     - `brand:` the manufacturer
     - `price:` the price as a plain number
     - `img:` the path to your uploaded photo, like `'/images/products/new-awning.jpg'`
     - `desc:` a short sales description (2-3 sentences)
     - `specs:` technical specs as pairs in brackets
   - Commit changes

The new product appears in the shop within 30 seconds.

---

<a name="replace-product-photo"></a>
## 6. Replace a product photo

Easiest way — **keep the same filename** so nothing else has to change:

1. Take your new photo, save it as a `.jpg` file
2. Rename it to match the existing file (e.g., `solar.jpg`, `awning.jpg`)
3. Go to `images/products/` on GitHub
4. Click the old photo → click the trash icon to delete
5. Click "Add file" → upload your new one
6. Commit

If you want a **different filename**, you'll also need to update the `img:` line in the `PRODUCTS` list (section 4 above).

---

<a name="update-model"></a>
## 7. Update a camper model's description

1. Open `index.html`, search: `const MODELS`
2. Find the model (e.g., `ocelot:`)
3. Look at the `verbatim:` list — these are the quote-boxes on the model's detail page. Edit any text between the quotation marks.
4. Look at the `specs:` list — these are the detail page's spec table. Each row is `['Label', 'Value']`.
5. Commit

**Important:** Keep the single-quotes `'` around every piece of text. Don't delete them.

---

<a name="add-hero-photo"></a>
## 8. Add a new hero slideshow photo

1. Upload your new photo to `images/` (landscape orientation works best, at least 1600 pixels wide)
2. In `index.html`, search: `class="hero-slides"`
3. Just below, you'll see lines like:
   ```
   <div class="hero-slide" data-src="/images/popup_03.jpg" style="background-image:url('/images/popup_03.jpg')" ...
   ```
4. Copy one of these lines
5. Paste below, change both `/images/popup_03.jpg` references to your new filename
6. Find the `<div class="hero-dots"` section and add one more `<button class="hero-dot" ...>` to match
7. Commit

---

<a name="update-faq"></a>
## 9. Update an FAQ answer

1. Open `index.html`, search: `faq-item`
2. Find the question you want to update (between `<summary>` tags)
3. Edit the answer (between `<p>` tags)
4. Commit

---

<a name="add-press"></a>
## 10. Add a new press or review link

1. Open `index.html`, search: `<!-- PRESS ARTICLES GRID -->`
2. Copy an existing `<a class="press-card"` block
3. Paste it below
4. Change the `href=` (the link URL), the `press-tag` (date/publication), the heading, and the description
5. Commit

---

<a name="change-testimonial"></a>
## 11. Change a testimonial

1. Open `index.html`, search: `const TESTIMONIALS`
2. Each testimonial is a block with `photo:`, `name:`, `meta:`, and `quote:`
3. Edit the text between the quotation marks
4. To change a testimonial photo, upload a new photo to `images/` and change the `photo:` value to the new filename
5. Commit

---

<a name="update-social"></a>
## 12. Update social media links

Social links appear in several spots (top bar, hero, footer). Easiest way:

1. Open `index.html`, press Ctrl+F
2. Search for the old social URL (e.g., `instagram.com/allterraincampers`)
3. Replace with the new one everywhere it appears
4. Commit

---

<a name="safety"></a>
## 13. Safety — what to avoid

**Don't delete these characters** — they hold the code together:
- `<` and `>` symbols (HTML tags)
- `{` and `}` (braces — used in JavaScript)
- Single quotes `'` around text
- Commas between items in lists
- Semicolons `;`

**If you break something** — don't panic:
1. On GitHub, go to your repo
2. Click on `index.html`
3. Click "History" (top right of the file)
4. Click the commit *before* your mistake
5. Click "Revert" — this undoes your change

**Test in preview before going live:** see next section.

---

<a name="preview"></a>
## 14. Preview before going live

Every time you commit changes, Vercel creates **two deployments**:

- A **preview URL** (looks like `all-terrain-campers-abc123.vercel.app`)
- The **live URL** (allterraincampers.com)

The preview URL updates first. Check it for problems before sharing the live URL. Vercel will email you both links after each commit.

If you see a bug on the preview, revert (section 13) and try again.

---

## Still stuck?

- [Vercel Help Center](https://vercel.com/docs)
- [GitHub Docs: Editing Files](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
- Call your developer — the 30-day warranty covers reasonable questions

---

© All Terrain Campers, Inc.
