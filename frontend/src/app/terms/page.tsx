import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | Care2 Training",
  description: "Terms and conditions.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-[900px] px-6 md:px-10 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Terms &amp; Conditions</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Placeholder legal page. Add final content before launch.</p>
    </main>
  );
}

