import type { Metadata } from "next";
import { BookAppointmentForm } from "@/components/book-appointment/BookAppointmentForm";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export const metadata: Metadata = {
  title: "Book Appointment | Care2 Training",
  description: "Book a consultation appointment with Care2 Training.",
};

export default function BookAppointmentPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-12 md:py-16">
      {/* The form posts to /api/book-appointment, and that Next.js route can forward to the Express backend when BACKEND_API_URL is set. */}
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
