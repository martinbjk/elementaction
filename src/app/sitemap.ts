import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { SECTIONS, TABS } from '@/lib/sections';
import { getEvents } from '@/lib/events';
import { getArticleLocales, getArticleSlugs } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/** Alla sidor × alla språk, med hreflang-alternativ per sida. Artiklar bara på sina riktiga språk. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = ['', 'about/', 'privacy/'];
  for (const s of SECTIONS) {
    paths.push(`${s}/`);
    for (const tab of TABS) paths.push(`${s}/${tab}/`);
    for (const e of getEvents(s)) paths.push(`${s}/calendar/${e.slug}/`);
  }
  const entries = (p: string, langs: readonly string[]) => {
    const main = langs.includes(defaultLocale) ? defaultLocale : langs[0];
    const languages = Object.fromEntries([...langs.map((l) => [l, `${SITE_URL}/${l}/${p}`]), ['x-default', `${SITE_URL}/${main}/${p}`]]);
    return langs.map((l) => ({ url: `${SITE_URL}/${l}/${p}`, alternates: { languages } }));
  };
  // Artiklar: bara de språk där artikeln finns på riktigt (se articleAlternates i lib/seo).
  const articles = SECTIONS.flatMap((s) =>
    getArticleSlugs(s).flatMap((slug) => entries(`${s}/articles/${slug}/`, getArticleLocales(s, slug)))
  );
  return [...paths.flatMap((p) => entries(p, locales)), ...articles];
}
