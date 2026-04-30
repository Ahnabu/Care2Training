import { fetchUniversityPartners, partnerImageUrl } from "@/lib/partnersApi";
import { PartnersSlider } from "./PartnersSlider";
import { getTranslations } from "next-intl/server";

export async function PartnersSection({
  locale,
  className,
}: Readonly<{
  locale: string;
  className?: string;
}>) {
  const t = await getTranslations();
  const partners = await fetchUniversityPartners(locale);
  const items = partners
    .filter((p) => p.image)
    .map((p) => ({
      key: `${p.id}-${p.image}`,
      name: p.name,
      src: partnerImageUrl(p.image),
    }));

  if (items.length === 0) return null;

  return (
    <section className={`py-10 md:py-20 ${className ?? ""}`}>
      <header className="mb-11 max-w-[70ch]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {t("partners.badge")}
        </p>
        <div className="mt-3 grid gap-3">
          <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">
            {t("partners.title")}
          </h2>
          <p className="max-w-[56ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("partners.subtitle")}
          </p>
        </div>
        <div
          className="mt-6 flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_6px_rgba(39,71,202,0.12)]" />
          <span className="h-px flex-1 max-w-[min(420px,72vw)] bg-linear-to-r from-primary/85 via-primary/35 to-transparent" />
        </div>
      </header>

      <div className="relative rounded-[28px] border border-border/80 bg-card shadow-(--shadow-soft)">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
          aria-hidden="true"
        >
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />
          <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-indigo-400/9 blur-3xl" />
        </div>


        <div className="relative z-10 overflow-visible px-5 pb-9 pt-7 md:px-10 md:pb-11 md:pt-8">
          <PartnersSlider items={items} />
        </div>
      </div>
    </section>
  );
}
