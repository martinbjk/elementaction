import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SurfboardVolume } from '@/components/tools/SurfboardVolume';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('items.vol.name'), description: t('items.vol.desc'), alternates: localeAlternates(locale, 'tools/surfboard-volume/') };
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
