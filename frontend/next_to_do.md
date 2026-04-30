# 🗺️ Next To Do — Study Destinations & Nav Dropdown

## ✅ Done (this session)
- Added IT, FR, ES, DE, BG, ET locales to `routing.ts`
- Created `messages/it.json`, `fr.json`, `es.json`, `de.json`, `bg.json`, `et.json`
- Updated `SiteHeader` language switcher to show all 7 languages with flags
- Fixed `bn.json` to include `getToKnowAboutUs` and `experienceText` keys

---

## 🔧 Remaining Tasks

### 1. Nav Dropdown — Study Destinations

Update `SiteHeader.tsx` to replace the plain `studyDestinations` nav link with a
hover/click dropdown showing a **2-column grid** of all 16 countries — matching the screenshot.

**File:** `src/components/site/SiteHeader.tsx`

**All 16 destinations (from live site `edu.care2training.com`):**

| Column 1 | Column 2 |
|---|---|
| 🇨🇦 Study in Canada | 🇮🇪 Study in Ireland |
| 🇩🇪 Study in Germany | 🇮🇹 Study in Italy |
| 🇲🇾 Study in Malaysia | 🇫🇷 Study in France |
| 🇵🇱 Study in Poland | 🇭🇷 Study in Croatia |
| 🇦🇺 Study in Australia | 🇬🇧 Study in UK |
| 🇭🇺 Study in Hungary | 🇺🇸 Study in USA |
| 🇱🇹 Study in Lithuania | 🇱🇻 Study in Latvia |
| 🇲🇹 Study in Malta | 🇨🇾 Study in Cyprus |

**Route pattern:** `/country/study-in-{country}` (e.g. `/country/study-in-canada`)

---

### 2. Country Data Layer

**Strategy: Minimum Code, Maximum Impact**

One dynamic `[slug]` page + typed country data files + one shared template component.

```
src/
  data/
    countries.ts             ← master registry (slug, name, flag, accentColor)
    country/
      study-in-canada.ts
      study-in-uk.ts
      study-in-italy.ts
      study-in-germany.ts
      study-in-france.ts
      study-in-ireland.ts
      study-in-australia.ts
      study-in-malaysia.ts
      study-in-poland.ts
      study-in-croatia.ts
      study-in-hungary.ts
      study-in-usa.ts
      study-in-lithuania.ts
      study-in-latvia.ts
      study-in-malta.ts
      study-in-cyprus.ts
  components/
    country/
      CountryDetailTemplate.tsx   ← single reusable renderer
      CountryHero.tsx             ← hero banner + key stats pills
      CountryFactGrid.tsx         ← 2×2 glassmorphism cards
      CountryWhySection.tsx       ← animated bullet reasons
      CountryRequirements.tsx     ← collapsible accordion
      CountryTopUniversities.tsx  ← horizontal scroll cards with rank badges
```

**Country Data Shape (TypeScript):**

```ts
export type CountryData = {
  slug: string;            // "study-in-canada"
  name: string;            // "Canada"
  flag: string;            // "🇨🇦"
  accentColor: string;     // Tailwind color key e.g. "red"
  tagline: string;
  overview: string;
  stats: {
    universities: string;  // "250+"
    avgTuition: string;    // "CAD 15,000–35,000/yr"
    workPermit: string;    // "Post-Grad 3 yrs"
    intakes: string;       // "Jan / Sep"
  };
  whyStudyHere: string[];
  requirements: { title: string; items: string[] }[];
  topUniversities: { name: string; location: string; rank?: string }[];
};
```

---

### 3. Dynamic Route Setup

**New files to create:**

- `src/app/[locale]/country/[slug]/page.tsx`
- `src/app/country/[slug]/page.tsx` (redirect shim for non-locale access)

---

### 4. UI Design Goals

| Section | Design |
|---|---|
| Country Hero | Full-width gradient + flag + country name + 4 key stat pills |
| Facts Grid | 2×2 glassmorphism cards (Tuition, Visa, Language, Intakes) |
| Why Study Here | Animated icon list with entrance animations |
| Top Universities | Horizontal scroll cards with rank badge |
| Requirements | Collapsible accordion sections |
| CTA | "Book a Free Consultation" band |

---

## 📋 Execution Order

- [ ] Create `src/data/countries.ts` — registry of all 16 slugs
- [ ] Create 16 country data files in `src/data/country/`
- [ ] Build `CountryDetailTemplate.tsx` + sub-components
- [ ] Wire up `src/app/[locale]/country/[slug]/page.tsx`
- [ ] Update `SiteHeader.tsx` — Study Destinations nav dropdown
- [ ] Update `study-destinations/page.tsx` — premium grid listing all countries
- [ ] Test all locale routes work (`/en/country/study-in-canada`, `/fr/country/study-in-france` etc.)

---

> **Note:** Country detail page content lives in data files — NOT in next-intl translations.
> Only UI chrome (nav labels, buttons, tab names) needs translation.
