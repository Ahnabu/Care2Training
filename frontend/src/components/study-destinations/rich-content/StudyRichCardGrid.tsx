import { BookOpen, GraduationCap, type LucideIcon } from "lucide-react";

function stripLeadingBullets(text: string): string {
  return text.replace(/^[\s•◆▪︎●○\-–—]+\s*/, "").trim();
}

export function StudyRichCardGrid({
  items,
  variant,
}: Readonly<{
  items: string[];
  variant: "university" | "course";
}>) {
  const Icon: LucideIcon = variant === "university" ? GraduationCap : BookOpen;
  const cleaned = items.map((t) => stripLeadingBullets(t)).filter(Boolean);

  return (
    <ul className="not-prose my-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {cleaned.map((text, i) => (
        <li key={`${i}-${text.slice(0, 24)}`}>
          <div className="group flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/45 px-5 py-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_14px_40px_-24px_var(--primary)] dark:bg-card/30">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="text-[1rem] font-medium leading-snug tracking-[-0.01em] text-foreground">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
