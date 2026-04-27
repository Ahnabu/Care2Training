import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Care2 Training",
  description: "Explore our services for admissions, visas, and study abroad success.",
};

const services = [
  { slug: "admission-guidance", name: "Admission Guidance", blurb: "Program selection, documents, and university applications." },
  { slug: "visa-support", name: "Visa Support", blurb: "Step-by-step preparation and submission support." },
  { slug: "career-pathway", name: "Career Pathway", blurb: "Plan your post-study options and long-term growth." },
] as const;

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Services</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Clear guidance at every step—from choosing a destination to preparing your application.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80">
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{s.name}</h2>
            <p className="mt-2 text-[1rem] leading-relaxed text-muted-foreground">{s.blurb}</p>
            <p className="mt-4 font-semibold text-primary">View service</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

