import { BookOpen, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function ServicesBentoGrid({
  showHeading = true,
  className,
}: Readonly<{
  showHeading?: boolean;
  className?: string;
}>) {
  const services = [
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
      accent: "from-indigo-500/15 to-transparent",
      lg: "lg:col-span-4",
    },
    {
      title: "Career Pathway",
      blurb: "Plan post-study options and build a future-proof career direction.",
      href: "/services/career-pathway",
      icon: Briefcase,
      accent: "from-indigo-300/30 to-transparent",
      lg: "lg:col-span-3",
    },
  ] as const;

  return (
    <section className={`py-12 md:py-16 ${className ?? ""}`}>
      {showHeading ? (
        <header className="grid gap-3 max-w-[70ch] mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Our Services</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">Clear guidance at every step</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            From selection to visa prep and onward planning, we keep your process simple and supportive.
          </p>
        </header>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-12">
        {services.map((s) => (
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
              <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{s.title}</h3>
              <p className="text-[1rem] leading-relaxed text-muted-foreground">{s.blurb}</p>
              <p className="mt-2 font-semibold text-primary group-hover:underline">View details</p>
            </div>
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}

