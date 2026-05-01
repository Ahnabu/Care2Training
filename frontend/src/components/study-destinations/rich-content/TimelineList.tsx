import type { ChildNode, Element } from "domhandler";
import { domToReact, type DOMNode } from "html-react-parser";
import { CheckCircle2 } from "lucide-react";

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

function extractSteps(nodes: ChildNode[]): string[] {
  const steps: string[] = [];

  for (const n of nodes) {
    if (!isElement(n)) continue;
    if (n.name === "p") {
      const t = elementText(n);
      if (t) steps.push(t);
      continue;
    }
    if (n.name === "ul" || n.name === "ol") {
      const li = (n.children ?? [])
        .filter((c): c is Element => isElement(c) && c.name === "li")
        .map((x) => elementText(x))
        .filter(Boolean);
      steps.push(...li);
    }
  }

  // Avoid huge walls; keep this section scannable.
  return steps
    .map((s) => s.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 14);
}

export function TimelineList({ nodes }: Readonly<{ nodes: ChildNode[] }>) {
  const steps = extractSteps(nodes);
  if (steps.length < 2) {
    return (
      <div className="study-destination-prose prose prose-neutral dark:prose-invert max-w-none">
        {domToReact(nodes as DOMNode[])}
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 shadow-sm">
      <div className="grid gap-4">
        {steps.map((s, i) => (
          <div key={`${i}-${s.slice(0, 18)}`} className="flex gap-4">
            <div className="mt-0.5 flex shrink-0 flex-col items-center">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20">
                <CheckCircle2 className="size-5" aria-hidden />
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden className="mt-2 h-full w-px bg-gradient-to-b from-sky-200 to-transparent" />
              ) : null}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-[0.95rem] font-bold text-slate-500">Step {i + 1}</p>
              <p className="mt-1 text-[1rem] leading-relaxed text-slate-800">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

