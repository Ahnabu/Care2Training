import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const titleSlug = slug.replace(/-/g, " ");
  return {
    title: `${titleSlug} | Study Destination | Care2 Training`,
    description: `Study destination details for ${titleSlug}.`,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <header className="grid gap-3 max-w-[70ch]">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Study destination</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">{slug.replace(/-/g, " ")}</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          This is a placeholder detail template. We’ll replace with destination-specific sections (requirements, timeline, FAQ, CTA).
        </p>
      </header>
    </main>
  );
}

