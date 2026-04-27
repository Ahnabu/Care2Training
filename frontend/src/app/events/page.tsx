import type { Metadata } from "next";
import Link from "next/link";

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
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Events</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Join our upcoming sessions to get clarity on destinations, requirements, and application steps.
        </p>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {events.map((e) => (
          <Link key={e.slug} href={`/events/${e.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{e.name}</h2>
              <span className="rounded-full bg-muted px-3 py-1 text-[0.9rem] font-semibold text-muted-foreground">{e.meta}</span>
            </div>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">{e.blurb}</p>
            <p className="mt-4 font-semibold text-primary">View event</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

