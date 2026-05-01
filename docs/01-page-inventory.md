# Page inventory

This file lists all public routes, their purpose, and the reusable sections/components that should power them.

## Top-level routes
- `/` (Home)
- `/about`
- `/study-destinations`
- `/study-destinations/[slug]`
- `/services`
- `/services/[slug]`
- `/events`
- `/events/[slug]`
- `/blogs`
- `/blogs/[slug]`
- `/contact`
- `/book-appointment`

## Shared UI (global)
- Header
  - Primary nav
  - Mobile nav / drawer
  - Language switcher (UI-ready)
  - Primary CTA: Book appointment
- Footer
  - Offices (BD/UK/others as needed)
  - Quick links
  - Social/contact
  - Legal links

## Page templates (recommended sections)

### Home (`/`)
- Hero (primary CTA + secondary CTA)
- Partner logos / trust bar
- Services overview
- “How we work” steps
- Testimonials / success stories
- Destinations highlight
- Contact CTA + lead capture

### About (`/about`)
- Mission + value proposition
- Team / advisors (optional)
- Offices + credibility signals
- Timeline / milestones (optional)

### Study Destinations (`/study-destinations`)
- Destination cards driven by **legacy API** `GET https://admin.care2training.com/api/get-countries` (sorted by `order`, “top” badge from `is_top_destination`)
- Trust bar, offices mini, process, testimonials, FAQ, CTA band (see `StudyDestinationsListingPage.tsx`)

### Study Destination detail (`/[locale]/study-destinations/[slug]`)
- **Content source:** `GET /api/country/{study-in-slug}?lang={locale}` — hero fields + HTML body (`page_description`); images from admin origin
- **UI:** `DestinationCountryHero` (breadcrumb, localized book CTA, title/subtitle, BG + side images); full-width prose article (no card wrapper); `CTABand` below
- See **`docs/08-study-destinations-cms-integration.md`** for endpoints, slug mapping, locale behavior, and the header language-switcher fix

### Services (`/services`)
- Service cards (grid)
- Why choose us / differentiators

### Service detail (`/services/[slug]`)
- Detail hero + what’s included
- Process + expected timeline
- FAQ + CTA

### Events (`/events`)
- Upcoming events list
- Event CTA / booking

### Event detail (`/events/[slug]`)
- Agenda, location, registration

### Blogs (`/blogs`)
- Blog list + categories/tags (UI first; real taxonomy optional)

### Blog detail (`/blogs/[slug]`)
- Article template (readability, TOC optional)
- Related posts

### Contact (`/contact`)
- Contact form
- Office locations + phone/email

### Book Appointment (`/book-appointment`)
- Appointment form
- Confirmation UX (if backend exists later, keep contract stable)

## Research-driven checklist mapping (TODO)
Once the Gemini recommendations table is provided, we will:
- tag each item with **Must/Should/Could**
- map each item to one of the routes/sections above
- track completion in `docs/06-release-plan.md`

