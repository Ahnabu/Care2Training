# Study destinations: legacy API integration & UI (summary)

This document summarizes work completed on **study destination listing and detail pages** in `frontend/`: pulling content from the previous Care2 Training admin API, wiring all app locales, fixing the header language switcher, and iterating the detail-page layout.

## Data source (legacy backend)

- **Base:** `https://admin.care2training.com/api`
- **Country list (listing cards):** `GET /get-countries`  
  Returns active countries with `name`, `slug` (e.g. `study-in-canada`), `meta_description`, `order`, `is_top_destination`, SEO fields.
- **Country detail (hero + body HTML):** `GET /country/{slug}?lang={locale}`  
  Example: `/country/study-in-canada?lang=en`  
  Response includes `meta_title`, `meta_description`, `meta_keywords`, and `contents`:
  - `hero_title`, `hero_subtitle`
  - `hero_bg_img`, `hero_st_img` (paths relative to `https://admin.care2training.com/`)
  - `page_description` (HTML from Elementor/CMS)

**Locales:** The app passes the same codes as next-intl routing (`en`, `bn`, `it`, `fr`, `es`, `de`, `bg`, `et`) as the `lang` query parameter. Localized fields depend on what is configured in the CMS; some languages may still return English where translations are missing.

**Listing titles:** `get-countries` does not appear to vary by `lang` in quick checks; card titles/descriptions may stay English while detail bodies localize via `/country/...?lang=`.

## Frontend implementation map

| Area | Location |
|------|-----------|
| Fetch helpers, slug mapping, image URLs | `frontend/src/lib/care2training-api.ts` |
| Listing page (grid from API, top badges, shared sections) | `frontend/src/components/study-destinations/StudyDestinationsListingPage.tsx` |
| Detail route + metadata + static params | `frontend/src/app/[locale]/study-destinations/[slug]/page.tsx` |
| Detail composition (hero + article + CTA) | `frontend/src/components/study-destinations/DestinationDetailPageContent.tsx` |
| Rich HTML rendering (`html-react-parser`) | `frontend/src/components/study-destinations/RichContentRenderer.tsx` |
| CMS HTML normalization (Cheerio / DOMPurify) | `frontend/src/lib/study-destination-html.ts` |
| Destination hero (breadcrumb, book CTA, title/subtitle, images) | `frontend/src/components/study-destinations/DestinationCountryHero.tsx` |
| Remote images | `admin.care2training.com` allowed in `frontend/next.config.mjs` |

## URL slug convention

- Navigation uses **short** segments (e.g. `/study-destinations/germany`).
- The API expects **`study-in-{country}`** slugs.
- **Mapping:** `routeSlugToApiSlug()` adds the `study-in-` prefix when missing; `apiSlugToRouteSlug()` strips it for links from the listing.

## UI decisions (detail page)

1. **Hero:** Gradient overlay on background image, optional side portrait, vertical stack: breadcrumbs → localized “Book appointment →” pill → title → subtitle (aligned with legacy edu site patterns).
2. **Body:** `page_description` is normalized with Cheerio/DOMPurify (`study-destination-html.ts`), then rendered via **`RichContentRenderer`** (see `docs/09-study-destination-rich-content.md`) inside **`study-destination-prose`** with global table styles in `globals.css`. No enclosing “card” wrapper around the article; content uses **full width** within the main container (`max-w-none`), not a centered narrow column.
3. **Footer of detail:** Divider strip then existing **`CTABand`** component.

## Translations (`studyDestinationsPage`)

Messages were added across locale JSON files for listing copy, badges, detail CTAs, and related strings (e.g. `listingDescription`, `viewDetails`, `topBadge`, `ctaPrimary`, `ctaSecondary`, `guideEyebrow` where still present).

## Bugfix: language dropdown on desktop

**Issue:** A single React `ref` was attached to both the desktop and mobile language switchers; only the last mounted node received the ref. The global “click outside” handler treated clicks inside the **desktop** dropdown as outside the language UI, closing the menu before selection or breaking navigation.

**Fix:** Separate refs (`langRefDesktop`, `langRefMobile`) and treat a click as inside the language UI if it is inside **either** container.

**File:** `frontend/src/components/site/SiteHeader.tsx`

## Related removals / cleanup

- Legacy duplicate route file under `app/study-destinations/[slug]/page.tsx` was removed in favor of `[locale]/study-destinations/[slug]`.
- `generateStaticParams` for destinations uses `fetchDestinationRouteSlugs()` from `care2training-api.ts` (combined with all locales). Detail fetches use ISR-style `revalidate` on the API `fetch` calls.

## Rich HTML → React upgrades

Sanitized `page_description` is rendered with **`RichContentRenderer`** (`html-react-parser`), which replaces matching headings + lists and motivation-letter blocks with Tailwind components (grid cards, salary badges, accordions). Motivation sections are marked server-side with `.study-destination-rich-motivation`. For CMS content that encodes lists as `<p>` + `<br>`, we also convert those pseudo-lists into **real bullet lists** (locale-agnostic).

**Summary:** [Study destination rich content (HTML → React)](./09-study-destination-rich-content.md)

## Operational notes

- Builds and runtime depend on **reachability** of `admin.care2training.com` for fresh data (cached per revalidate window).
- CMS HTML may contain absolute links to older domains; rewriting those is optional future work.
