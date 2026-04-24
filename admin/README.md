# /admin/ — Admin Panel

**Status:** Planned (Phase 2 — not yet built). See `docs/ROADMAP.md`.

This directory is reserved for the future admin/CMS panel that will let the site owner edit content without touching GitHub or code.

## Planned features

- Login page (password or Google OAuth)
- **Visual inline editor** — click any text on the site, edit, save
- **Product management table** — add/remove/edit accessories
- **Photo library** — drag-and-drop uploads with auto-resize
- **Pricing editor** — forms for camper + option prices
- **Inquiry inbox** — view and respond to form submissions
- **Content audit log** — who changed what, when

## Recommended stack

- Next.js 16 (App Router) or plain HTML + HTMX + serverless
- Authentication: [Clerk](https://clerk.com) or [Auth.js](https://authjs.dev)
- Database: [Vercel KV](https://vercel.com/docs/storage/vercel-kv) or [Supabase](https://supabase.com) free tier
- File storage: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

## Build effort

- Core CMS (login + inline editing + content storage): ~3-4 weeks of focused development
- Product management table: +1 week
- Photo library with upload: +1 week
- Inquiry inbox: +3 days
- Audit log: +2 days

**Total:** about 5-6 weeks for the MVP.

## Don't build speculatively

Until the owner has been using the GitHub-commit workflow for at least 1 month and has explicitly asked for an easier way to edit the site, don't build this. GitHub works fine for low-frequency edits. The admin panel only earns its complexity when content changes become frequent.

---

Return here when Phase 2 work begins.
