import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection } from '@/lib/sections';
import { getArticles } from '@/lib/articles';
import { localeAlternates } from '@/lib/seo';
import { ArticleCard, BlockHeader, EmptyState } from '@/components/Blocks';

type Params = { params: { locale: string; section: string } };

export const generateStaticParams = sectionParams;

export async function generateMetadata({ params: { locale, section } }: Params): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    title: t('articles.title', { section: t(`sections.${section}.name`) }),
    description: t(`sections.${section}.intro`),
    alternates: localeAlternates(locale, `${section}/articles/`)
  };
}

export default async function ArticlesPage({ params: { locale, section } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) return null;
  const t = await getTranslations({ locale });
  const articles = getArticles(section, locale);
  const [lead, ...rest] = articles;

  return (
    <div>
      <BlockHeader as="h1" title={t('articles.title', { section: t(`sections.${section}.name`) })} />
      {!lead ? (
        <div className="mt-8">
          <EmptyState title={t('articles.emptyTitle')} body={t('articles.emptyBody')} />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Den senaste artikeln får dubbel bredd — en tydlig ingång i listan. */}
          <div className="md:col-span-2">
            <ArticleCard article={lead} locale={locale} onlyInEnglish={t('articles.onlyInEnglish')} designLabel={t('tabs.design')} />
          </div>
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} onlyInEnglish={t('articles.onlyInEnglish')} designLabel={t('tabs.design')} />
          ))}
        </div>
      )}
    </div>
  );
}
