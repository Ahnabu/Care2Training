import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Care2 Training",
  description: "Learn about Care2 Training and how we support learners worldwide.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">About Care2 Training</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          We help learners and professionals secure global opportunities through clear guidance, strong partners, and an end-to-end
          process.
        </p>
      </header>
    </main>
  );
}

