import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { locales, type Locale } from '@/i18n/config';
import { SECTIONS, type SectionId } from './sections';

export * from './articles-shared';

/**
 * SERVER-ONLY. Artiklar ligger i content/articles/<sektion>/<språk>/<slug>.md
 * med samma frontmatter som på skateboardeventcalendar.com. Saknas en
 * artikel på besökarens språk visas den engelska versionen med en notis.
 *
 * Nytt fält: `kind: "design"` gör att artikeln visas under fliken Design
 * i stället för Artiklar. Utelämnat = vanlig artikel.
 */
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const FALLBACK_LOCALE: Locale = 'en';

const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug får bara innehålla a-z, 0-9 och bindestreck'),
  category: z.string().min(1),
  kind: z.enum(['article', 'design']).default('article'),
  lang: z.string().refine(isLocale, 'lang måste vara en känd språkkod (se src/i18n/config.ts)'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date måste vara på formen YYYY-MM-DD'),
  excerpt: z.string().min(1),
  metaDescription: z.string().min(1).optional(),
  ogImage: z.string().regex(/^\/images\/articles\/.+/, 'ogImage måste vara en /images/articles/…-sökväg'),
  tags: z.array(z.string()).optional()
});

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

export interface Article extends ArticleFrontmatter {
  section: SectionId;
  content: string;
  isFallback: boolean;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

function readPngSize(absPath: string): { width: number; height: number } | undefined {
  let fd: number | undefined;
  try {
    fd = fs.openSync(absPath, 'r');
    const header = Buffer.alloc(24);
    if (fs.readSync(fd, header, 0, 24, 0) < 24) return undefined;
    if (header.readUInt32BE(0) !== 0x89504e47) return undefined;
    return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
  } catch {
    return undefined;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

function listFiles(section: SectionId, locale: string): string[] {
  const dir = path.join(ARTICLES_DIR, section, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

function parse(section: SectionId, locale: string, file: string): Article {
  const rel = `content/articles/${section}/${locale}/${file}`;
  const { data, content } = matter(fs.readFileSync(path.join(ARTICLES_DIR, section, locale, file), 'utf-8'));
  const result = ArticleFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Frontmatter-fel i ${rel}:\n${issues}`);
  }
  if (result.data.slug !== file.replace(/\.md$/, '')) {
    throw new Error(`${rel}: "slug" (${result.data.slug}) matchar inte filnamnet.`);
  }
  const size = readPngSize(path.join(process.cwd(), 'public', result.data.ogImage));
  return {
    ...result.data,
    section,
    content,
    isFallback: false,
    ogImageWidth: size?.width,
    ogImageHeight: size?.height
  };
}

/** Alla artiklar (båda sorterna) i en sektion för ett språk, nyast först. */
export function getSectionContent(section: SectionId, locale: string): Article[] {
  const primary = listFiles(section, locale).map((f) => parse(section, locale, f));
  const have = new Set(primary.map((a) => a.slug));
  const fallback =
    locale === FALLBACK_LOCALE
      ? []
      : listFiles(section, FALLBACK_LOCALE)
          .map((f) => parse(section, FALLBACK_LOCALE, f))
          .filter((a) => !have.has(a.slug))
          .map((a) => ({ ...a, isFallback: true }));
  return [...primary, ...fallback].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticles(section: SectionId, locale: string): Article[] {
  return getSectionContent(section, locale).filter((a) => a.kind === 'article');
}

export function getDesignPieces(section: SectionId, locale: string): Article[] {
  return getSectionContent(section, locale).filter((a) => a.kind === 'design');
}

export function getArticle(section: SectionId, locale: string, slug: string): Article | undefined {
  return getSectionContent(section, locale).find((a) => a.slug === slug);
}

export function getArticleSlugs(section: SectionId): string[] {
  const slugs = new Set<string>();
  for (const locale of locales) for (const f of listFiles(section, locale)) slugs.add(f.replace(/\.md$/, ''));
  return [...slugs];
}

/** Senaste artiklarna över alla sektioner (för startsidan). */
export function getLatestAcrossSections(locale: string, limit: number): Article[] {
  return SECTIONS.flatMap((s) => getSectionContent(s, locale))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
