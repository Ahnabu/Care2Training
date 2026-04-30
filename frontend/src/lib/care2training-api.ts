import { defaultLocale, locales, type AppLocale } from "@/i18n/routing";

export const CARE2_ADMIN_ORIGIN = "https://admin.care2training.com";
export const CARE2_API_BASE = `${CARE2_ADMIN_ORIGIN}/api`;

const FETCH_REVALIDATE_SECONDS = 3600;

export type CountryListItem = {
  id: number;
  name: string;
  slug: string;
  order: string;
  is_top_destination: string;
  status: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
};

export type CountryContents = {
  hero_title: string;
  hero_subtitle: string;
  page_description: string;
  hero_bg_img: string | null;
  hero_st_img: string | null;
};

export type CountryDetail = {
  id: number;
  name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  contents: CountryContents | null;
  studies: unknown[];
};

export function care2AssetUrl(path: string | null | undefined): string | undefined {
  if (!path?.trim()) return undefined;
  const normalized = path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");
  return `${CARE2_ADMIN_ORIGIN}/${normalized}`;
}

/** Route segment e.g. `canada` → API slug `study-in-canada`. */
export function routeSlugToApiSlug(routeSlug: string): string {
  const s = routeSlug.trim().toLowerCase();
  if (s.startsWith("study-in-")) return s;
  return `study-in-${s}`;
}

/** API slug `study-in-canada` → route segment `canada`. */
export function apiSlugToRouteSlug(apiSlug: string): string {
  const prefix = "study-in-";
  return apiSlug.startsWith(prefix) ? apiSlug.slice(prefix.length) : apiSlug;
}

export function toApiLang(locale: string): AppLocale {
  return (locales as readonly string[]).includes(locale) ? (locale as AppLocale) : defaultLocale;
}

export async function fetchCountryList(): Promise<CountryListItem[]> {
  const res = await fetch(`${CARE2_API_BASE}/get-countries`, {
    next: { revalidate: FETCH_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return [];
  const json: { status?: boolean; data?: CountryListItem[] } = await res.json();
  if (!json.status || !Array.isArray(json.data)) return [];
  return json.data.filter((c) => c.status === "active");
}

export async function fetchCountryDetail(apiSlug: string, locale: string): Promise<CountryDetail | null> {
  const lang = toApiLang(locale);
  const url = `${CARE2_API_BASE}/country/${encodeURIComponent(apiSlug)}?lang=${encodeURIComponent(lang)}`;
  const res = await fetch(url, {
    next: { revalidate: FETCH_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const json: { status?: boolean; data?: CountryDetail } = await res.json();
  if (!json.status || !json.data) return null;
  return json.data;
}

export async function fetchDestinationRouteSlugs(): Promise<string[]> {
  const list = await fetchCountryList();
  return list.map((c) => apiSlugToRouteSlug(c.slug));
}
