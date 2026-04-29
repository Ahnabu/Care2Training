import type { Metadata } from "next";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export const metadata: Metadata = {
  title: "Study Destinations | Care2 Training",
  description: "Explore popular study destinations and get expert guidance.",
};

const destinations = [
  { slug: "uk", name: "United Kingdom", blurb: "Top universities, post-study pathways, and global career options." },
  { slug: "canada", name: "Canada", blurb: "Strong institutions and welcoming student experience." },
  { slug: "italy", name: "Italy", blurb: "Quality education with culture and history." },
] as const;

export default function DestinationsPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="Study Destinations"
        description="Browse destinations and see requirements, timelines, and the support we provide."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <LocaleLink
            key={d.slug}
            href={`/study-destinations/${d.slug}`}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80"
          >
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-[1rem] leading-relaxed text-muted-foreground">{d.blurb}</p>
            <p className="mt-4 font-semibold text-primary">View details</p>
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

