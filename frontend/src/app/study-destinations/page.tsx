import type { Metadata } from "next";
import Link from "next/link";

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
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Study Destinations</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Browse destinations and see requirements, timelines, and the support we provide.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/study-destinations/${d.slug}`}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80"
          >
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-[1rem] leading-relaxed text-muted-foreground">{d.blurb}</p>
            <p className="mt-4 font-semibold text-primary">View details</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

