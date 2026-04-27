import type { Metadata } from "next";
import { BookAppointmentForm } from "@/components/book-appointment/BookAppointmentForm";

export const metadata: Metadata = {
  title: "Book Appointment | Care2 Training",
  description: "Book a consultation appointment with Care2 Training.",
};

export default function BookAppointmentPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-12 md:py-16">
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Book an appointment</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          A short, step-by-step form designed to be easy to finish.
        </p>
      </header>
      <BookAppointmentForm />
    </main>
  );
}
