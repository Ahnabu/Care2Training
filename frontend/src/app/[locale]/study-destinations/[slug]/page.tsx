import type { Metadata } from "next";
import { DestinationDetailPageContent } from "@/components/study-destinations/DestinationDetailPageContent";
import { fetchCountryDetail, fetchDestinationRouteSlugs, routeSlugToApiSlug } from "@/lib/care2training-api";
import { locales } from "@/i18n/routing";

type Props = Readonly<{ params: Promise<{ locale: string; slug: string }> }>;

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchDestinationRouteSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const country = await fetchCountryDetail(routeSlugToApiSlug(slug), locale);
  if (!country) {
    return { title: "Study destination | Care2 Training" };
  }
  const kw = country.meta_keywords
    ?.split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return {
    title: country.meta_title || `${country.name} | Care2 Training`,
    description: country.meta_description || undefined,
    ...(kw?.length ? { keywords: kw } : {}),
  };
}

export default async function StudyDestinationDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  return <DestinationDetailPageContent locale={locale} slug={slug} />;
}
