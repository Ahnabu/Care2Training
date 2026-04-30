import { ClipboardCheck, FileText, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    title: "Consultation",
    desc: "Tell us your goals. We listen first, then recommend the clearest path forward.",
    icon: MessageSquare,
  },
  {
    title: "Plan & Eligibility",
    desc: "We map requirements, timelines, and next actions so you always know what's coming.",
    icon: FileText,
  },
  {
    title: "Apply with Confidence",
    desc: "We review documents and coordinate applications to reduce preventable delays.",
    icon: ClipboardCheck,
  },
  {
    title: "Prep for Arrival",
    desc: "Final readiness support, checklists, and guidance so you can start smoothly.",
    icon: Rocket,
  },
] as const;

export function ProcessSteps({
  showHeading = true,
  className,
}: Readonly<{
  showHeading?: boolean;
  className?: string;
}>) {
  return (
    <section className={`py-10 md:py-16 ${className ?? ""}`}>
      {showHeading ? (
        <header className="grid gap-3 max-w-[70ch] mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">How we work</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">Simple steps, real momentum</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We turn complexity into a guided workflow - so you can move forward with confidence.
          </p>
        </header>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, idx) => (
          <article
            key={s.title}
            className="relative overflow-hidden rounded-[30px] border border-border bg-card p-6 shadow-sm transition hover:border-border/80"
          >
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-[2px]" aria-hidden="true" />
            <div className="relative z-10 grid gap-3">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-background border border-border/70">
                  <s.icon size={22} strokeWidth={2.2} className="text-primary" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Step {idx + 1}
                </p>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.03em]">{s.title}</h3>
              <p className="text-[0.95rem] sm:text-[1rem] leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

