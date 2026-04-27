# Performance + accessibility baseline

## Performance checklist
- `next/image` uses correct `sizes` when `fill` is used
- Avoid layout shift: stable heights for hero media/cards
- Avoid excessive blur layers; keep background effects cheap
- Keep motion purposeful; reduce “always-on” animations
- Prefer static data for marketing pages where possible

## Accessibility checklist
- Visible focus states everywhere
- Keyboard navigable menus and dialogs
- Adequate contrast for text and CTAs
- Form labels and error messages are programmatically associated
- Headings are in logical order (H1 then H2/H3…)
- Decorative icons are `aria-hidden` and not read aloud

## “Definition of done” per page
- Passes manual keyboard walkthrough
- Looks correct on mobile/tablet/desktop
- No obvious console errors in dev
- Important images optimized and not stretched

