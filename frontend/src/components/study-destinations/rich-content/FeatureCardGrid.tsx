import type { ChildNode, Element } from "domhandler";
import { BookOpen, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";

function isElement(n: ChildNode): n is Element {
  return n.type === "tag";
}

function elementText(el: Element): string {
  let s = "";
  for (const c of el.children ?? []) {
    if (c.type === "text") s += c.data;
    else if (isElement(c)) s += elementText(c);
  }
  return s.replace(/\s+/g, " ").trim();
}

type FeatureItem = { title: string; body: string };

function extractFeatureItems(nodes: ChildNode[]): FeatureItem[] {
  const items: FeatureItem[] = [];
  let currentTitle = "";
  let currentBody: string[] = [];

  const flush = () => {
    const title = currentTitle.trim();
    const body = currentBody.join(" ").replace(/\s+/g, " ").trim();
    if (title && body) items.push({ title, body });
    currentTitle = "";
    currentBody = [];
  };

  for (const n of nodes) {
    if (isElement(n)) {
      // Prefer explicit subheadings
      if (n.name === "h3" || n.name === "h4") {
        flush();
        currentTitle = elementText(n);
        continue;
      }

      // Elementor often uses <p><strong>Title</strong> ...</p>
      if (n.name === "p") {
        const strong = (n.children ?? []).find((c) => isElement(c) && (c.name === "strong" || c.name === "b"));
        const maybeTitle = strong && isElement(strong) ? elementText(strong) : "";
        const full = elementText(n);

        if (maybeTitle && full.toLowerCase().startsWith(maybeTitle.toLowerCase())) {
          flush();
          currentTitle = maybeTitle;
          const rest = full.slice(maybeTitle.length).replace(/^\s*[:\-–—]\s*/, "");
          if (rest) currentBody.push(rest);
          continue;
        }

        if (currentTitle) {
          currentBody.push(full);
          continue;
        }
      }

      if (n.name === "ul" || n.name === "ol") {
        const liText = (n.children ?? [])
          .filter((c): c is Element => isElement(c) && c.name === "li")
          .map((li) => elementText(li))
          .filter(Boolean);
        if (liText.length && currentTitle) currentBody.push(liText.join(" • "));
        continue;
      }
    }
  }

  flush();
  return items;
}

function pickIcon(kind: "courses" | "benefits"): LucideIcon {
  if (kind === "courses") return BookOpen;
  return TrendingUp;
}

export function FeatureCardGrid({
  kind,
  nodes,
}: Readonly<{
  kind: "courses" | "benefits";
  nodes: ChildNode[];
}>) {
  const items = extractFeatureItems(nodes).slice(0, 18);
  const Icon = pickIcon(kind);

  if (items.length === 0) return null;

  return (
    <div className="not-prose my-10 grid gap-6">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        <Sparkles className="size-4 text-sky-600" aria-hidden />
        {kind === "courses" ? "Popular courses" : "Benefits"}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={`${i}-${it.title.slice(0, 28)}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-purple-500/10 text-sky-700 ring-1 ring-sky-500/20">
              <Icon className="size-5" aria-hidden />
            </div>
            <p className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-slate-800">{it.title}</p>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-slate-600">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

