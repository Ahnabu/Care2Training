# 10-day phased plan (execution)

## Phase 0 (Half day): Align + convert research → tasks
- ✅ Convert Gemini research table into a checklist
- ✅ Tag each item: **Must / Should / Could**
- ✅ Map each item to a route and/or reusable component

## Phase 1 (Days 1–2): Foundations
- ✅ Design tokens in `globals.css`
- ✅ Layout primitives (`Container`, `Section`, `PageHeader`)
- ✅ Global `SiteHeader` + `SiteFooter`
- ✅ Route skeleton for all pages
- ✅ Add **i18n foundations**: locale-prefixed routes, language switcher, translation message files
- ✅ Add **lead-capture entry modal** baseline (auto-open + cooldown + link to multi-step appointment form)

## Phase 2 (Days 3–6): Build pages fast with reusable sections
- [ ] Implement reusable sections (hero/trust/process/testimonials/FAQ/CTA)
- [ ] Assemble pages in priority order:
  - Home → Destinations → Services → About → Contact → Events → Blogs → Book appointment

## Phase 3 (Days 7–8): UX polish
- [ ] IA and navigation improvements
- [ ] Consistency pass: spacing, typography, iconography
- [ ] Trust signals: partners, testimonials, offices, legal links

## Phase 4 (Days 9–10): Performance + accessibility + QA + release
- [ ] Fix image `sizes`, reduce CLS risks
- [ ] Focus states, keyboard nav, labels, contrast checks
- [ ] Cross-browser/responsive QA checklist
- [ ] i18n QA: validate routing + language switcher for all top-level pages
- [ ] Lead modal QA: verify frequency control and mobile responsiveness

## Research checklist
Implemented in `docs/07-research-checklist.md`.

## i18n & lead capture notes
- Locales currently targeted: **English (en)** and **Bangla (bn)**. Add more once copy is ready.
- Entry modal should not annoy users: enforce a cooldown (default 3 days) and allow the user to snooze.

