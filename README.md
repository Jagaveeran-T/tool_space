# ToolSpace

Free online calculators, converters and text tools, built with Next.js
(static export), React, Tailwind CSS and shadcn/ui.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build (static export) |
| `npm run lint`      | Run ESLint                    |
| `npm run typecheck` | Run the TypeScript compiler   |
| `npm test`          | Run unit tests (Vitest)       |

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SITE_URL` is required for production
builds; the build stops with an error if it is missing.

## Adding a tool

1. Build the logic in `lib/`, with tests in `tests/unit/`.
2. Add the page under `app/<category>/<tool>/page.tsx`.
3. Register it in `data/tools.ts`. The tool appears in listings, search
   and the sitemap automatically.
4. Add a written guide (use `components/tools/ToolGuide.tsx`) so the page
   has useful content, not just a form.

## Before applying to Google AdSense

- Deploy on a domain you own and set `NEXT_PUBLIC_SITE_URL`.
- Set `NEXT_PUBLIC_ADSENSE_CLIENT` to add the verification meta tag.
- After approval, add the line AdSense gives you to `public/ads.txt`.
- For visitors in the EEA, UK and Switzerland, enable a Google-certified
  consent message (AdSense > Privacy & messaging) before showing ads.
