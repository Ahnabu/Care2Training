import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CTABand } from "@/components/sections/CTABand";
import { care2AssetUrl, fetchCountryDetail, routeSlugToApiSlug } from "@/lib/care2training-api";
import { DestinationCountryHero } from "./DestinationCountryHero";

export async function DestinationDetailPageContent({
  locale,
  slug,
}: Readonly<{
  locale: string;
  slug: string;
}>) {
  const apiSlug = routeSlugToApiSlug(slug);
  const country = await fetchCountryDetail(apiSlug, locale);
  if (!country?.contents) notFound();

  const { contents } = country;
  const tNav = await getTranslations("nav");
  const tPage = await getTranslations("studyDestinationsPage");

  const bgUrl = care2AssetUrl(contents.hero_bg_img);
  const sideUrl = care2AssetUrl(contents.hero_st_img);

  const title = contents.hero_title?.trim() || country.name;
  const subtitle = contents.hero_subtitle?.trim() || "";

  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <DestinationCountryHero
        title={title}
        subtitle={subtitle}
        bgUrl={bgUrl}
        sideUrl={sideUrl}
        breadcrumbParentLabel={tNav("studyDestinations")}
        bookCtaLabel={`${tPage("ctaPrimary")} →`}
      />

      <article
        className="study-destination-prose prose prose-neutral mt-12 max-w-none text-[1.05rem] leading-relaxed dark:prose-invert md:mt-16 lg:mt-20 prose-headings:font-display prose-headings:tracking-[-0.03em] prose-h2:mt-12 prose-h2:scroll-mt-28 prose-h2:text-foreground prose-h2:first:mt-0 prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:underline-offset-4 prose-a:decoration-primary/50"
        dangerouslySetInnerHTML={{ __html: contents.page_description }}
      />

      <div className="mt-16 border-t border-border/60 md:mt-24" aria-hidden />

      <CTABand className="mt-10 md:mt-14" primaryLabel={tPage("ctaPrimary")} secondaryLabel={tPage("ctaSecondary")} />
    </main>
  );
}
