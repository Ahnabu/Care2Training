import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { blogDate, blogExcerpt, blogImageUrl, fetchBlogPage } from "@/lib/blogsApi";

export const metadata: Metadata = {
  title: "Blogs | Care2 Training",
  description: "Articles and updates to help you plan your study abroad journey.",
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));
  const { posts, meta } = await fetchBlogPage(currentPage);
  const featured = posts.slice(0, 2);
  const remainingPosts = posts.slice(2);

  return (
    <main className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-6 md:px-10 lg:px-12 md:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.18),_transparent_42%),linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0))] p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.35)] sm:p-8 md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <PageHeader
            eyebrow="Insights"
            title="Blogs"
            description="Practical guides, updates, and resources for students planning their next move."
          />

        </div>
      </section>

      {featured.length > 0 ? (
        <section className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((post) => (
              <LocaleLink
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_30px_90px_-55px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-[280px] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={blogImageUrl(post.image)}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Sparkles className="h-4 w-4" />
                      Featured
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {blogDate(post.created_at) ?? "Latest"}
                        </span>
                        {post.category?.name ? <span className="rounded-full bg-muted px-2.5 py-1 text-foreground/80 text-xs">{post.category.name}</span> : null}
                      </div>
                      <h3 className="line-clamp-2 font-display text-xl font-bold tracking-[-0.03em] text-foreground">{post.title}</h3>
                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{blogExcerpt(post, 130)}</p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </LocaleLink>
            ))}
          </div>

          {remainingPosts.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {remainingPosts.map((post) => (
                <LocaleLink
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="flex h-full gap-4">
                    <div className="relative aspect-[4/4] w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 sm:w-28">
                      <img
                        src={blogImageUrl(post.image)}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          <span>{blogDate(post.created_at) ?? "Recent"}</span>
                          {post.category?.name ? <span className="rounded-full bg-muted px-2.5 py-1 text-foreground/80">{post.category.name}</span> : null}
                        </div>
                        <h3 className="line-clamp-2 font-display text-xl font-bold tracking-[-0.03em] text-foreground">{post.title}</h3>
                        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{blogExcerpt(post, 130)}</p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </LocaleLink>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="mt-8 rounded-[2rem] border border-dashed border-border/80 bg-card p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-foreground">No blog posts are available yet.</p>
          <p className="mt-2 text-muted-foreground">Please check back soon for new articles and updates.</p>
        </section>
      )}

      {meta && meta.last_page > 1 ? (
        <nav className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
          {currentPage > 1 ? (
            <LocaleLink
              href={`/blogs?page=${currentPage - 1}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary sm:px-4 sm:py-2.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </LocaleLink>
          ) : null}

          <div className="flex gap-1">
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
              <LocaleLink
                key={page}
                href={`/blogs?page=${page}`}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border font-semibold text-sm transition-colors ${
                  page === currentPage
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {page}
              </LocaleLink>
            ))}
          </div>

          {currentPage < meta.last_page ? (
            <LocaleLink
              href={`/blogs?page=${currentPage + 1}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary sm:px-4 sm:py-2.5"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}

