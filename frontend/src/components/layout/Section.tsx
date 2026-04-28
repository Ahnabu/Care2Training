import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return <section className={cn("py-12 md:py-16", className)}>{children}</section>;
}

