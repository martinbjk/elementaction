import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SeasonGuide } from '@/components/tools/SeasonGuide';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const title = t('items.season.seoTitle');
  const description = t('items.season.desc');
  const alternates = localeAlternates(locale, 'tools/season-guide/');
  const images = [{ url: `${SITE_URL}/images/tools/season-guide.png`, width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: 'website', images },
    twitter: { card: 'summary_large_image', title, description, images: images.map((x) => x.url) }
  };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });
  return (
    <ToolFrame title={t('items.season.name')} lead={t('items.season.desc')} back={t('back')}>
      <SeasonGuide />
    </ToolFrame>
  );
}
