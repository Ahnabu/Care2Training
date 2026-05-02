import { LocaleLink } from "@/components/i18n/LocaleLink";

export function CTABand({
  className,
  primaryHref = "/book-appointment",
  primaryLabel = "Book appointment",
  secondaryHref = "/services",
  secondaryLabel = "Explore services",
  showLegalLinks = true,
}: Readonly<{
  className?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showLegalLinks?: boolean;
}>) {
  return (
    <section className={`${className ?? ""}`}>
      <div className="relative overflow-hidden rounded-[30px] border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Ready to move forward?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">
              Get expert advice for your next step abroad
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Start with a short consultation, then choose a clear path for applications, visas, and beyond.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
            <LocaleLink
              href={primaryHref}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full clay-button px-6 font-montserrat font-bold text-white transition-transform active:scale-95 duration-200"
            >
              {primaryLabel}
            </LocaleLink>
            <LocaleLink
              href={secondaryHref}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-border bg-background px-6 font-montserrat font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {secondaryLabel}
            </LocaleLink>
          </div>
        </div>

        {showLegalLinks ? (
          <div className="relative z-10 mt-8 border-t border-border/70 pt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.95rem] text-muted-foreground">By continuing, you agree to our</p>
            <div className="flex flex-wrap gap-4 text-[0.95rem]">
              <LocaleLink href="/terms" className="font-semibold text-foreground hover:text-primary">
                Terms
              </LocaleLink>
              <LocaleLink href="/privacy" className="font-semibold text-foreground hover:text-primary">
                Privacy
              </LocaleLink>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

