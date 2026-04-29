const faqs = [
  {
    q: "How fast can we start?",
    a: "After your first consultation request, we review your goals and share a clear plan. Typical onboarding can begin within a few business days (depending on your destination/program requirements).",
  },
  {
    q: "Do you help with visa documents and application forms?",
    a: "Yes. We guide you through document readiness, form completion, and submission steps, and we keep you updated with what comes next.",
  },
  {
    q: "What if my timeline is tight?",
    a: "We'll prioritize the most time-sensitive requirements first, then build a practical schedule around deadlines - so you can move forward without guesswork.",
  },
  {
    q: "Is there any obligation after the consultation?",
    a: "No. The consultation is for clarity. If you decide to proceed, we'll align on scope and next actions before anything else.",
  },
] as const;

export function FAQAccordion({
  showHeading = true,
  className,
}: Readonly<{
  showHeading?: boolean;
  className?: string;
}>) {
  return (
    <section className={`py-12 md:py-16 ${className ?? ""}`}>
      {showHeading ? (
        <header className="grid gap-3 max-w-[70ch] mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em]">Quick answers for confident decisions</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            If you have questions, we&apos;ve included the most common ones. If you don&apos;t see your answer, contact us.
          </p>
        </header>
      ) : null}

      <div className="grid gap-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-[30px] border border-border bg-card p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{item.q}</h3>
                <span aria-hidden="true" className="mt-1 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-4 text-[1rem] leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

