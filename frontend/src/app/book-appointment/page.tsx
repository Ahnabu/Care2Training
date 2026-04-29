import type { Metadata } from "next";
import { BookAppointmentForm } from "@/components/book-appointment/BookAppointmentForm";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Book Appointment | Care2 Training",
  description: "Book a consultation appointment with Care2 Training.",
};

export default function BookAppointmentPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-12 md:py-16">
      <PageHeader
        title="Book an appointment"
        description="A short, step-by-step form designed to be easy to finish."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>
      <BookAppointmentForm />

      <TestimonialsSection showHeading={false} className="py-0 md:py-0 mt-12" />
      <FAQAccordion showHeading={false} className="py-0 md:py-0 mt-12" />
      <CTABand
        className="py-0 md:py-0 mt-8"
        primaryLabel="Get free assessment"
        secondaryHref="/study-destinations"
        secondaryLabel="Browse destinations"
      />
    </main>
  );
}
