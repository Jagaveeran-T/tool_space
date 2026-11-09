# Changes in this patch

AdSense-readiness, responsive-design and grade-calculation fixes.
Original behaviour and design were kept wherever possible.

## Before you deploy (things only you can fill in)

1. Set `NEXT_PUBLIC_SITE_URL` (your real domain) in your host. Production
   builds now fail if it is missing. See `.env.example`.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT` (`ca-pub-...`) to add the AdSense
   verification meta tag. After approval, put the line AdSense gives you
   in `public/ads.txt` (it currently contains only comments).
3. If you use Google Analytics, set `NEXT_PUBLIC_GA_ID`. A consent banner
   then appears and analytics stays off until the visitor accepts.
   For ad consent in the EEA/UK/Switzerland, also enable AdSense >
   Privacy & messaging (a Google-certified CMP).
4. Add a real "who runs this site" paragraph to `app/about/page.tsx`
   (name or team, why you built it). The page deliberately does not
   invent this for you.
5. Run `npm uninstall cn` (see "Build fix" below), then
   `npm run lint && npm run typecheck && npm test && npm run build`.

## AdSense blockers fixed

| File | Change |
| --- | --- |
| `components/ads/AdPlaceholder.tsx` | Deleted. Visible "Advertisement space" boxes look unfinished. |
| `app/page.tsx`, `app/calculators/*/page.tsx`, `app/converters/binary-to-ascii/page.tsx` | Removed the placeholder usages. |
| `lib/constants.ts` | No more silent `localhost` fallback in production. |
| `app/layout.tsx` | AdSense verification meta tag; Google Consent Mode (analytics denied by default). |
| `components/common/ConsentBanner.tsx` (new) | Accept / Decline banner, shown only when GA is configured. |
| `app/sitemap.ts` | Adds contact, privacy, terms, disclaimer, text-tools; tools come from the registry. |
| `data/categories.ts`, `components/home/Categories.tsx` | Removed 3 empty categories (Developer, Text-placeholder, PDF) and only list categories that have tools. |
| `data/faqs.ts` | Removed "more tools will be added" wording. |
| `app/about`, `contact`, `terms`, `disclaimer`, grade and binary pages | Nested `<main>` replaced (layout already provides one). |
| `app/privacy-policy/page.tsx` | Third-party vendor cookie wording, aboutads.info opt-out, consent notes, new date. |
| `public/ads.txt`, `.env.example`, `.gitignore`, `README.md` | New / updated. |

## New content (6 tools now, was 3)

| Tool | Files |
| --- | --- |
| Percentage Calculator | `lib/calculators/percentage-calculator.ts`, `components/calculators/percentage-calculator/*`, `app/calculators/percentage-calculator/page.tsx` |
| Date Difference Calculator | `lib/calculators/date-difference.ts`, `components/calculators/date-difference/*`, `app/calculators/date-difference-calculator/page.tsx` |
| Word Counter (Text Tools) | `lib/text-tools/word-counter.ts`, `components/text-tools/*`, `app/text-tools/page.tsx`, `app/text-tools/word-counter/page.tsx` |
| Shared guide layout | `components/tools/ToolGuide.tsx` |
| Binary converter guide | `components/converters/binary-translator/HowItWorks.tsx` expanded from ~270 to ~1,000 words |

Registered in `data/tools.ts`, navigation (Header, MobileNavigation, `NAVIGATION_ITEMS`).

## Responsive fixes

* `app/globals.css`: `.container-main` moved into `@layer components`.
  Unlayered CSS beat Tailwind's `max-w-4xl`, so About/Privacy were 1280px
  wide instead of 896px.
* `GradeRow.tsx`, `GPACalculator.tsx`: 12-column grid starts at `lg`
  (was `sm`). At 640px the inputs were 75px wide and the category
  select was cut off.
* `GradeScaleSettings.tsx`: compact table that fits a phone with no
  sideways scrolling.

## Grade / calculator fixes

* `lib/calculators/grade-calculator.ts`
  * **Extra credit bug**: extra credit was divided by 100 instead of the
    completed weight, so partial courses under-counted it. This also made
    an existing test fail (91 vs the expected 96). Now
    `(regular points + extra-credit points) / completed weight`.
  * "Achievable" is decided from the rounded value that is displayed.
  * `withDerivedMax()`: people enter only minimum percentages; maximums
    are derived, so ranges can't overlap or leave gaps (89.5 cut-offs work).
  * Duplicate minimums get a clear error message.
* `components/common/NumberField.tsx` (new): number fields that can be
  cleared and retyped (they used to snap back to "0").
* `WeightedGradeForm.tsx`: no red error before the first input.
* `components/calculators/age-calculator/*`: today's date is no longer
  frozen at build time (static export).
* Grade page copy explains rounding and extra credit.

## Build fix (not requested, but important)

The ten files in `components/ui/` imported `cn` from the npm package `cn`,
which is an unrelated command-line tool, not the class-name helper. They
now import from `@/lib/utils` (your existing clsx + tailwind-merge helper).
The `cn` entry can be removed from `package.json` with `npm uninstall cn`.

## Tests

`tests/unit`: 156 tests (was 81). New: percentage, date difference, word
counter, grade regressions (extra credit, rounding, derived maximums).
