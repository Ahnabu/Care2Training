import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABand } from "@/components/sections/CTABand";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Services | Care2 Training",
  description: "Explore our services for admissions, visas, and study abroad success.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <PageHeader
        title="Services"
        description="Clear guidance at every step - from choosing a destination to preparing your application."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <TrustBar />
        <OfficesMini className="lg:mt-1" />
      </div>

      <ServicesBentoGrid showHeading={false} className="mt-10 py-0 md:py-0" />

      <ProcessSteps />
      <TestimonialsSection />
      <FAQAccordion />
      <CTABand />
    </main>
  );
}

