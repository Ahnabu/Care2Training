import { CARE2_ADMIN_ORIGIN, CARE2_API_BASE, toApiLang } from "@/lib/care2training-api";

export type UniversityPartner = Readonly<{
  id: number;
  country_id: number | null;
  name: string;
  image: string | null;
  order: number | null;
  status: string | null;
}>;

type HomePageResponse = Readonly<{
  partners?: UniversityPartner[];
}>;

export function partnerImageUrl(imagePath: string | null) {
  if (!imagePath) return "/brand/logo-mark.svg";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
  return `${CARE2_ADMIN_ORIGIN}/${imagePath.replace(/^\/+/, "")}`;
}

export async function fetchUniversityPartners(locale: string) {
  const lang = toApiLang(locale);
  const res = await fetch(`${CARE2_API_BASE}/home-page?lang=${encodeURIComponent(lang)}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return [] as UniversityPartner[];

  const json = (await res.json()) as HomePageResponse;
  const partners = (json.partners ?? []).filter((p) => (p.status ?? "active") === "active" && p.name);

  return partners.sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
}

