import parse, { type DOMNode, type HTMLReactParserOptions } from "html-react-parser";
import type { ChildNode, Element } from "domhandler";
import {
  matchesPopularCoursesHeading,
  matchesPostStudyWorkHeading,
  matchesUniversityListHeading,
} from "@/lib/study-destination-rich-patterns";
import { MotivationLetterAccordion } from "@/components/study-destinations/rich-content/MotivationLetterAccordion";
import { StudyRichCardGrid } from "@/components/study-destinations/rich-content/StudyRichCardGrid";
import { parseColonSalaryRow, StudyRichSalaryList } from "@/components/study-destinations/rich-content/StudyRichSalaryList";
import { FeatureCardGrid } from "@/components/study-destinations/rich-content/FeatureCardGrid";
import { TimelineList } from "@/components/study-destinations/rich-content/TimelineList";

function isElement(n: DOMNode): n is Element {
  return n.type === "tag";
}

function stripLineArtifacts(text: string): string {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[•◆▪︎●○]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function elementPlainText(el: Element): string {
  let s = "";
  for (const c of el.children ?? []) {
    if (c.type === "text") s += c.data;
    else if (c.type === "tag") s += elementPlainText(c);
  }
  return s.replace(/\s+/g, " ").trim();
}

function getNearestHeadingBeforeList(ul: Element): Element | null {
  let prev: ChildNode | null = ul.prev ?? null;
  while (prev) {
    if (prev.type === "tag") {
      const name = prev.name.toLowerCase();
      if (/^h[234]$/.test(name)) return prev;
      if (name === "p") {
        prev = prev.prev ?? null;
        continue;
      }
      return null;
    }
    prev = prev.prev ?? null;
  }
  return null;
}

function extractParagraphLines(p: Element): string[] {
  const lines: string[] = [];
  let current = "";

  const push = () => {
    const cleaned = stripLineArtifacts(current);
    if (cleaned) lines.push(cleaned);
    current = "";
  };

  for (const c of p.children ?? []) {
    if (c.type === "tag" && c.name === "br") {
      push();
      continue;
    }
    if (c.type === "text") {
      current += c.data;
      continue;
    }
    if (c.type === "tag") {
      current += elementPlainText(c);
    }
  }
  push();

  return lines;
}

function looksLikeInlineList(lines: string[]): boolean {
  if (lines.length < 3) return false;
  const nonTrivial = lines.filter((l) => l.length >= 3);
  if (nonTrivial.length < 3) return false;

  // If most lines are short-ish, it's likely a pseudo-list rather than paragraphs.
  const short = nonTrivial.filter((l) => l.length <= 80).length;
  return short >= Math.ceil(nonTrivial.length * 0.65);
}

function getNearestHeadingBeforeBlock(node: Element): Element | null {
  let prev: ChildNode | null = node.prev ?? null;
  while (prev) {
    if (prev.type === "tag") {
      const name = prev.name.toLowerCase();
      if (/^h[234]$/.test(name)) return prev;
      if (name === "p" || name === "div") {
        prev = prev.prev ?? null;
        continue;
      }
      return null;
    }
    prev = prev.prev ?? null;
  }
  return null;
}

function extractUlItems(ul: Element): string[] {
  const out: string[] = [];
  for (const c of ul.children ?? []) {
    if (c.type !== "tag" || c.name !== "li") continue;
    const t = elementPlainText(c);
    if (t) out.push(t);
  }
  return out;
}

function isSalaryColonList(items: string[]): boolean {
  if (items.length < 2) return false;
  const parsed = items.map(parseColonSalaryRow).filter(Boolean);
  return parsed.length >= Math.ceil(items.length * 0.45);
}

function hasMotivationWrapperClass(domNode: Element): boolean {
  const cls = domNode.attribs?.class ?? "";
  return cls.split(/\s+/).includes("study-destination-rich-motivation");
}

function hasClass(domNode: Element, clsName: string): boolean {
  const cls = domNode.attribs?.class ?? "";
  return cls.split(/\s+/).includes(clsName);
}

function createRichContentParserOptions(): HTMLReactParserOptions {
  const opts: HTMLReactParserOptions = {
    replace(domNode) {
      if (!isElement(domNode)) return undefined;

      if (domNode.name === "div" && hasMotivationWrapperClass(domNode)) {
        return (
          <MotivationLetterAccordion childNodes={domNode.children ?? []} parserOptions={opts} />
        );
      }

      if (domNode.name === "div" && hasClass(domNode, "study-destination-rich-courses")) {
        return <FeatureCardGrid kind="courses" nodes={(domNode.children ?? []) as any} />;
      }

      if (domNode.name === "div" && hasClass(domNode, "study-destination-rich-benefits")) {
        return <FeatureCardGrid kind="benefits" nodes={(domNode.children ?? []) as any} />;
      }

      if (domNode.name === "div" && hasClass(domNode, "study-destination-rich-howto")) {
        return <TimelineList nodes={(domNode.children ?? []) as any} />;
      }

      if (domNode.name === "ul") {
        const prev = getNearestHeadingBeforeList(domNode);
        if (!prev || !/^h[234]$/i.test(prev.name)) {
          return undefined;
        }

        const headingText = elementPlainText(prev);
        const items = extractUlItems(domNode);
        if (items.length < 2) return undefined;

        if (matchesPostStudyWorkHeading(headingText) && isSalaryColonList(items)) {
          const rows = items.map(parseColonSalaryRow).filter(Boolean) as {
            title: string;
            value: string;
          }[];
          return <StudyRichSalaryList items={rows} />;
        }

        if (matchesUniversityListHeading(headingText)) {
          return <StudyRichCardGrid variant="university" items={items} />;
        }

        if (matchesPopularCoursesHeading(headingText)) {
          return <StudyRichCardGrid variant="course" items={items} />;
        }
      }

      // Many CMS pages encode "lists" as <p>item<br>item<br>item</p>.
      if (domNode.name === "p") {
        const lines = extractParagraphLines(domNode);
        if (!looksLikeInlineList(lines)) return undefined;

        const prevHeading = getNearestHeadingBeforeBlock(domNode);
        const headingText = prevHeading ? elementPlainText(prevHeading) : "";

        if (headingText && matchesPostStudyWorkHeading(headingText) && isSalaryColonList(lines)) {
          const rows = lines.map(parseColonSalaryRow).filter(Boolean) as {
            title: string;
            value: string;
          }[];
          return <StudyRichSalaryList items={rows} />;
        }

        if (headingText && matchesUniversityListHeading(headingText)) {
          return <StudyRichCardGrid variant="university" items={lines} />;
        }

        if (headingText && matchesPopularCoursesHeading(headingText)) {
          return <StudyRichCardGrid variant="course" items={lines} />;
        }

        // Fallback: convert pseudo-lists into real bullet lists (language-agnostic),
        // so flat CMS paragraphs render like the previous site.
        return (
          <ul className="my-5 list-disc pl-6">
            {lines.map((t, i) => (
              <li key={`${i}-${t.slice(0, 28)}`}>{t}</li>
            ))}
          </ul>
        );
      }

      return undefined;
    },
  };
  return opts;
}

export function RichContentRenderer({ html }: Readonly<{ html: string }>) {
  const trimmed = html?.trim() ?? "";
  if (!trimmed) return null;

  const options = createRichContentParserOptions();
  return <>{parse(trimmed, options)}</>;
}
