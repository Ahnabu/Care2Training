import { domToReact, type DOMNode, type HTMLReactParserOptions } from "html-react-parser";
import type { ChildNode, Element } from "domhandler";
import { ChevronDown, PenLine } from "lucide-react";

function isTagElement(n: ChildNode): n is Element {
  return n.type === "tag";
}

function elementPlainText(el: Element): string {
  let s = "";
  for (const c of el.children ?? []) {
    if (c.type === "text") s += c.data;
    else if (isTagElement(c)) s += elementPlainText(c);
  }
  return s.replace(/\s+/g, " ").trim();
}

type SectionGroup = { title: string; nodes: ChildNode[] };

function partitionMotivationSections(children: ChildNode[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  let buffer: ChildNode[] = [];
  let sectionTitle = "Introduction";

  const flush = () => {
    if (buffer.length === 0) return;
    groups.push({ title: sectionTitle, nodes: buffer });
    buffer = [];
  };

  for (const child of children) {
    if (isTagElement(child) && child.name === "h4") {
      flush();
      sectionTitle = elementPlainText(child) || "Step";
      continue;
    }
    buffer.push(child);
  }
  flush();

  if (groups.length === 0) {
    return [{ title: "Guidance", nodes: [...children] }];
  }

  return groups;
}

export function MotivationLetterAccordion({
  childNodes,
  parserOptions,
}: Readonly<{
  childNodes: ChildNode[];
  parserOptions: HTMLReactParserOptions;
}>) {
  const sections = partitionMotivationSections(childNodes);

  return (
    <div className="not-prose my-10 grid gap-3">
      <p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <PenLine className="size-4 text-primary" aria-hidden />
        Step-by-step
      </p>
      {sections.map(({ title, nodes }, i) => (
        <details
          key={`${i}-${title.slice(0, 32)}`}
          className="group rounded-[1.25rem] border border-border/80 bg-card/40 shadow-sm backdrop-blur-md transition-colors open:border-primary/30 open:bg-card/55 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="cursor-pointer list-none px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-lg font-bold tracking-[-0.02em] text-foreground">{title}</span>
              <span
                aria-hidden
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              >
                <ChevronDown className="size-5" />
              </span>
            </div>
          </summary>
          <div className="study-destination-prose prose prose-neutral border-t border-border/60 px-5 pb-5 pt-4 text-[0.98rem] leading-relaxed dark:prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-li:text-muted-foreground prose-a:text-primary">
            {domToReact(nodes as DOMNode[], parserOptions)}
          </div>
        </details>
      ))}
    </div>
  );
}
