import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getTranslations } from "next-intl/server";
import { apiSlugToRouteSlug, fetchCountryList } from "@/lib/care2training-api";

export async function StudyDestinationsListingPage() {
  const tNav = await getTranslations("nav");
  const tPage = await getTranslations("studyDestinationsPage");
  const destinations = await fetchCountryList();

  const sorted = [...destinations].sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader title={tNav("studyDestinations")} description={tPage("listingDescription")} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((d) => (
          <LocaleLink
            key={d.id}
            href={`/study-destinations/${apiSlugToRouteSlug(d.slug)}`}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/35 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
              {d.is_top_destination === "yes" ? (
                <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-primary">
                  {tPage("topBadge")}
                </span>
              ) : null}
            </div>
            {d.meta_description ? (
              <p className="mt-2 line-clamp-4 text-[1rem] leading-relaxed text-muted-foreground">{d.meta_description}</p>
            ) : null}
            <p className="mt-4 font-semibold text-primary">{tPage("viewDetails")}</p>
          </LocaleLink>
        ))}
      </section>

      <ProcessSteps showHeading={false} className="py-0 md:py-0 mt-12" />
      <TestimonialsSection showHeading={false} className="py-0 md:py-0 mt-12" />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}
