import type { Metadata } from "next";
import Image from "next/image";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About | Care2 Training",
  description: "Learn about Care2 Training and how we support learners worldwide.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="About Care2 Training"
        description="We help learners and professionals secure global opportunities through clear guidance, strong partners, and an end-to-end process."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="rounded-[30px] border border-border bg-card p-6 md:p-8 shadow-sm lg:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Our mission</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em]">Clarity, speed, and care</h2>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-muted-foreground">
            Every destination and program has details. We break them down into a practical plan, so you always know what to do next.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Guided workflow</p>
              <p className="mt-1 text-muted-foreground">Step-by-step momentum with fewer surprises.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Partner-ready</p>
              <p className="mt-1 text-muted-foreground">We align support to real application expectations.</p>
            </div>
          </div>
        </article>

        <aside className="rounded-[30px] border border-border bg-card p-6 md:p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Credibility</p>
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] border border-border/60 bg-background">
            <Image
              src="/care2training/assets/officer.BxylEVav_e5809e52b4.jpg"
              alt="Care2 Training advisor"
              fill
              sizes="(max-width: 1024px) 100vw, 32vw"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-4 grid gap-3">
            <p className="text-[1.05rem] leading-relaxed text-foreground">
              Trusted by learners navigating admissions and visa timelines.
            </p>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                ICEF / British Council / RCIC-aligned support
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                Clear checklists and document review
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                Realistic scheduling and follow-up
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <ProcessSteps />
      <TestimonialsSection />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}

