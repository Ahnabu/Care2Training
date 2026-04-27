import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs | Care2 Training",
  description: "Articles and updates to help you plan your study abroad journey.",
};

const posts = [
  { slug: "how-to-choose-a-destination", title: "How to Choose the Right Destination", excerpt: "A simple framework to decide where to study based on goals and budget." },
  { slug: "visa-prep-checklist", title: "Visa Preparation Checklist", excerpt: "What to prepare early to reduce delays and uncertainty." },
] as const;

export default function BlogsPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Blogs</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Practical guides, updates, and resources.</p>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blogs/${p.slug}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">{p.title}</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">{p.excerpt}</p>
            <p className="mt-4 font-semibold text-primary">Read more</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

