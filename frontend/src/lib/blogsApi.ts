import { care2AssetUrl } from "@/lib/care2training-api";

const ADMIN_API_BASE = "https://admin.care2training.com/api";
const FETCH_REVALIDATE_SECONDS = 60 * 30;

export type BlogCategory = Readonly<{
  id?: number;
  name?: string;
  slug?: string;
}>;

export type BlogAuthor = Readonly<{
  id?: number;
  name?: string;
  image?: string | null;
}>;

export type BlogPost = Readonly<{
  id: number;
  category_id?: number | null;
  user_id?: number | null;
  title: string;
  slug: string;
  image: string | null;
  description: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  status?: string | number | boolean | null;
  order?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  category?: BlogCategory | null;
  user?: BlogAuthor | null;
}>;

type BlogsResponse = Readonly<{
  status?: boolean;
  data?: BlogPost[];
}>;

function isPublished(status: BlogPost["status"]) {
  if (status == null) return true;
  if (typeof status === "boolean") return status;
  if (typeof status === "number") return status !== 0;

  const normalized = status.trim().toLowerCase();
  return !["inactive", "draft", "hidden", "false", "0"].includes(normalized);
}

export function blogImageUrl(imagePath: string | null | undefined) {
  return care2AssetUrl(imagePath) ?? "/brand/logo-mark.svg";
}

export function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function blogExcerpt(post: BlogPost, limit = 170) {
  const plain = stripHtml(post.description ?? post.meta_description ?? "");
  if (!plain) return "Fresh guidance and practical insights from the Care2 Training team.";
  return plain.length > limit ? `${plain.slice(0, limit).trim()}…` : plain;
}

export function blogDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export type PaginationMeta = Readonly<{
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}>;

export type PaginatedBlogsResponse = Readonly<{
  status?: boolean;
  data?: BlogPost[];
  meta?: PaginationMeta;
}>;

async function fetchBlogPosts(page = 1) {
  const perPage = 6;
  const url = new URL(`${ADMIN_API_BASE}/blogs`);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString(), {
    next: { revalidate: FETCH_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) return { posts: [] as BlogPost[], meta: null as PaginationMeta | null };

  const json = (await res.json()) as PaginatedBlogsResponse;
  if (!json.status || !Array.isArray(json.data)) return { posts: [] as BlogPost[], meta: json.meta ?? null };

  const posts = json.data.filter((post) => post.title && post.slug && isPublished(post.status));
  return { posts, meta: json.meta ?? null };
}

export async function fetchBlogPage(page = 1) {
  const { posts, meta } = await fetchBlogPosts(page);

  const sorted = posts.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;

    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (dateA !== dateB) return dateB - dateA;

    return a.title.localeCompare(b.title);
  });

  return { posts: sorted, meta };
}

export async function fetchBlogs() {
  const { posts, meta } = await fetchBlogPage(1);
  if (!meta || meta.last_page <= 1) return posts;

  // Fetch remaining pages in parallel
  const pageNumbers = Array.from({ length: meta.last_page - 1 }, (_, i) => i + 2);
  const additionalPages = await Promise.all(pageNumbers.map((page) => fetchBlogPage(page)));
  return [...posts, ...additionalPages.flatMap((p) => p.posts)];
}

export async function fetchBlogBySlug(slug: string) {
  // First check page 1 (most common case)
  const { posts: firstPagePosts, meta } = await fetchBlogPage(1);
  const found = firstPagePosts.find((post) => post.slug === slug);
  if (found) return found;

  // If there are more pages, iterate through them
  if (meta && meta.last_page > 1) {
    for (let page = 2; page <= meta.last_page; page++) {
      const { posts } = await fetchBlogPage(page);
      const match = posts.find((post) => post.slug === slug);
      if (match) return match;
    }
  }

  return null;
}
