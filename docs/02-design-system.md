# Design system (Tailwind v4 + CSS variables)

## Principles
- **Consistency beats novelty**: predictable spacing/type makes the site feel premium.
- **Readable first**: headings, line length, and contrast tuned for international audiences.
- **Token-driven**: no hard-coded hex colors in components unless exceptional.

## Tokens to standardize

### Color
- **Brand/Primary**: used for primary CTA, links, key accents
- **Neutrals**: background/surface/border/text
- **Semantic**: success/warning/error/info

### Typography
- Font families already in use via `next/font`:
  - Sans: Geist variable
  - Display: Sora
  - Body: Manrope
- Type ramp (example targets; final values defined in CSS vars + utilities):
  - H1: clamp(2.5rem → 5.5rem)
  - H2: clamp(2rem → 3rem)
  - H3: 1.5rem → 2rem
  - Body: 1rem → 1.125rem

### Spacing + layout
- Standardize section padding (mobile/tablet/desktop)
- Standardize container max widths
- Standardize card paddings + gaps

### Radius + shadow
- 3–4 radii levels: sm/md/lg/xl
- 2–3 shadow levels: subtle/card/hero

## Implementation notes
- Define/extend tokens in `frontend/src/app/globals.css` using Tailwind v4 `@theme`.
- Provide layout primitives as small components:
  - `Container`
  - `Section`
  - `PageHeader`

## Anti-patterns to avoid
- New random spacing in each section (magic numbers everywhere)
- Multiple blues competing for “primary”
- Duplicate copy / repeated brand/contact text scattered across pages (centralize in `frontend/src/content/*`)
- Motion on everything (keep it purposeful)

