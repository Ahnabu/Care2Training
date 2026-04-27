import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const titleSlug = slug.replace(/-/g, " ");
  return {
    title: `${titleSlug} | Blog | Care2 Training`,
    description: `Blog article: ${titleSlug}.`,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="mx-auto w-full max-w-[900px] px-6 md:px-10 py-12 md:py-16">
      <header className="grid gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Blog</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">{slug.replace(/-/g, " ")}</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Placeholder article template focused on readability.</p>
      </header>

      <article className="prose prose-neutral mt-10 max-w-none">
        <p>
          This is a placeholder. We’ll later replace it with real content (and optionally add related posts, author, and a table of contents).
        </p>
      </article>
    </main>
  );
}

