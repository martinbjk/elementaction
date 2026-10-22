import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SECTIONS, isSection } from '@/lib/sections';
import { formatArticleDate, getArticle, getArticleSlugs, type Article } from '@/lib/articles';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { withBase } from '@/lib/base-path';
import { ARTICLE_EMBEDS } from '@/lib/article-embeds/registry';
import { ArticleMarkdown } from '@/components/ArticleMarkdown';
import { ShareButton } from '@/components/ShareButton';

type Params = { params: { locale: string; section: string; slug: string } };


export function generateStaticParams({ params }: { params: { section?: string } }) {
  const sections = params.section ? [params.section].filter(isSection) : SECTIONS;
  return sections.flatMap((section) => getArticleSlugs(section).map((slug) => ({ section, slug })));
}

export async function generateMetadata({ params: { locale, section, slug } }: Params): Promise<Metadata> {
  if (!isSection(section)) return {};
  const article = getArticle(section, locale, slug);
  if (!article) return {};
  const description = article.metaDescription ?? article.excerpt;
  const image = {
    url: `${SITE_URL}${article.ogImage}`,
    alt: article.title,
    ...(article.ogImageWidth && article.ogImageHeight ? { width: article.ogImageWidth, height: article.ogImageHeight } : {})
  };
  return {
    title: article.title,
    description,
    alternates: localeAlternates(locale, `${section}/articles/${slug}/`),
    openGraph: { title: article.title, description, url: `${SITE_URL}/${locale}/${section}/articles/${slug}/`, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title: article.title, description, images: [image] }
  };
}

/**
 * Delar markdown runt den del som en interaktiv embed ersätter (samma
 * system som på skateboardeventcalendar.com, se lib/article-embeds/registry).
 * Hittas inte markörerna stoppas bygget hellre än att innehåll tappas tyst.
 */
function splice(raw: string, s: { from: string; to: string }, slug: string) {
  const content = raw.replace(/\r\n/g, '\n');
  const a = content.indexOf(s.from);
  const b = content.indexOf(s.to);
  if (a === -1 || b === -1 || b <= a) {
    throw new Error(`Artikel-embed för "${slug}": hittade inte markörerna ${JSON.stringify(s.from)} → ${JSON.stringify(s.to)}.`);
  }
  return { before: content.slice(0, a), after: content.slice(b) };
}

function jsonLd(article: Article, locale: string) {
  const url = `${SITE_URL}/${locale}/${article.section}/articles/${article.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    inLanguage: article.lang,
    image: [`${SITE_URL}${article.ogImage}`],
    url,
    mainEntityOfPage: url,
    publisher: { '@type': 'Organization', name: 'Elementaction', url: SITE_URL }
  };
}

export default async function ArticlePage({ params: { locale, section, slug } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) notFound();
  const article = getArticle(section, locale, slug);
  if (!article) notFound();
  const t = await getTranslations({ locale, namespace: 'articles' });
  const embed = ARTICLE_EMBEDS[article.slug];
  const parts = embed ? splice(article.content, embed.splice, article.slug) : null;

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(article, locale)) }} />
      <div className="max-w-3xl">
        <Link href={`/${section}/articles`} className="text-sm text-sec-muted underline-offset-4 hover:text-sec-ink hover:underline">
          {t('backToArticles')}
        </Link>
        <p className="mt-6 text-sm text-sec-muted">{formatArticleDate(article.date, locale)}</p>
        <h2 className="mt-2 font-head text-[clamp(2rem,5vw,3.5rem)] leading-[1.04] text-sec-ink">{article.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-sec-ink/85">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ShareButton url={`${SITE_URL}/${locale}/${section}/articles/${article.slug}/`} title={article.title} text={article.excerpt} />
          {article.isFallback && <span className="text-sm text-sec-muted">{t('onlyInEnglishNote')}</span>}
        </div>
      </div>

      {/* Läsytan: ljust papper i alla sektioner, med sektionens rubrikfont och accentfärg. */}
      <div className="mt-10 rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] sm:px-10 sm:py-12 lg:px-16">
        <div className="mx-auto max-w-[44rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase(article.ogImage)} alt="" className="mb-4 w-full rounded-xl border border-neutral-200" />
          {embed && parts ? (
            <>
              <ArticleMarkdown content={parts.before} slug={article.slug} />
              <div className="my-8">{embed.render()}</div>
              <ArticleMarkdown content={parts.after} slug={article.slug} />
            </>
          ) : (
            <ArticleMarkdown content={article.content} slug={article.slug} />
          )}
        </div>
      </div>
    </article>
  );
}
