import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SkateShopFinder } from '@/components/tools/SkateShopFinder';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const title = t('items.shops.seoTitle');
  const description = t('items.shops.desc');
  const alternates = localeAlternates(locale, 'tools/skate-shop-finder/');
  const images = [{ url: `${SITE_URL}/images/tools/skate-shop-finder.png`, width: 1200, height: 630, alt: title }];
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
    <ToolFrame title={t('items.shops.name')} lead={t('items.shops.desc')} back={t('back')}>
      <SkateShopFinder />
    </ToolFrame>
  );
}
