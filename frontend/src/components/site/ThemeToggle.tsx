"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch — render after mount so we know the real theme
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-border bg-background p-2.5 w-[38px] h-[38px]",
          className
        )}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-border bg-background p-2.5 text-foreground hover:border-primary hover:text-primary transition-colors duration-200",
        className
      )}
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
