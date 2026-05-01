# Study destination rich content (HTML → React)

Destination detail pages still receive **`page_description`** as sanitized HTML from the legacy CMS (Elementor exports). After Cheerio/DOMPurify normalization (`normalizeStudyDestinationHtml` in `frontend/src/lib/study-destination-html.ts`), we upgrade selected patterns to **interactive React UI** using **`html-react-parser`**.

## Pipeline

1. **Server (SSR / SSG)**  
   - `normalizeStudyDestinationHtml()` strips Elementor wrappers, sanitizes markup, wraps tables, promotes the book-appointment banner, and wraps **motivation-letter / SOP** sections in  
     `<div class="study-destination-rich-motivation">…</div>` (see `wrapMotivationLetterSection`).

2. **Render**  
   - `DestinationDetailPageContent` passes the resulting string to **`RichContentRenderer`** (`frontend/src/components/study-destinations/RichContentRenderer.tsx`).  
   - `RichContentParserOptions.replace()` swaps matching nodes for Tailwind components.

## Replacement rules

| Pattern | Detection | Component |
|--------|-----------|-----------|
| University lists | `<ul>` whose **previous element sibling** is `<h2>`–`<h4>` and heading matches university phrases (IT/EN/FR, accent-normalized) | `StudyRichCardGrid` (`variant="university"`) — responsive grid, glass-style cards, **GraduationCap** icon |
| Popular courses | Same sibling rule; heading matches course phrases | `StudyRichCardGrid` (`variant="course"`), **BookOpen** icon |
| Job + salary rows | Heading matches post-study work / salary intros; **≥ ~45%** of `<li>` lines parse as `Title: Value` | `StudyRichSalaryList` — row layout + emerald salary **badge** |
| Motivation letter / SOP | Wrapper div from server (`study-destination-rich-motivation`) | `MotivationLetterAccordion` — `<details>` sections grouped by `<h4>` when present |
| Pseudo-lists → bullets (any locale) | `<p>` nodes that contain multiple `<br>` separated “lines” and look like a list | Render as a real `<ul>` / `<li>` bullet list (fallback), unless the same block is upgraded into a richer component |

Heading heuristics live in **`frontend/src/lib/study-destination-rich-patterns.ts`**. Extend regexes there when new locales or CMS titles appear.

## Files

| File | Role |
|------|------|
| `frontend/src/lib/study-destination-html.ts` | Normalization + motivation wrapper |
| `frontend/src/lib/study-destination-rich-patterns.ts` | Heading matchers |
| `frontend/src/components/study-destinations/RichContentRenderer.tsx` | `parse()` + `replace` orchestration |
| `frontend/src/components/study-destinations/rich-content/StudyRichCardGrid.tsx` | Grid cards |
| `frontend/src/components/study-destinations/rich-content/StudyRichSalaryList.tsx` | Colon parsing + badge rows |
| `frontend/src/components/study-destinations/rich-content/MotivationLetterAccordion.tsx` | Accordion UI |
| `frontend/src/components/study-destinations/DestinationDetailPageContent.tsx` | Wires `RichContentRenderer` |

## Dependencies

- **`html-react-parser`** — DOM → React with `replace`.

## Limitations / next steps

- Some CMS pages use “flat” HTML (headings + paragraphs) rather than semantic lists. We handle the most common case (`<p>` + `<br>` pseudo-lists) by upgrading them into real bullet lists automatically.
- Matchers are **heuristic**; odd CMS headings may need new phrases in `study-destination-rich-patterns.ts`.
- Long-term: structured blocks from the API (JSON) would avoid regex/sibling fragility entirely.

## Related

See also `docs/08-study-destinations-cms-integration.md` for API wiring and slug conventions.
