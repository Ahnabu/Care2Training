"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const locale = useMemo(() => {
    const first = (pathname || "/").split("/")[1];
    return ["en", "bn", "it", "fr", "es", "de", "bg", "et"].includes(first) ? first : "en";
  }, [pathname]);

  const LANGUAGES = [
    { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
    { code: "bn", label: "Bangla",  short: "BN", flag: "🇧🇩" },
    { code: "it", label: "Italian", short: "IT", flag: "🇮🇹" },
    { code: "fr", label: "French",  short: "FR", flag: "🇫🇷" },
    { code: "es", label: "Spanish", short: "ES", flag: "🇪🇸" },
    { code: "de", label: "German",  short: "DE", flag: "🇩🇪" },
    { code: "bg", label: "Bulgarian", short: "BG", flag: "🇧🇬" },
    { code: "et", label: "Estonian",  short: "ET", flag: "🇪🇪" },
  ];

  const DESTINATIONS = [
    { slug: "canada",    label: "Study in Canada",    flag: "🇨🇦" },
    { slug: "ireland",   label: "Study in Ireland",   flag: "🇮🇪" },
    { slug: "germany",   label: "Study in Germany",   flag: "🇩🇪" },
    { slug: "italy",     label: "Study in Italy",     flag: "🇮🇹" },
    { slug: "malaysia",  label: "Study in Malaysia",  flag: "🇲🇾" },
    { slug: "france",    label: "Study in France",    flag: "🇫🇷" },
    { slug: "poland",    label: "Study in Poland",    flag: "🇵🇱" },
    { slug: "croatia",   label: "Study in Croatia",   flag: "🇭🇷" },
    { slug: "australia", label: "Study in Australia", flag: "🇦🇺" },
    { slug: "uk",        label: "Study in UK",        flag: "🇬🇧" },
    { slug: "hungary",   label: "Study in Hungary",   flag: "🇭🇺" },
    { slug: "usa",       label: "Study in USA",       flag: "🇺🇸" },
    { slug: "lithuania", label: "Study in Lithuania", flag: "🇱🇹" },
    { slug: "latvia",    label: "Study in Latvia",    flag: "🇱🇻" },
    { slug: "malta",     label: "Study in Malta",     flag: "🇲🇹" },
    { slug: "cyprus",    label: "Study in Cyprus",    flag: "🇨🇾" },
  ];

  const SERVICES = [
    { slug: "admission-guidance",     label: "Admission Guidance",     icon: "🎓" },
    { slug: "visa-support",           label: "Visa Support",           icon: "🛂" },
    { slug: "career-pathway",         label: "Career Pathway",         icon: "💼" },
    { slug: "scholarship-assistance", label: "Scholarship Assistance", icon: "🏅" },
    { slug: "job-placement",          label: "Job Placement",          icon: "🤝" },
    { slug: "language-coaching",      label: "Language Coaching",      icon: "🗣️" },
  ];

  const navLinks = [
    { label: t("nav.about"),   href: "/about" },
    { label: t("nav.events"),  href: "/events" },
    { label: t("nav.blogs"),   href: "/blogs" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  function hrefWithLocale(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  function switchLocale(nextLocale: string) {
    const parts = (pathname || "/").split("/");
    if (parts.length < 2) return router.push(`/${nextLocale}`);
    parts[1] = nextLocale;
    const nextPath = parts.join("/") || `/${nextLocale}`;
    setLangOpen(false);
    router.push(nextPath);
  }

  const currentLang = LANGUAGES.find(l => l.code === locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.18)]">

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div className="hidden md:block border-b border-border/30">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex items-center justify-between gap-4 py-2 text-[0.82rem]">
            {/* Left: contact info */}
            <div className="flex items-center gap-5 text-muted-foreground">
              <a href="mailto:info@care2training.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail size={13} />
                info@care2training.com
              </a>
              <a href="tel:+8801842497766" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <span className="text-sm">🇧🇩</span>
                +880 1842 497 766
              </a>
              <a href="tel:+4402035762072" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <span className="text-sm">🇬🇧</span>
                +44 0203 576 2072
              </a>
            </div>

            {/* Right: language, theme, agent */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 py-1 text-[0.82rem] font-semibold text-foreground hover:border-primary/60 transition-colors"
                  onClick={() => setLangOpen(v => !v)}
                >
                  <span>{currentLang?.flag}</span>
                  {currentLang?.short}
                  <ChevronDown size={11} className={cn("transition-transform duration-200", langOpen && "rotate-180")} />
                </button>
                <div className={cn(
                  "absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-border bg-background shadow-xl overflow-hidden transition-all duration-200 z-50",
                  langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                )}>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      className={cn(
                        "w-full px-3 py-2.5 flex items-center gap-2.5 text-left text-[0.88rem] hover:bg-muted transition-colors",
                        locale === lang.code ? "bg-primary/5 text-primary font-bold" : "text-foreground font-medium"
                      )}
                      onClick={() => switchLocale(lang.code)}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                      <span className="ml-auto text-[0.7rem] font-bold text-muted-foreground">{lang.short}</span>
                    </button>
                  ))}
                </div>
              </div>

              <ThemeToggle />

              <Link
                href={hrefWithLocale("/agent-registration")}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1 text-[0.82rem] font-bold text-white hover:bg-primary/90 transition-colors"
              >
                Become an Agent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR ────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-3 py-3">

          {/* Logo */}
          <Link href={hrefWithLocale("/")} className="inline-flex items-center gap-2.5 shrink-0">
            <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <Image
                src="/care2training/assets/logo2.jpeg"
                alt="Care2 Training"
                fill
                sizes="40px"
                className="object-contain scale-[1.08] contrast-125 saturate-110"
                priority
              />
            </span>
            <span className="hidden sm:grid leading-tight">
              <span className="font-montserrat text-[1.05rem] font-black tracking-[-0.02em] gradient-text">{t("site.name")}</span>
              <span className="text-[0.72rem] text-muted-foreground">{t("site.tagline")}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            <Link href={hrefWithLocale("/")} className="text-[0.87rem] font-medium text-foreground/90 hover:text-primary whitespace-nowrap">
              Home
            </Link>
            <Link href={hrefWithLocale("/about")} className="text-[0.87rem] font-medium text-foreground/90 hover:text-primary whitespace-nowrap">
              {t("nav.about")}
            </Link>

            {/* Study Destinations dropdown */}
            <div className="relative" ref={destRef}>
              <button
                type="button"
                onClick={() => { setDestOpen(v => !v); setSvcOpen(false); }}
                className="flex items-center gap-1 text-[0.87rem] font-medium text-foreground/90 hover:text-primary whitespace-nowrap"
              >
                {t("nav.studyDestinations")}
                <ChevronDown size={13} className={cn("transition-transform duration-200", destOpen && "rotate-180")} />
              </button>
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-[480px] rounded-2xl border border-border bg-background/98 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-200 z-50",
                destOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              )}>
                <div className="grid grid-cols-2 gap-px p-2">
                  {DESTINATIONS.map(d => (
                    <Link
                      key={d.slug}
                      href={hrefWithLocale(`/study-destinations/${d.slug}`)}
                      onClick={() => setDestOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[0.9rem] font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                    >
                      <span className="text-base leading-none">{d.flag}</span>
                      {d.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border/60 px-4 py-2.5">
                  <Link href={hrefWithLocale("/study-destinations")} onClick={() => setDestOpen(false)} className="text-[0.85rem] font-semibold text-primary hover:underline">
                    View all destinations →
                  </Link>
                </div>
              </div>
            </div>

            {/* Services dropdown */}
            <div className="relative" ref={svcRef}>
              <button
                type="button"
                onClick={() => { setSvcOpen(v => !v); setDestOpen(false); }}
                className="flex items-center gap-1 text-[0.87rem] font-medium text-foreground/90 hover:text-primary whitespace-nowrap"
              >
                {t("nav.services")}
                <ChevronDown size={13} className={cn("transition-transform duration-200", svcOpen && "rotate-180")} />
              </button>
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-64 rounded-2xl border border-border bg-background/98 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-200 z-50",
                svcOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              )}>
                <div className="p-2">
                  {SERVICES.map(s => (
                    <Link
                      key={s.slug}
                      href={hrefWithLocale(`/services/${s.slug}`)}
                      onClick={() => setSvcOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[0.9rem] font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                    >
                      <span className="text-base leading-none">{s.icon}</span>
                      {s.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border/60 px-4 py-2.5">
                  <Link href={hrefWithLocale("/services")} onClick={() => setSvcOpen(false)} className="text-[0.85rem] font-semibold text-primary hover:underline">
                    All services →
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map(item => (
              <Link key={item.href} href={hrefWithLocale(item.href)} className="text-[0.87rem] font-medium text-foreground/90 hover:text-primary whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Book + Hamburger */}
          <div className="flex items-center gap-2.5">
            <Link
              href={hrefWithLocale("/book-appointment")}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-full clay-button px-5 py-2 text-[0.87rem] font-montserrat font-bold text-white transition-transform active:scale-95 duration-200 ease-out"
            >
              {t("site.cta.bookAppointment")}
            </Link>

            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center rounded-xl border border-border bg-background p-2 text-foreground hover:border-border/80"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ─────────────────────────────────────────── */}
      <div className={cn("lg:hidden absolute left-0 right-0 top-full border-b border-border/60 bg-background/98 backdrop-blur shadow-lg", mobileOpen ? "block" : "hidden")}>
        <div className="mx-auto w-full max-w-[1360px] px-6 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="grid gap-1 border-b border-border/60 pb-4">
            <Link href={hrefWithLocale("/")} className="rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href={hrefWithLocale("/about")} className="rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>{t("nav.about")}</Link>

            {/* Mobile Study Destinations accordion */}
            <div>
              <button type="button" className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted" onClick={() => setMobileDestOpen(v => !v)}>
                {t("nav.studyDestinations")}
                <ChevronDown size={15} className={cn("transition-transform duration-200", mobileDestOpen && "rotate-180")} />
              </button>
              {mobileDestOpen && (
                <div className="mt-1 ml-3 border-l border-border/60 pl-3 grid gap-0.5">
                  {DESTINATIONS.map(d => (
                    <Link key={d.slug} href={hrefWithLocale(`/study-destinations/${d.slug}`)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-[0.9rem] font-medium text-foreground/80 hover:bg-muted hover:text-primary" onClick={() => { setMobileOpen(false); setMobileDestOpen(false); }}>
                      <span className="text-base leading-none">{d.flag}</span> {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services accordion */}
            <div>
              <button type="button" className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted" onClick={() => setMobileSvcOpen(v => !v)}>
                {t("nav.services")}
                <ChevronDown size={15} className={cn("transition-transform duration-200", mobileSvcOpen && "rotate-180")} />
              </button>
              {mobileSvcOpen && (
                <div className="mt-1 ml-3 border-l border-border/60 pl-3 grid gap-0.5">
                  {SERVICES.map(s => (
                    <Link key={s.slug} href={hrefWithLocale(`/services/${s.slug}`)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-[0.9rem] font-medium text-foreground/80 hover:bg-muted hover:text-primary" onClick={() => { setMobileOpen(false); setMobileSvcOpen(false); }}>
                      <span className="text-base leading-none">{s.icon}</span> {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map(item => (
              <Link key={item.href} href={hrefWithLocale(item.href)} className="rounded-xl px-3 py-2.5 text-[1rem] font-semibold text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-4">
            {/* Mobile language grid */}
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang.code} type="button" onClick={() => { switchLocale(lang.code); setMobileOpen(false); }}
                  className={cn("rounded-xl border px-3 py-2 flex items-center gap-2 text-[0.88rem] font-semibold transition-colors", locale === lang.code ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:bg-muted")}>
                  <span className="text-base leading-none">{lang.flag}</span> {lang.label}
                </button>
              ))}
            </div>

            <Link href={hrefWithLocale("/book-appointment")} className="inline-flex w-full items-center justify-center rounded-full clay-button px-5 py-3 text-[1rem] font-montserrat font-bold text-white transition-transform active:scale-95 duration-200 ease-out" onClick={() => setMobileOpen(false)}>
              {t("site.cta.bookAppointment")}
            </Link>

            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <p className="text-[0.85rem] text-muted-foreground">© {year} Care2Training</p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
