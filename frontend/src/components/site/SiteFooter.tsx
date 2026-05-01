"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { siteContact } from "@/content/offices";
import { Mail } from "lucide-react";

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

  const businessHours = [
    { country: "UK", hours: "Monday to Friday, 9am – 5pm" },
    { country: "Italy", hours: "Monday to Friday, 9am – 5pm" },
    { country: "Canada", hours: "Monday to Friday, 9am – 5pm" },
    { country: "Bulgaria", hours: "Monday to Friday, 9am – 5pm" },
    { country: "Estonia", hours: "Monday to Friday, 9am – 5pm" },
    { country: "Bangladesh", hours: "Saturday to Thursday, 10am – 6pm" },
    { country: "New Zealand", hours: "Monday to Friday, 9am – 5pm" },
  ] as const;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-10 lg:px-12 py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="grid gap-3">
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">Care2 Training</p>
            <p className="max-w-[52ch] text-[1rem] leading-relaxed text-muted-foreground">
              Guidance for study abroad, admissions, and career pathways—delivered with clarity, speed, and care.
            </p>
            <div className="flex flex-col gap-2.5 pt-2 text-[0.98rem]">
              <a className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors" href={`mailto:${siteContact.email}`}>
                <Mail size={16} className="text-muted-foreground" />
                {siteContact.email}
              </a>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
                {siteContact.phones.map((p) => (
                  <a key={p.tel} className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors" href={`tel:${p.tel}`}>
                    <span className="text-muted-foreground">{p.tel.startsWith("+880") ? "🇧🇩" : "🇬🇧"}</span>
                    {p.label}
                  </a>
                ))}
              </div>
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
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Business hours</p>
            <div className="grid gap-1.5 text-[0.9rem] text-muted-foreground">
              {businessHours.map((bh) => (
                <div key={bh.country} className="flex items-baseline gap-2">
                  <p className="font-semibold text-foreground text-xs tracking-wider min-w-fit">{bh.country}:</p>
                  <p className="text-[0.85rem] leading-tight">{bh.hours}</p>
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

