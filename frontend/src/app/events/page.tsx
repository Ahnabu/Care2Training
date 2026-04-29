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
  title: "Events | Care2 Training",
  description: "Upcoming events, seminars, and information sessions.",
};

const events = [
  { slug: "study-abroad-webinar", name: "Study Abroad Webinar", meta: "Online • 60 min", blurb: "A quick overview of destinations, timelines, and next steps." },
  { slug: "visa-documents-clinic", name: "Visa Documents Clinic", meta: "Office Visit • 45 min", blurb: "Bring your documents and get a checklist + improvements." },
] as const;

export default function EventsPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="Events"
        description="Join our upcoming sessions to get clarity on destinations, requirements, and application steps."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {events.map((e) => (
          <LocaleLink key={e.slug} href={`/events/${e.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{e.name}</h2>
              <span className="rounded-full bg-muted px-3 py-1 text-[0.9rem] font-semibold text-muted-foreground">{e.meta}</span>
            </div>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">{e.blurb}</p>
            <p className="mt-4 font-semibold text-primary">View event</p>
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

