"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { offices, siteContact } from "@/content/offices";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Study Destinations", href: "/study-destinations" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const pathname = usePathname();
  const locale = useMemo(() => {
    const first = (pathname || "/").split("/")[1];
    return first === "bn" ? "bn" : "en";
  }, [pathname]);

  function hrefWithLocale(href: string) {
    // Keep already-prefixed links as-is.
    if (/^\/(en|bn)(\/|$)/.test(href)) return href;
    return `/${locale}${href === "/" ? "" : href}`;
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="grid gap-3">
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">Care2 Training</p>
            <p className="max-w-[52ch] text-[1rem] leading-relaxed text-muted-foreground">
              Guidance for study abroad, admissions, and career pathways—delivered with clarity, speed, and care.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[0.98rem]">
              <a className="font-semibold text-foreground hover:text-primary" href={`mailto:${siteContact.email}`}>
                {siteContact.email}
              </a>
              <span className="text-muted-foreground">•</span>
              {siteContact.phones.map((p, idx) => (
                <span key={p.tel} className="inline-flex items-center gap-3">
                  {idx === 1 ? <span className="text-muted-foreground">•</span> : null}
                  <a className="font-semibold text-foreground hover:text-primary" href={`tel:${p.tel}`}>
                    {p.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Quick links</p>
            <div className="grid gap-2.5">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={hrefWithLocale(l.href)}
                  className="text-[1rem] font-semibold text-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={hrefWithLocale("/book-appointment")}
                className="text-[1rem] font-semibold text-foreground hover:text-primary"
              >
                Book appointment
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Offices</p>
            <div className="grid gap-3 text-[0.98rem] text-muted-foreground">
              {offices.map((o) => (
                <div key={o.country}>
                  <p className="font-semibold text-foreground">{o.country}</p>
                  <p>{o.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.95rem] text-muted-foreground">Copyright © {year} Care2Training. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-[0.95rem]">
            <Link className="font-semibold text-foreground hover:text-primary" href={hrefWithLocale("/terms")}>
              Terms
            </Link>
            <Link className="font-semibold text-foreground hover:text-primary" href={hrefWithLocale("/privacy")}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

