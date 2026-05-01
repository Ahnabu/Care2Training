import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Sparkles } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { blogDate, blogExcerpt, blogImageUrl, fetchBlogBySlug, fetchBlogs, stripHtml } from "@/lib/blogsApi";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  const title = post?.meta_title?.trim() || post?.title || slug.replace(/-/g, " ");
  return {
    title: `${title} | Blog | Care2 Training`,
    description:
      post?.meta_description?.trim() ||
      blogExcerpt(post ?? { id: 0, title, slug, image: null, description: null }, 160),
  };
}

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) notFound();

  const summary = stripHtml(post.description ?? post.meta_description ?? "");
  const content = post.description ?? post.meta_description ?? "";
  const publishedDate = blogDate(post.created_at);
  const categoryName = post.category?.name;

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <LocaleLink
        href="/blogs"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blogs
      </LocaleLink>

      <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_30px_90px_-55px_rgba(15,23,42,0.45)]">
        <div className="relative min-h-[380px] bg-slate-100 dark:bg-slate-900 sm:min-h-[420px]">
          <img
            src={blogImageUrl(post.image)}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent" />

          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Blog article
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
              {publishedDate ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white backdrop-blur-md">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {publishedDate}
                </span>
              ) : null}
              {categoryName ? <span className="rounded-full bg-white/10 px-3 py-1.5 text-white backdrop-blur-md">{categoryName}</span> : null}
            </div>
            <h1 className="mt-4 max-w-[18ch] font-display text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
              {publishedDate ? <span>{publishedDate}</span> : null}
            </div>

            <div className="rounded-3xl border border-border/70 bg-[linear-gradient(180deg,rgba(13,148,136,0.08),rgba(13,148,136,0.02))] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Summary</p>
              <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-lg">{summary || blogExcerpt(post, 220)}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* <div className="rounded-2xl border border-border/70 bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">SEO title</p>
              <p className="mt-2 text-sm font-medium text-foreground">{post.meta_title?.trim() || post.title}</p>
            </div> */}
            <div className="rounded-2xl border border-border/70 bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Keywords</p>
              <p className="mt-2 text-sm font-medium text-foreground">{post.meta_keywords?.trim() || "Study abroad, guidance, tips"}</p>
            </div>
          </div>
        </div>
      </section>

      <article className="blog-content mt-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10" dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

