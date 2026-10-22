import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection } from '@/lib/sections';
import { localeAlternates } from '@/lib/seo';
import { videos } from '@/data/videos';
import { BlockHeader, EmptyState } from '@/components/Blocks';
import { VideoGrid } from '@/components/VideoGrid';

type Params = { params: { locale: string; section: string } };

export const generateStaticParams = sectionParams;

export async function generateMetadata({ params: { locale, section } }: Params): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return { title: t('videos.title', { section: t(`sections.${section}.name`) }), description: t('videos.intro'), alternates: localeAlternates(locale, `${section}/videos/`) };
}

export default async function VideosPage({ params: { locale, section } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) return null;
  const t = await getTranslations({ locale });
  const list = videos[section];
  return (
    <div>
      <BlockHeader title={t('videos.title', { section: t(`sections.${section}.name`) })} />
      <p className="mt-4 max-w-2xl text-sec-muted">{t('videos.intro')}</p>
      <div className="mt-8">{list.length ? <VideoGrid videos={list} /> : <EmptyState title={t('videos.emptyTitle')} body={t('videos.emptyBody')} />}</div>
    </div>
  );
}
