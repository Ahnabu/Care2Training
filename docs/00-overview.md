# Care2Training UI Refresh (10 Days)

## Goal
Refresh the public website UI so it looks modern, trustworthy, and internationally acceptable while staying fast, accessible, and easy to iterate with Cursor agents.

## Scope (10 days)
- **Pages**: Home, About, Study Destinations, Services, Events, Blogs, Contact, Book Appointment
- **Templates**: list + details where needed (destinations/services/blogs/events)
- **Global**: Header, Footer, navigation patterns, typography, spacing, tokens, forms

## Non-goals (unless explicitly requested)
- Major backend rebuilds
- Complex CMS integration
- Multi-language implementation beyond a UI-ready language switcher

## Success checklist
- Consistent design tokens (colors/type/spacing/radius/shadows)
- Codebase maintainability: reuse components + move duplicated marketing copy into `frontend/src/content/*` TS data modules
- Fully responsive (360 → 1440+)
- Accessible baseline (keyboard nav, focus states, contrast, labels)
- Performance basics (image `sizes`, sane motion usage, stable layout)
- Repeatable implementation workflow via `agents/` prompts + runbooks

## Inputs we still need
The UI research table/recommendations (from Gemini) must be pasted into chat or added to the repo so we can convert it into a prioritized checklist and map each item to pages/components.

## Implemented additions (reference)
- **Study destinations + legacy CMS API:** Listing and detail pages consume `admin.care2training.com` APIs; all routed locales pass through as `lang`. Summary: **`docs/08-study-destinations-cms-integration.md`**.

