import type { Metadata } from "next";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export const metadata: Metadata = {
  title: "Blogs | Care2 Training",
  description: "Articles and updates to help you plan your study abroad journey.",
};

const posts = [
  { slug: "how-to-choose-a-destination", title: "How to Choose the Right Destination", excerpt: "A simple framework to decide where to study based on goals and budget." },
  { slug: "visa-prep-checklist", title: "Visa Preparation Checklist", excerpt: "What to prepare early to reduce delays and uncertainty." },
] as const;

export default function BlogsPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader title="Blogs" description="Practical guides, updates, and resources." />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {posts.map((p) => (
          <LocaleLink key={p.slug} href={`/blogs/${p.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">{p.title}</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">{p.excerpt}</p>
            <p className="mt-4 font-semibold text-primary">Read more</p>
          </LocaleLink>
        ))}
      </section>

      <TestimonialsSection showHeading={false} className="py-0 md:py-0 mt-12" />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}

