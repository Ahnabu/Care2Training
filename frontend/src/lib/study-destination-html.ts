import * as cheerio from "cheerio";
import DOMPurify from "isomorphic-dompurify";

const ROOT_ID = "study-destination-root";
const MAX_ELEMENTOR_PASSES = 36;

const ALLOWED_TAGS = [
  "h2",
  "h3",
  "h4",
  "p",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
  "a",
  "br",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "colgroup",
  "col",
  "div",
  "span",
  "aside",
];

let purifyClassHookInstalled = false;

function ensurePurifyClassHook(): void {
  if (purifyClassHookInstalled) return;
  purifyClassHookInstalled = true;
  DOMPurify.addHook("uponSanitizeAttribute", (_node, data) => {
    if (data.attrName !== "class") return;
    const parts = (data.attrValue ?? "").split(/\s+/).filter(Boolean);
    const ok = parts.filter((p) => p.startsWith("study-destination-"));
    if (ok.length === 0) {
      data.keepAttr = false;
    } else {
      data.attrValue = ok.join(" ");
    }
  });
}

function unwrapSelectors($: cheerio.CheerioAPI, selectors: readonly string[]): void {
  for (const sel of selectors) {
    $(sel).each((_, el) => {
      const $el = $(el);
      $el.replaceWith($el.contents());
    });
  }
}

function unwrapMatching($: cheerio.CheerioAPI, selector: string): void {
  $(selector).each((_, el) => {
    const $el = $(el);
    $el.replaceWith($el.contents());
  });
}

function promoteConsultationCta($: cheerio.CheerioAPI): void {
  $("h2").each((_, el) => {
    const $h2 = $(el);
    const $a = $h2.find('a[href*="book-appointment"]').first();
    if (!$a.length) return;

    const href = ($a.attr("href") ?? "/book-appointment").trim();
    const $aside = $("<aside></aside>");
    $aside.addClass("study-destination-inline-cta not-prose");
    const $link = $("<a></a>");
    $link.addClass("study-destination-inline-cta__link");
    $link.attr("href", href);
    $link.html($a.html() ?? $a.text());

    $aside.append($link);
    $h2.replaceWith($aside);
  });
}

function wrapTables($: cheerio.CheerioAPI): void {
  $("table").each((_, table) => {
    const $table = $(table);
    const $parent = $table.parent();
    if ($parent.hasClass("study-destination-table-wrap")) return;
    $table.wrap('<div class="study-destination-table-wrap"></div>');
  });
}

function stripPresentationAttributes($: cheerio.CheerioAPI): void {
  $(`#${ROOT_ID} *`).each((_, el) => {
    const $el = $(el);
    const tag = (el as { tagName?: string }).tagName?.toLowerCase() ?? "";
    $el.removeAttr("style");
    $el.removeAttr("dir");
    $el.removeAttr("align");
    $el.removeAttr("role");
    $el.removeAttr("aria-level");
    $el.removeAttr("width");
    $el.removeAttr("height");

    if (tag === "colgroup" || tag === "col") {
      $el.removeAttr("span");
    }

    const cls = $el.attr("class");
    const keep =
      cls
        ?.split(/\s+/)
        .filter((c) => c.startsWith("study-destination-"))
        .join(" ") ?? "";
    if (keep) {
      $el.attr("class", keep);
    } else {
      $el.removeAttr("class");
    }

    const id = $el.attr("id");
    if (id?.startsWith("docs-internal-guid")) {
      $el.removeAttr("id");
    }
  });
}

function flattenBareSpans($: cheerio.CheerioAPI): void {
  for (let pass = 0; pass < 12; pass++) {
    let touched = false;
    $("span").each((_, el) => {
      const $el = $(el);
      const attrs = $el.attr();
      if (attrs && Object.keys(attrs).length > 0) return;
      $el.replaceWith($el.contents());
      touched = true;
    });
    if (!touched) break;
  }
}

function removeEmptyParagraphs($: cheerio.CheerioAPI): void {
  $("p").each((_, el) => {
    const $el = $(el);
    const inner = ($el.html() ?? "").replace(/\u00a0|&nbsp;/g, "").trim();
    if (!inner) {
      $el.remove();
    }
  });

  $("h2, h3, h4").each((_, el) => {
    const $el = $(el);
    const text = $el.text().replace(/\u00a0/g, "").trim();
    if (!text) {
      $el.remove();
    }
  });
}

const MOTIVATION_HEADING_RE =
  /lettera motivazionale|motivation letter|statement of purpose|\bsop\b|personal statement|come redigere/i;

const COURSES_HEADING_RE =
  /popular courses|corsi popolari|what are the popular courses|quali sono i corsi|top courses|courses in/i;

const BENEFITS_HEADING_RE =
  /benefits of studying|vantaggi|why study|perche studiare|advantages of studying/i;

const HOW_TO_APPLY_HEADING_RE =
  /how to apply|come fare domanda|application steps|visa application steps|apply for a student visa/i;

function headingRank(tagName: string): number {
  const t = tagName.toLowerCase();
  if (t === "h2") return 2;
  if (t === "h3") return 3;
  if (t === "h4") return 4;
  return 9;
}

function wrapSectionAfterHeading(
  $: cheerio.CheerioAPI,
  headingEl: any,
  wrapperClass: string,
): void {
  const $h = $(headingEl);
  if ($h.next(`.${wrapperClass}`).length) return;

  const rank = headingRank(headingEl.tagName);
  const $wrapper = $("<div></div>");
  $wrapper.addClass(wrapperClass);

  let $cursor = $h.next();
  while ($cursor.length) {
    const raw = $cursor.get(0);
    const tagName =
      raw && typeof raw === "object" && "tagName" in raw && typeof raw.tagName === "string"
        ? raw.tagName.toLowerCase()
        : "";
    if (/^h[1-6]$/.test(tagName)) {
      const r = headingRank(tagName);
      if (r <= rank) break;
    }
    const $next = $cursor.next();
    $wrapper.append($cursor);
    $cursor = $next;
  }

  if ($wrapper.contents().length === 0) return;
  $wrapper.insertAfter($h);
}

/**
 * Wraps narrative blocks after motivation-letter headings so the React renderer
 * can replace the wrapper with accordions without fragile sibling parsing alone.
 */
function wrapMotivationLetterSection($: cheerio.CheerioAPI): void {
  $(`#${ROOT_ID}`)
    .find("h2, h3, h4")
    .each((_, el) => {
      const $h = $(el);
      const text = $h.text().replace(/\s+/g, " ").trim();
      if (!MOTIVATION_HEADING_RE.test(text)) return;

      wrapSectionAfterHeading($, el, "study-destination-rich-motivation");
    });
}

function wrapFeatureSections($: cheerio.CheerioAPI): void {
  $(`#${ROOT_ID}`)
    .find("h2, h3, h4")
    .each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (!text) return;

      if (COURSES_HEADING_RE.test(text)) {
        wrapSectionAfterHeading($, el, "study-destination-rich-courses");
        return;
      }

      if (BENEFITS_HEADING_RE.test(text)) {
        wrapSectionAfterHeading($, el, "study-destination-rich-benefits");
        return;
      }

      if (HOW_TO_APPLY_HEADING_RE.test(text)) {
        wrapSectionAfterHeading($, el, "study-destination-rich-howto");
      }
    });
}

function normalizeExternalLinks($: cheerio.CheerioAPI): void {
  const internalHost = "care2training.com";

  $("a[href]").each((_, el) => {
    const $a = $(el);
    const href = ($a.attr("href") ?? "").trim();
    if (!href.startsWith("http://") && !href.startsWith("https://")) return;

    try {
      const host = new URL(href).hostname;
      if (!host.endsWith(internalHost)) {
        $a.attr({ target: "_blank", rel: "noopener noreferrer" });
      }
    } catch {
      /* ignore invalid URLs */
    }
  });
}

/**
 * Sanitizes CMS HTML (e.g. Elementor exports), strips layout wrapper noise,
 * and emits semantic markup our Tailwind prose layer can style consistently.
 */
export function normalizeStudyDestinationHtml(raw: string): string {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return "";

  const wrapped = `<div id="${ROOT_ID}">${trimmed}</div>`;
  const $ = cheerio.load(wrapped, { xml: false });

  $(`#${ROOT_ID}`).find("script, style, noscript, iframe").remove();

  for (let i = 0; i < MAX_ELEMENTOR_PASSES; i++) {
    const before = $(`#${ROOT_ID}`).html() ?? "";

    unwrapSelectors($, [
      ".elementor-widget-container",
      ".e-con-inner",
      ".elementor-widget-wrap",
    ]);

    unwrapMatching($, "div[class*='elementor-element']");
    unwrapMatching($, "div[class*='elementor-']");
    unwrapMatching($, "div[class*='e-con']");
    unwrapMatching($, "div[class*='e-flex']");
    unwrapMatching($, "div[class*='e-parent']");
    unwrapMatching($, "div[class*='e-child']");
    unwrapMatching($, "div[class*='e-lazyloaded']");

    const after = $(`#${ROOT_ID}`).html() ?? "";
    if (before === after) break;
  }

  promoteConsultationCta($);
  wrapTables($);
  stripPresentationAttributes($);
  flattenBareSpans($);
  removeEmptyParagraphs($);
  wrapMotivationLetterSection($);
  wrapFeatureSections($);
  normalizeExternalLinks($);

  const dirty = $(`#${ROOT_ID}`).html() ?? "";

  ensurePurifyClassHook();
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel", "colspan", "rowspan", "class"],
    ALLOW_DATA_ATTR: false,
  });
}
