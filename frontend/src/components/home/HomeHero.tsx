import { HeroSection } from "./HeroSection";
import { HomeNavbar } from "./HomeNavbar";
import { StatsStrip } from "./StatsStrip";

export function HomeHero() {
  return (
    <main className="page-surface relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-(--brand-soft)/90 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-(--brand-soft-strong)/70 blur-3xl" />
      </div>

      <div className="page-shell relative">
        <HomeNavbar />
        <HeroSection />
        <StatsStrip />
      </div>
    </main>
  );
}
