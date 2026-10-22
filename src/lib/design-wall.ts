import { getSectionContent, resolveArticleImage, type Article } from './articles';
import type { SectionId } from './sections';

/**
 * DESIGNVÄGGEN — samlar allt visuellt arbete i en sektion:
 *  1. artiklar med `kind: "design"` (egna designinlägg, visas först)
 *  2. varje bild/grafik som används i sektionens artiklar (kartor,
 *     affischer, flödesscheman, OG-bilder) — så att grafiken du redan
 *     gjort syns som ett eget galleri, med länk tillbaka till artikeln.
 * Inget behöver underhållas manuellt: lägger du en bild i en artikel
 * dyker den upp här vid nästa bygge.
 */
export interface DesignItem {
  src: string;
  alt: string;
  section: SectionId;
  article: Pick<Article, 'slug' | 'title' | 'kind'>;
}

const IMG_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

export function getDesignWall(section: SectionId, locale: string): DesignItem[] {
  const content = getSectionContent(section, locale);
  const ordered = [...content.filter((a) => a.kind === 'design'), ...content.filter((a) => a.kind !== 'design')];
  const seen = new Set<string>();
  const items: DesignItem[] = [];
  for (const a of ordered) {
    const ref = { slug: a.slug, title: a.title, kind: a.kind };
    const push = (src: string, alt: string) => {
      if (seen.has(src)) return;
      seen.add(src);
      items.push({ src, alt: alt || a.title, section, article: ref });
    };
    push(a.ogImage, a.title);
    for (const m of a.content.matchAll(IMG_RE)) {
      const raw = m[2] ?? '';
      if (/^https?:/.test(raw)) continue;
      push(resolveArticleImage(raw, a.slug), m[1] ?? '');
    }
  }
  return items;
}
