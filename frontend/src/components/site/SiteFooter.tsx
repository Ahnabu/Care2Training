import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Study Destinations", href: "/study-destinations" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
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
              <a className="font-semibold text-foreground hover:text-primary" href="mailto:info@care2training.com">
                info@care2training.com
              </a>
              <span className="text-muted-foreground">•</span>
              <a className="font-semibold text-foreground hover:text-primary" href="tel:+8801842497766">
                +880 1842 497 766
              </a>
              <span className="text-muted-foreground">•</span>
              <a className="font-semibold text-foreground hover:text-primary" href="tel:+4402035762072">
                +44 0203 576 2072
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Quick links</p>
            <div className="grid gap-2.5">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-[1rem] font-semibold text-foreground hover:text-primary">
                  {l.label}
                </Link>
              ))}
              <Link href="/book-appointment" className="text-[1rem] font-semibold text-foreground hover:text-primary">
                Book appointment
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Offices</p>
            <div className="grid gap-3 text-[0.98rem] text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Bangladesh</p>
                <p>36, Garib-E-Newaz Avenue, Level-3, Sector-13, Uttara, Dhaka-1230</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">UK</p>
                <p>Unit 301, 3rd Floor, 7 Kirkdale Road, Bushwood, London E11 1HP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.95rem] text-muted-foreground">Copyright © {year} Care2Training. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-[0.95rem]">
            <Link className="font-semibold text-foreground hover:text-primary" href="/terms">
              Terms
            </Link>
            <Link className="font-semibold text-foreground hover:text-primary" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

