import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)]",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export { Card };
