import { BookOpen, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { ServiceData } from "@/content/services";

type ServiceCard = Readonly<{
  title: string;
  blurb: string;
  href: string;
  icon: ServiceData["icon"];
  accent: string;
  lg: string;
}>;

const DEFAULT_CARDS: readonly ServiceCard[] = [
  {
    title: "Admission Guidance",
    blurb: "Choose the right program, streamline documents, and apply confidently.",
    href: "/services/admission-guidance",
    icon: GraduationCap,
    accent: "from-primary/15 to-transparent",
    lg: "lg:col-span-5",
  },
  {
    title: "Visa Support",
    blurb: "Step-by-step preparation for a smooth submission and fast follow-up.",
    href: "/services/visa-support",
    icon: ShieldCheck,
    accent: "from-primary/10 to-transparent",
    lg: "lg:col-span-4",
  },
  {
    title: "Career Pathway",
    blurb: "Plan post-study options and build a future-proof career direction.",
    href: "/services/career-pathway",
    icon: Briefcase,
    accent: "from-primary/8 to-transparent",
    lg: "lg:col-span-3",
  },
];

function summarize(input: string, max = 115): string {
  const text = input.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function mapServicesToCards(services: ServiceData[] | undefined): ServiceCard[] {
  if (!services?.length) return [...DEFAULT_CARDS];

  const layout = [
    { accent: "from-primary/15 to-transparent", lg: "lg:col-span-5" },
    { accent: "from-primary/10 to-transparent", lg: "lg:col-span-4" },
    { accent: "from-primary/8 to-transparent", lg: "lg:col-span-3" },
  ] as const;

  return services.slice(0, 3).map((service, index) => {
    const slot = layout[index] ?? layout[layout.length - 1];
    return {
      title: service.title,
      blurb: summarize(service.heroDescription || service.overview),
      href: `/services/${service.slug}`,
      icon: service.icon,
      accent: slot.accent,
      lg: slot.lg,
    };
  });
}

export function ServicesBentoGrid({
  showHeading = true,
  className,
  services,
  labels,
}: Readonly<{
  showHeading?: boolean;
  className?: string;
  services?: ServiceData[];
  labels?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    viewDetails?: string;
  };
}>) {
  const cards = mapServicesToCards(services);

  return (
    <section className={`py-10 md:py-16 ${className ?? ""}`}>
      {showHeading ? (
        <header className="grid gap-3 max-w-[70ch] mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">{labels?.eyebrow ?? "Our Services"}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">{labels?.title ?? "Clear guidance at every step"}</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {labels?.subtitle ?? "From selection to visa prep and onward planning, we keep your process simple and supportive."}
          </p>
        </header>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-12">
        {cards.map((s) => (
          <LocaleLink
            key={s.href}
            href={s.href}
            className={`${s.lg} group relative overflow-hidden rounded-[30px] border border-border bg-card p-6 shadow-sm transition hover:border-border/80`}
          >
            <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${s.accent} opacity-80`} aria-hidden="true" />
            <div className="relative z-10 grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-background border border-border/70">
                  <s.icon size={22} strokeWidth={2.2} className="text-primary" />
                </div>
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-background border border-border/70 text-muted-foreground">
                  <BookOpen size={18} strokeWidth={2.2} />
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.03em] mt-1">{s.title}</h3>
              <p className="text-[0.95rem] sm:text-[1rem] leading-relaxed text-muted-foreground">{s.blurb}</p>
              <p className="mt-2 text-[0.95rem] font-semibold text-primary group-hover:underline">{labels?.viewDetails ?? "View details"}</p>
            </div>
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}

