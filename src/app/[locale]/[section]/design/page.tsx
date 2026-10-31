import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection } from '@/lib/sections';
import { getDesignWall } from '@/lib/design-wall';
import { getDesignPieces } from '@/lib/articles';
import { localeAlternates } from '@/lib/seo';
import { ArticleCard, BlockHeader, DesignWall, EmptyState } from '@/components/Blocks';

type Params = { params: { locale: string; section: string } };

export const generateStaticParams = sectionParams;

export async function generateMetadata({ params: { locale, section } }: Params): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return { title: t('design.title', { section: t(`sections.${section}.name`) }), description: t('design.intro'), alternates: localeAlternates(locale, `${section}/design/`) };
}

export default async function DesignPage({ params: { locale, section } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) return null;
  const t = await getTranslations({ locale });
  // Designinläggen visas som kort överst; väggen under visar bilderna från övriga artiklar.
  const pieces = getDesignPieces(section, locale);
  const items = getDesignWall(section, locale).filter((i) => i.article.kind !== 'design');
  return (
    <div>
      <BlockHeader as="h1" title={t('design.title', { section: t(`sections.${section}.name`) })} />
      <p className="mt-4 max-w-2xl text-sec-muted">{t('design.intro')}</p>
      {pieces.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pieces.map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} onlyInEnglish={t('articles.onlyInEnglish')} />
          ))}
        </div>
      )}
      <div className="mt-10">
        {items.length ? (
          <DesignWall items={items} fromArticle={t('design.fromArticle')} />
        ) : (
          !pieces.length && <EmptyState title={t('design.emptyTitle')} body={t('design.emptyBody')} />
        )}
      </div>
    </div>
  );
}
