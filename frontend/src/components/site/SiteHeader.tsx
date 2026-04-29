"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const locale = useMemo(() => {
    const first = (pathname || "/").split("/")[1];
    return first === "bn" ? "bn" : "en";
  }, [pathname]);

  const nav = useMemo(
    () => [
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.studyDestinations"), href: "/study-destinations" },
      { label: t("nav.services"), href: "/services" },
      { label: t("nav.events"), href: "/events" },
      { label: t("nav.blogs"), href: "/blogs" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t]
  );

  function hrefWithLocale(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  function switchLocale(nextLocale: "en" | "bn") {
    const parts = (pathname || "/").split("/");
    if (parts.length < 2) return router.push(`/${nextLocale}`);
    parts[1] = nextLocale;
    const nextPath = parts.join("/") || `/${nextLocale}`;
    setLangOpen(false);
    router.push(nextPath);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href={hrefWithLocale("/")} className="inline-flex items-center gap-3">
            <span className="relative h-12 w-12 md:h-13 md:w-13 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <Image
                src="/care2training/assets/logo2.jpeg"
                alt="Care2 Training"
                fill
                sizes="(max-width: 768px) 48px, 52px"
                className="object-contain scale-[1.08] contrast-125 saturate-110"
                priority
              />
            </span>
            <span className="grid leading-tight">
              <span className="font-display text-[1.02rem] font-bold tracking-[-0.02em]">{t("site.name")}</span>
              <span className="text-[0.9rem] text-muted-foreground">{t("site.tagline")}</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={hrefWithLocale(item.href)}
                className="text-[0.98rem] font-medium text-foreground/90 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="relative hidden md:block">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-[0.95rem] font-semibold text-foreground shadow-sm hover:border-border/80"
                aria-label={t("language.label")}
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {locale === "bn" ? t("language.bangla") : t("language.english")} <ChevronDown size={14} />
              </button>
              <div className={cn("absolute right-0 mt-2 w-44 rounded-2xl border border-border bg-background shadow-sm overflow-hidden", langOpen ? "block" : "hidden")}>
                <button
                  type="button"
                  className={cn("w-full px-4 py-2.5 text-left text-[0.98rem] font-semibold hover:bg-muted", locale === "en" ? "text-primary" : "text-foreground")}
                  onClick={() => switchLocale("en")}
                >
                  {t("language.english")}
                </button>
                <button
                  type="button"
                  className={cn("w-full px-4 py-2.5 text-left text-[0.98rem] font-semibold hover:bg-muted", locale === "bn" ? "text-primary" : "text-foreground")}
                  onClick={() => switchLocale("bn")}
                >
                  {t("language.bangla")}
                </button>
              </div>
            </div>

            <Link
              href={hrefWithLocale("/book-appointment")}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[0.98rem] font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              {t("site.cta.bookAppointment")}
            </Link>

            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center rounded-xl border border-border bg-background p-2.5 text-foreground hover:border-border/80"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn("lg:hidden border-t border-border/60", mobileOpen ? "block" : "hidden")}>
        <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-4">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={hrefWithLocale(item.href)}
                className="rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
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

