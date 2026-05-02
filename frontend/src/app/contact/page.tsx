import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { offices, siteContact } from "@/content/offices";
import ContactFormClient from "@/components/site/ContactFormClient";
import { TrustBar } from "@/components/sections/TrustBar";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact | Care2 Training",
  description: "Contact Care2 Training for study abroad guidance and appointments.",
};

const primaryMapEmbedUrl =
  "https://www.google.com/maps?cid=13573259146148603354&hl=en&gl=BD&output=embed";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="Contact"
        description="Get expert guidance for free. Explore your options and plan your next steps with personalized support."
      />

      <div className="mt-8">
        <TrustBar />
      </div>

      {/* Form first: client-side contact form posts to live API */}
      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <ContactFormClient />

        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Call</p>
            <div className="mt-3 grid gap-2">
              {siteContact.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary sm:text-base">
                  <Phone className="h-4 w-4 text-primary" />
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <iframe
              title="Care2 Training Office Map"
              src={primaryMapEmbedUrl}
              className="h-[380px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Offices list (moved below the form) */}
      <section className="mt-10">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Contact Information</p>

        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
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

      <ProcessSteps showHeading={false} className="py-0 md:py-0 mt-12" />
      <TestimonialsSection showHeading={false} className="py-0 md:py-0 mt-12" />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}

