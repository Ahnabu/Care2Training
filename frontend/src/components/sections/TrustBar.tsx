import { cn } from "@/lib/utils";
import { partners } from "@/content/partners";

export function TrustBar({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn("glass-panel rounded-[2rem] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center gap-4 sm:gap-8 w-fit", className)}>
      {partners.map((p, index) => (
        <div key={p.name} className="flex items-center gap-4">
          <span className="font-lexend text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            {p.name}
          </span>
          {index < partners.length - 1 && (
            <div className="h-6 sm:h-8 w-[1px] bg-white/10 hidden sm:block"></div>
          )}
        </div>
      ))}
    </div>
  );
}

