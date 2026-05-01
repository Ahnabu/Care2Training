import { Mail, MapPin } from "lucide-react";
import { offices, siteContact } from "@/content/offices";

export function OfficeLocationsSection() {
  return (
    <section className="py-5 border-t border-border/70">
      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Global Presence</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">Our Office Locations</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
        <article className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md md:gap-6 md:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:h-14 md:w-14">
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-base font-semibold text-primary md:mb-2 md:text-lg">Email Us</p>
            <a
              href={`mailto:${siteContact.email}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary hover:underline md:text-base break-words"
            >
              {siteContact.email}
            </a>
          </div>
        </article>

        {offices.map((office) => (
          <article
            key={office.country}
            className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md md:gap-6 md:p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:h-14 md:w-14">
              <MapPin className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-base font-semibold text-primary md:mb-2 md:text-lg">{office.country} Office</p>
              {office.mapUrl !== "#" ? (
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary hover:underline md:text-base"
                >
                  {office.address}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground md:text-base">{office.address}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}