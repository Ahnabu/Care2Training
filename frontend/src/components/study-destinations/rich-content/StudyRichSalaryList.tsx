import { BriefcaseBusiness } from "lucide-react";

export type SalaryRow = { title: string; value: string };

function stripLeadingBullets(text: string): string {
  return text.replace(/^[\s•◆▪︎●○\-–—]+\s*/, "").trim();
}

/** Split on first colon; salary/value often contains extra punctuation. */
export function parseColonSalaryRow(text: string): SalaryRow | null {
  const line = stripLeadingBullets(text);
  const idx = line.indexOf(":");
  if (idx <= 0) return null;
  const title = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  if (!title || !value) return null;
  return { title, value };
}

export function StudyRichSalaryList({ items }: Readonly<{ items: SalaryRow[] }>) {
  return (
    <ul className="not-prose my-8 grid list-none gap-3 p-0">
      {items.map(({ title, value }, i) => (
        <li
          key={`${i}-${title.slice(0, 20)}`}
          className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/25 px-4 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span className="flex items-start gap-3 text-[1rem] font-semibold leading-snug text-foreground">
            <BriefcaseBusiness className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            {title}
          </span>
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1.5 text-center text-sm font-bold tracking-tight text-emerald-700 ring-1 ring-emerald-500/25 dark:bg-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-500/30">
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
