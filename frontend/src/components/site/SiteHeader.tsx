"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Study Destinations", href: "/study-destinations" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold tracking-[-0.04em]">
              C2
            </span>
            <span className="grid leading-tight">
              <span className="font-display text-[1.02rem] font-bold tracking-[-0.02em]">Care2 Training</span>
              <span className="text-[0.9rem] text-muted-foreground">Study abroad guidance</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[0.98rem] font-medium text-foreground/90 hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-[0.95rem] font-semibold text-foreground shadow-sm hover:border-border/80"
              aria-label="Language"
            >
              English <ChevronDown size={14} />
            </button>

            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[0.98rem] font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Book appointment
            </Link>

            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center rounded-xl border border-border bg-background p-2.5 text-foreground hover:border-border/80"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn("lg:hidden border-t border-border/60", open ? "block" : "hidden")}>
        <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-4">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="pt-2 text-[0.9rem] text-muted-foreground">© {year} Care2Training</p>
          </div>
        </div>
      </div>
    </header>
  );
}

