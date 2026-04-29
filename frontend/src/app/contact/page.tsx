import type { Metadata } from "next";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { offices, siteContact } from "@/content/offices";
import { TrustBar } from "@/components/sections/TrustBar";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact | Care2 Training",
  description: "Contact Care2 Training for study abroad guidance and appointments.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="Contact"
        description="Send us a message and we'll get back to you. (This is a UI-first form; backend wiring can be added later.)"
      />

      <div className="mt-8">
        <TrustBar />
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="name">
                Full name
              </label>
              <input id="name" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="phone">
                Phone / WhatsApp
              </label>
              <input id="phone" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="message">
                Message
              </label>
              <textarea id="message" rows={5} className="w-full rounded-xl border border-border bg-background p-3 text-foreground" />
            </div>
            <button type="button" className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90">
              Send message
            </button>
          </div>
        </form>

        <div className="grid gap-5">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Email</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{siteContact.email}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Phone</p>
            <div className="mt-2 grid gap-1">
              {siteContact.phones.map((p) => (
                <p key={p.tel} className="text-lg font-semibold text-foreground">
                  {p.label}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Offices</p>
            <div className="mt-2 grid gap-4">
              {offices.map((o) => (
                <div key={o.country}>
                  <p className="font-semibold text-foreground">{o.country}</p>
                  <p className="text-muted-foreground">{o.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps showHeading={false} className="py-0 md:py-0 mt-12" />
      <TestimonialsSection showHeading={false} className="py-0 md:py-0 mt-12" />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}

