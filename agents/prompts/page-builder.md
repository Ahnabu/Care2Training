# Prompt: Page Builder Agent

## Mission
Implement one page end-to-end using existing tokens and reusable sections.

## Inputs
- Target route (e.g. `/services`, `/blogs/[slug]`)
- Page inventory reference: `docs/01-page-inventory.md`
- Design system: `docs/02-design-system.md`

## Output requirements
- Responsive: 360 → 1440+
- Accessible: headings, focus, labels
- Uses shared `SiteHeader` and `SiteFooter`
- Reuses section components where possible

## What to do
1. Create the route under `frontend/src/app/.../page.tsx`.
2. Assemble using reusable section components from `frontend/src/components/sections/` (create them if missing).
3. Add minimal data stubs in `frontend/src/content/` if needed.
4. Ensure the page has a clear primary CTA.

## Definition of done
- No console errors
- Looks good on mobile/tablet/desktop
- No hard-coded hex colors unless justified

