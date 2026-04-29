import { HeroSection } from "./HeroSection";
import { StatsStrip } from "./StatsStrip";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABand } from "@/components/sections/CTABand";

export function HomeHero() {
  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-indigo-50/90 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />
      </div>

      <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-12 relative pt-6 md:pt-10">
        <HeroSection />
        <StatsStrip />
        <ServicesBentoGrid />
        <ProcessSteps />
        <TestimonialsSection />
        <FAQAccordion />
        <CTABand />
      </div>
    </main>
  );
}
