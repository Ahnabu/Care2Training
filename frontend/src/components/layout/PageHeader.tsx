import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: Readonly<{
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}>) {
  return (
    <header className={cn("grid gap-3 max-w-[70ch]", className)}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p> : null}
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em]">{title}</h1>
      {description ? <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{description}</p> : null}
    </header>
  );
}

