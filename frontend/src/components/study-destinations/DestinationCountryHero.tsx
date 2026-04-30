import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function DestinationCountryHero({
  title,
  subtitle,
  bgUrl,
  sideUrl,
  breadcrumbParentLabel,
  bookCtaLabel,
}: Readonly<{
  title: string;
  subtitle: string;
  bgUrl?: string;
  sideUrl?: string;
  breadcrumbParentLabel: string;
  bookCtaLabel: string;
}>) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_25px_50px_-30px_rgba(15,23,42,0.34)] dark:shadow-[0_28px_55px_-28px_rgba(0,0,0,0.55)]">
      <div className="relative grid min-h-[300px] gap-8 p-6 md:min-h-[360px] md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-10 lg:min-h-[400px] lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-950/94 via-blue-950/82 to-slate-950/90 md:from-violet-900/90 md:via-blue-900/76 md:to-slate-900/88"
          aria-hidden="true"
        />
        {bgUrl ? (
          <Image
            src={bgUrl}
            alt=""
            fill
            className="object-cover opacity-30 md:opacity-38"
            sizes="(max-width: 768px) 100vw, min(1360px, 100vw)"
            priority
          />
        ) : null}

        <div className="relative z-10 flex flex-col gap-4 md:gap-5">
          <nav className="text-[0.82rem] font-medium text-white/80" aria-label="Breadcrumb">
            <LocaleLink href="/study-destinations" className="hover:text-white hover:underline">
              {breadcrumbParentLabel}
            </LocaleLink>
            <span className="mx-2 text-white/45">/</span>
            <span className="text-white">{title}</span>
          </nav>

          <LocaleLink
            href="/book-appointment"
            className="inline-flex w-fit items-center rounded-full clay-button px-5 py-2.5 text-[0.82rem] font-montserrat font-bold text-white shadow-lg transition-transform duration-200 hover:brightness-110 active:scale-95 md:text-[0.87rem]"
          >
            {bookCtaLabel}
          </LocaleLink>

          <div className="grid gap-2 md:gap-2.5 pt-1">
            <h1 className="font-display text-[clamp(1.65rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="max-w-[46ch] text-base leading-relaxed text-white/92 md:text-lg lg:text-xl">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {sideUrl ? (
          <div className="relative z-10 mx-auto hidden max-h-[340px] w-full max-w-[300px] md:block md:max-h-[400px] md:max-w-none lg:max-h-[440px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-white/15 shadow-2xl shadow-black/25 ring-2 ring-white/15">
              <Image src={sideUrl} alt={title} fill className="object-cover object-top" sizes="(max-width: 1024px) 300px, 380px" priority />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
