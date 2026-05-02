import { getServiceBySlug, type ServiceData } from "@/content/services";
import { CARE2_API_BASE, toApiLang } from "@/lib/care2training-api";

const FETCH_REVALIDATE_SECONDS = 60 * 30;

const LEGACY_TO_API_SLUG: Record<string, string> = {
  "visa-support": "visa-application-support",
  "career-pathway": "career-counseling",
  "job-placement": "job-placement-service",
};

const API_TO_LEGACY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(LEGACY_TO_API_SLUG).map(([legacy, api]) => [api, legacy]),
);

type LocalizedFieldMap = Record<string, string>;

type ApiServiceStaticContent = Readonly<{
  overview_title?: string;
  overview_description?: string;
  why_title?: string;
  why_description?: string;
  why_success?: string;
}>;

type ApiService = Readonly<{
  title?: string;
  slug?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  static_content?: ApiServiceStaticContent | null;
}>;

type ApiServicesResponse = Readonly<{
  status?: boolean;
  data?: ApiService[];
}>;

function toApiServiceSlug(slug: string): string {
  return LEGACY_TO_API_SLUG[slug] ?? slug;
}

function toLegacyServiceSlug(slug: string): string {
  return API_TO_LEGACY_SLUG[slug] ?? slug;
}

function parseLocalizedField(raw: string | undefined, locale: string): string | undefined {
  if (!raw?.trim()) return undefined;

  // API stores some fields as JSON string maps e.g. {"en":"...","bg":"..."}
  if (raw.trim().startsWith("{")) {
    try {
      const map = JSON.parse(raw) as LocalizedFieldMap;
      if (typeof map[locale] === "string" && map[locale].trim()) return map[locale].trim();
      if (typeof map.en === "string" && map.en.trim()) return map.en.trim();
      const first = Object.values(map).find((v) => typeof v === "string" && v.trim());
      return first?.trim();
    } catch {
      return raw;
    }
  }

  return raw;
}

function findFallbackService(slug: string): ServiceData | undefined {
  return getServiceBySlug(slug) ?? getServiceBySlug(toLegacyServiceSlug(slug));
}

function mapApiServiceToViewModel(api: ApiService, locale: string): ServiceData | null {
  const slug = api.slug?.trim();
  if (!slug) return null;

  const legacySlug = toLegacyServiceSlug(slug);
  const fallback = findFallbackService(legacySlug);
  if (!fallback) return null;

  const staticContent = api.static_content;
  const overviewTitleFromStatic = parseLocalizedField(staticContent?.overview_title, locale);
  const whyTitleFromStatic = parseLocalizedField(staticContent?.why_title, locale);
  const overviewFromStatic = parseLocalizedField(staticContent?.overview_description, locale);
  const whyFromStatic = parseLocalizedField(staticContent?.why_description, locale);

  const title = api.title?.trim() || fallback.title;
  const description = api.description?.trim() || fallback.heroDescription;

  const showFallbackLists = locale === "en";

  return {
    ...fallback,
    slug: legacySlug,
    title,
    overviewTitle: overviewTitleFromStatic?.trim() || fallback.overviewTitle,
    whyTitle: whyTitleFromStatic?.trim() || fallback.whyTitle,
    metaTitle: api.meta_title?.trim() || fallback.metaTitle,
    metaDescription: api.meta_description?.trim() || fallback.metaDescription,
    heroDescription: description,
    overview: overviewFromStatic?.trim() || fallback.overview,
    whyChooseUs: whyFromStatic?.trim() || fallback.whyChooseUs,
    benefits: showFallbackLists ? fallback.benefits : [],
    process: showFallbackLists ? fallback.process : [],
  };
}

export async function fetchServices(locale: string): Promise<ServiceData[]> {
  const lang = toApiLang(locale);
  const res = await fetch(`${CARE2_API_BASE}/services?lang=${encodeURIComponent(lang)}`, {
    next: { revalidate: FETCH_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) return [];
  const json = (await res.json()) as ApiServicesResponse;
  if (!json.status || !Array.isArray(json.data)) return [];

  return json.data
    .map((item) => mapApiServiceToViewModel(item, lang))
    .filter((item): item is ServiceData => Boolean(item));
}

export async function fetchServiceBySlug(slug: string, locale: string): Promise<ServiceData | null> {
  const services = await fetchServices(locale);
  if (services.length > 0) {
    const apiSlug = toApiServiceSlug(slug);
    const found = services.find((service) => service.slug === slug || toApiServiceSlug(service.slug) === apiSlug);
    if (found) return found;
  }

  // Last resort fallback keeps route alive if API temporarily fails.
  return findFallbackService(slug) ?? null;
}