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

const ADMIN_API_BASE = "https://admin.care2training.com/api";
const ADMIN_ASSET_BASE = "https://admin.care2training.com";

export function partnerImageUrl(imagePath: string | null) {
  if (!imagePath) return "/brand/logo-mark.svg";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
  return `${ADMIN_ASSET_BASE}/${imagePath.replace(/^\/+/, "")}`;
}

export async function fetchUniversityPartners(locale: string) {
  const lang = locale === "bn" ? "bn" : "en";
  const res = await fetch(`${ADMIN_API_BASE}/home-page?lang=${encodeURIComponent(lang)}`, {
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

