import { cn } from "@/lib/utils";
import { partners } from "@/content/partners";

export function TrustBar({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Trusted by</span>
      <div className="flex flex-wrap gap-2.5">
        {partners.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-foreground/90"
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

