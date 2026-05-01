import type { ChildNode, Element } from "domhandler";
import { domToReact, type DOMNode } from "html-react-parser";
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

function extractItemFromLi(li: Element): FeatureItem | null {
  const children = (li.children ?? []).filter((c): c is Element => isElement(c));
  const heading = children.find((c) => c.name === "h3" || c.name === "h4");
  if (!heading) {
    // Try <strong>/<b> as title inside the li
    const strong = children.find((c) => c.name === "strong" || c.name === "b");
    if (strong) {
      const title = elementText(strong);
      const fullText = elementText(li);
      const body = fullText.slice(fullText.indexOf(title) + title.length).replace(/^\s*[:\-–—]\s*/, "").trim();
      if (title && body) return { title, body };
    }
    return null;
  }
  const title = elementText(heading);
  const bodyParts: string[] = [];
  for (const c of children) {
    if (c === heading) continue;
    if (c.name === "p" || c.name === "span" || c.name === "div") {
      const t = elementText(c);
      if (t) bodyParts.push(t);
    }
  }
  const body = bodyParts.join(" ").trim();
  if (title && body) return { title, body };
  if (title) return { title, body: "" };
  return null;
}

function extractFeatureItems(nodes: ChildNode[]): FeatureItem[] {
  const items: FeatureItem[] = [];
  let currentTitle = "";
  let currentBody: string[] = [];

  const flush = () => {
    const title = currentTitle.trim();
    const body = currentBody.join(" ").replace(/\s+/g, " ").trim();
    if (title && body) items.push({ title, body });
    else if (title) items.push({ title, body: "" });
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

      // Dig into <ol>/<ul> > <li> for heading+body pairs
      if (n.name === "ul" || n.name === "ol") {
        const liItems = (n.children ?? [])
          .filter((c): c is Element => isElement(c) && c.name === "li");

        // Check if li elements contain structured heading+body
        const structured = liItems.map(extractItemFromLi);
        const validStructured = structured.filter(Boolean) as FeatureItem[];
        if (validStructured.length >= 2) {
          flush();
          items.push(...validStructured);
          continue;
        }

        // Fallback: join li text as body for current title
        const liText = liItems.map((li) => elementText(li)).filter(Boolean);
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

  if (items.length === 0) {
    // Fallback: render original CMS content as prose instead of swallowing it
    return (
      <div className="study-destination-prose prose prose-neutral dark:prose-invert max-w-none">
        {domToReact(nodes as DOMNode[])}
      </div>
    );
  }

  return (
    <div className="not-prose my-8 grid gap-5">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <Sparkles className="size-4 text-primary" aria-hidden />
        {kind === "courses" ? "Popular courses" : "Key benefits"}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={`${i}-${it.title.slice(0, 28)}`}
            className="group rounded-2xl border border-border/70 bg-card/50 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-md dark:bg-card/30"
          >
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18">
              <Icon className="size-5" aria-hidden />
            </div>
            <p className="text-[1.02rem] font-bold tracking-[-0.02em] text-foreground">{it.title}</p>
            {it.body ? (
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted-foreground">{it.body}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

