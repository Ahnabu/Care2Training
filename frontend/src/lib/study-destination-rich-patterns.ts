/** Heading text (any locale) hints for upgrading `<ul>` lists to rich UI. */

export function normalizeHeadingKey(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function matchesUniversityListHeading(text: string): boolean {
  const k = normalizeHeadingKey(text);
  return (
    /\bmigliori universit/.test(k) ||
    /\bbest universities\b/.test(k) ||
    /\btop universities\b/.test(k) ||
    /\buniversities in\b/.test(k) ||
    /\buniversita in\b/.test(k) ||
    /\bprincipal.*universit/.test(k) ||
    /\btop uni/.test(k) ||
    /\bleading universities\b/.test(k) ||
    /\bmeilleures universit/.test(k)
  );
}

export function matchesPopularCoursesHeading(text: string): boolean {
  const k = normalizeHeadingKey(text);
  return (
    /\bcorsi popolari\b/.test(k) ||
    /\bpopular courses\b/.test(k) ||
    /\bquali sono i corsi\b/.test(k) ||
    /\btop courses\b/.test(k) ||
    /\bcourses to study\b/.test(k) ||
    /\bcorsi da studiare\b/.test(k) ||
    /\bprogrammi popolari\b/.test(k)
  );
}

export function matchesPostStudyWorkHeading(text: string): boolean {
  const k = normalizeHeadingKey(text);
  return (
    /\bopportunita di lavoro post-studio\b/.test(k) ||
    /\bpost-study work\b/.test(k) ||
    /\bpost study work\b/.test(k) ||
    /\blavoro post-studio\b/.test(k) ||
    /\bafter graduation\b.*\bwork\b/.test(k) ||
    /\bpost.?graduate work\b/.test(k) ||
    /\bprincipal.*ruoli\b/.test(k) ||
    /\bstipendio medio\b/.test(k) ||
    /\baverage annual salary\b/.test(k)
  );
}

/** Motivation / SOP sections are wrapped server-side in `.study-destination-rich-motivation`. */
