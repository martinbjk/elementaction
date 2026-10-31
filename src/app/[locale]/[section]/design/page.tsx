import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection } from '@/lib/sections';
import { getDesignWall } from '@/lib/design-wall';
import { localeAlternates } from '@/lib/seo';
import { BlockHeader, DesignWall, EmptyState } from '@/components/Blocks';

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
  const items = getDesignWall(section, locale);
  return (
    <div>
      <BlockHeader as="h1" title={t('design.title', { section: t(`sections.${section}.name`) })} />
      <p className="mt-4 max-w-2xl text-sec-muted">{t('design.intro')}</p>
      <div className="mt-8">
        {items.length ? <DesignWall items={items} fromArticle={t('design.fromArticle')} /> : <EmptyState title={t('design.emptyTitle')} body={t('design.emptyBody')} />}
      </div>
    </div>
  );
}
