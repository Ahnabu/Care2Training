import {
  CheckCircle2,
  ArrowRight,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { ServiceData } from "@/content/services";

/* ─────────────────────────────────────────────────────────────── */
/*  Service Detail Page – Premium Redesign                        */
/* ─────────────────────────────────────────────────────────────── */
export function ServiceDetailContent({
  service,
}: Readonly<{ service: ServiceData }>) {
  const Icon = service.icon;

  return (
    <main className="mx-auto w-full max-w-[1360px] px-5 md:px-10 lg:px-12 py-10 md:py-14">

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║  HERO – full-bleed gradient card                 ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)] dark:shadow-[0_36px_68px_-24px_rgba(0,0,0,0.6)]">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0c2a4d] to-[#0a1929]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/20 blur-[100px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-violet-600/15 blur-[90px]" aria-hidden />

        <div className="relative z-10 grid gap-8 p-7 sm:p-10 md:p-14 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="grid gap-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[0.78rem] font-medium text-white/60" aria-label="Breadcrumb">
              <LocaleLink href="/" className="transition-colors hover:text-white/90">Home</LocaleLink>
              <span className="text-white/30">/</span>
              <LocaleLink href="/services" className="transition-colors hover:text-white/90">Services</LocaleLink>
              <span className="text-white/30">/</span>
              <span className="text-white/90">{service.title}</span>
            </nav>

            {/* Badge + Icon row */}
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/15 backdrop-blur-lg">
                <Icon className="size-6 text-primary" aria-hidden />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-widest text-primary ring-1 ring-primary/25">
                Our Service
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white">
              {service.title}
            </h1>

            <p className="max-w-[60ch] text-[1.02rem] leading-[1.7] text-white/80 md:text-[1.08rem]">
              {service.heroDescription}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <LocaleLink
                href="/book-appointment"
                className="inline-flex items-center gap-2 rounded-full clay-button px-6 py-3 text-[0.88rem] font-montserrat font-bold text-white shadow-xl transition-transform duration-200 hover:brightness-110 active:scale-[0.97]"
              >
                Book appointment <ArrowRight className="size-4" />
              </LocaleLink>
              <LocaleLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.88rem] font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              >
                <Phone className="size-4" /> Talk to an expert
              </LocaleLink>
            </div>
          </div>

          {/* Stat badge */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative grid place-items-center gap-2 rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-12 py-10 text-center backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.06]" aria-hidden />
              <span className="font-display text-[3.5rem] font-black leading-none tracking-tight text-white">
                {service.stat.value}
              </span>
              <span className="max-w-[15ch] text-[0.82rem] font-medium leading-snug text-white/60">
                {service.stat.label}
              </span>
            </div>
          </div>

          {/* Mobile stat - compact */}
          <div className="flex lg:hidden items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
            <span className="font-display text-3xl font-black text-white">{service.stat.value}</span>
            <span className="text-[0.85rem] leading-snug text-white/60">{service.stat.label}</span>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║  CONTENT – Two-column layout on lg               ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14 md:mt-16">

        {/* ── Left column ─────────────────────────────── */}
        <div className="grid content-start gap-12">

          {/* Overview */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-4 text-[1.05rem] leading-[1.75] text-muted-foreground">
              {service.overview}
            </p>
          </section>

          {/* Key Benefits */}
          <section>
            <SectionLabel>Key Benefits</SectionLabel>
            <div className="mt-5 grid gap-3">
              {service.benefits.map((b, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-3.5 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md dark:bg-card/30"
                >
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <CheckCircle2 className="size-[18px]" aria-hidden />
                  </span>
                  <p className="text-[0.95rem] font-medium leading-snug text-foreground">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Process */}
          {service.process.length > 0 && (
            <section>
              <SectionLabel>Our Process</SectionLabel>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.process.map((step, i) => (
                  <article
                    key={i}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/70 p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md dark:bg-card/30"
                  >
                    {/* Background glow */}
                    <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/8 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" aria-hidden />

                    <div className="relative z-10 grid gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-[0.8rem] font-bold text-white shadow-sm shadow-primary/20">
                          {i + 1}
                        </span>
                        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Step {i + 1}
                        </span>
                      </div>
                      <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Why Choose Us */}
          <section>
            <SectionLabel>Why Choose Us</SectionLabel>
            <div className="mt-5 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/[0.04] via-card/80 to-card/60 p-6 shadow-sm dark:from-primary/[0.06]">
              <p className="text-[1.02rem] leading-[1.75] text-foreground/90">
                {service.whyChooseUs}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[0.88rem] font-semibold text-primary">
                <CheckCircle2 className="size-4" aria-hidden />
                <span>{service.stat.value} {service.stat.label.toLowerCase()}</span>
              </div>
            </div>
          </section>
        </div>

        {/* ── Right column – sticky sidebar ────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 grid gap-5">

            {/* Quick contact card */}
            <div className="rounded-[1.5rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-md dark:bg-card/30">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Need help?</p>
              <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-foreground">
                Get free consultation
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                Speak with our expert advisors about {service.title.toLowerCase()}.
              </p>
              <LocaleLink
                href="/book-appointment"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl clay-button px-5 py-2.5 text-[0.88rem] font-montserrat font-bold text-white transition-transform active:scale-[0.97]"
              >
                Book appointment <ArrowRight className="size-4" />
              </LocaleLink>
              <div className="mt-3 grid gap-1.5 text-[0.82rem] text-muted-foreground">
                <a href="tel:+8801842497766" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <span>🇧🇩</span> +880 1842 497 766
                </a>
                <a href="tel:+4402035762072" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <span>🇬🇧</span> +44 0203 576 2072
                </a>
              </div>
            </div>

            {/* Other services card */}
            <div className="rounded-[1.5rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-md dark:bg-card/30">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Other Services
              </p>
              <div className="mt-3 grid gap-1">
                <OtherServicesLinks currentSlug={service.slug} />
              </div>
              <LocaleLink
                href="/services"
                className="mt-3 inline-flex items-center gap-1 text-[0.84rem] font-semibold text-primary hover:underline"
              >
                View all services <ArrowRight className="size-3.5" />
              </LocaleLink>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Mobile other services ──────────────────────── */}
      <section className="mt-10 lg:hidden">
        <SectionLabel>Explore Other Services</SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <OtherServicesLinksPills currentSlug={service.slug} />
        </div>
      </section>

      {/* ── CTA Band ──────────────────────────────────── */}
      <div className="mt-8 border-t border-border/50" aria-hidden />
      <section className="py-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/4 to-transparent" aria-hidden />
          <div className="relative z-10 grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="grid gap-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Ready to move forward?</p>
              <h2 className="font-display text-2xl font-bold tracking-[-0.04em] md:text-3xl">
                Get expert advice for your next step abroad
              </h2>
              <p className="text-[0.95rem] text-muted-foreground leading-relaxed">
                Start with a short consultation, then choose a clear path for applications, visas, and beyond.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end shrink-0">
              <LocaleLink
                href="/book-appointment"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full clay-button px-6 font-montserrat font-bold text-white transition-transform active:scale-95 duration-200"
              >
                Book appointment
              </LocaleLink>
              <LocaleLink
                href="/services"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-border bg-background px-6 font-montserrat font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Explore services
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────── */
/*  Helpers                                            */
/* ─────────────────────────────────────────────────── */

/** Consistent section label */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-[-0.03em] text-foreground md:text-2xl">
      <span className="inline-block h-6 w-1 rounded-full bg-primary" aria-hidden />
      {children}
    </h2>
  );
}

/** Sidebar links – compact rows */
function OtherServicesLinks({ currentSlug }: { currentSlug: string }) {
  const all = [
    { slug: "admission-guidance", label: "Admission Guidance", emoji: "🎓" },
    { slug: "visa-support", label: "Visa Support", emoji: "🛂" },
    { slug: "career-pathway", label: "Career Counseling", emoji: "💼" },
    { slug: "scholarship-assistance", label: "Scholarship Assistance", emoji: "🏅" },
    { slug: "job-placement", label: "Job Placement", emoji: "🤝" },
    { slug: "language-coaching", label: "Language Coaching", emoji: "🗣️" },
  ];
  return (
    <>
      {all
        .filter((s) => s.slug !== currentSlug)
        .map((s) => (
          <LocaleLink
            key={s.slug}
            href={`/services/${s.slug}`}
            className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[0.88rem] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
          >
            <span className="text-base leading-none">{s.emoji}</span>
            {s.label}
            <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground/50" />
          </LocaleLink>
        ))}
    </>
  );
}

/** Mobile – pill-style links */
function OtherServicesLinksPills({ currentSlug }: { currentSlug: string }) {
  const all = [
    { slug: "admission-guidance", label: "Admission Guidance", emoji: "🎓" },
    { slug: "visa-support", label: "Visa Support", emoji: "🛂" },
    { slug: "career-pathway", label: "Career Counseling", emoji: "💼" },
    { slug: "scholarship-assistance", label: "Scholarship Assistance", emoji: "🏅" },
    { slug: "job-placement", label: "Job Placement", emoji: "🤝" },
    { slug: "language-coaching", label: "Language Coaching", emoji: "🗣️" },
  ];
  return (
    <>
      {all
        .filter((s) => s.slug !== currentSlug)
        .map((s) => (
          <LocaleLink
            key={s.slug}
            href={`/services/${s.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-2.5 text-[0.88rem] font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md dark:bg-card/30"
          >
            <span>{s.emoji}</span>
            {s.label}
          </LocaleLink>
        ))}
    </>
  );
}
