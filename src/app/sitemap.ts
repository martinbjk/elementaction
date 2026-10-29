import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { SECTIONS, TABS } from '@/lib/sections';
import { getEvents } from '@/lib/events';
import { getArticleSlugs } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/** Alla sidor × alla språk, med hreflang-alternativ per sida. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = ['', 'about/', 'privacy/'];
  for (const s of SECTIONS) {
    paths.push(`${s}/`);
    for (const tab of TABS) paths.push(`${s}/${tab}/`);
    for (const e of getEvents(s)) paths.push(`${s}/calendar/${e.slug}/`);
    for (const slug of getArticleSlugs(s)) paths.push(`${s}/articles/${slug}/`);
  }
  return paths.flatMap((p) => {
    const languages = Object.fromEntries([...locales.map((l) => [l, `${SITE_URL}/${l}/${p}`]), ['x-default', `${SITE_URL}/${defaultLocale}/${p}`]]);
    return locales.map((l) => ({ url: `${SITE_URL}/${l}/${p}`, alternates: { languages } }));
  });
}
