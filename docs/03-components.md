# Components checklist

## Global
- `SiteHeader`
  - Desktop nav
  - Mobile menu
  - Language switcher UI (non-functional placeholder OK)
  - Primary CTA
- `SiteFooter`
  - Offices + contacts
  - Quick links
  - Legal links

## UI primitives
- Buttons (primary/secondary/ghost)
- Links (default + subtle)
- Cards
- Badges
- Inputs/select/textarea
- Form field wrapper (label/help/error)

## Content sections (reusable)
- Hero (split + media)
- Trust/Partners bar
- Services grid
- Process steps
- Stats strip
- Testimonials
- FAQ accordion
- CTA band
  
## Reusability requirements
- Prefer props-driven sections (accept `className` and option props rather than hard-coding layout assumptions)
- Avoid embedding page-specific marketing copy in multiple components; use `frontend/src/content/*` data modules

## Page templates
- List page template (filters + grid + pagination placeholder)
- Detail page template (hero + content + sidebar CTA)
- Article template (readable typography + related posts)

