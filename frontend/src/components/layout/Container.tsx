import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12", className)}>{children}</div>;
}

