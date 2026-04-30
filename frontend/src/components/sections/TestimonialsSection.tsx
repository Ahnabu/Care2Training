import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha R.",
    role: "Postgraduate applicant",
    quote:
      "The guidance was clear from day one. We always knew the next step, and the final preparation checklist helped me feel ready.",
  },
  {
    name: "M. Rahman",
    role: "Visa support client",
    quote:
      "Fast communication, strong document review, and realistic timelines. The process felt structured and stress-free.",
  },
  {
    name: "Sarah K.",
    role: "Career pathway advisor",
    quote:
      "I got a plan for what happens after graduation, not just during admission. That made my decision much easier.",
  },
] as const;

export function TestimonialsSection({
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
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Success stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">Trusted guidance. Better outcomes.</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Real learners, real journeys. Here&apos;s what clients value most about the Care2Training experience.
          </p>
        </header>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="relative overflow-hidden rounded-[30px] border border-border bg-card p-7 shadow-sm"
          >
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} strokeWidth={2} className="text-primary" fill="none" />
              ))}
            </div>
            <blockquote className="mt-4 text-[0.95rem] sm:text-[1rem] leading-relaxed text-foreground/95">{t.quote}</blockquote>
            <div className="mt-6">
              <p className="font-display text-[1.1rem] sm:text-xl font-bold tracking-[-0.02em]">{t.name}</p>
              <p className="text-[0.9rem] sm:text-[0.98rem] text-muted-foreground">{t.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

