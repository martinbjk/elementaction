import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SeasonGuide } from '@/components/tools/SeasonGuide';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('items.season.name'), description: t('items.season.desc'), alternates: localeAlternates(locale, 'tools/season-guide/') };
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
