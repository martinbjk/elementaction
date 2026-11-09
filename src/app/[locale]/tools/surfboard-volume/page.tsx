import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SurfboardVolume } from '@/components/tools/SurfboardVolume';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const title = t('items.vol.name');
  const description = t('items.vol.desc');
  const alternates = localeAlternates(locale, 'tools/surfboard-volume/');
  const images = [{ url: `${SITE_URL}/images/tools/surfboard-volume.png`, width: 1200, height: 630, alt: title }];
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
    <ToolFrame title={t('items.vol.name')} lead={t('items.vol.desc')} back={t('back')}>
      <SurfboardVolume />
    </ToolFrame>
  );
}
