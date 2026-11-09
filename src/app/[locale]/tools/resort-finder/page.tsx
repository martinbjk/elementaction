import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { ResortFinder } from '@/components/tools/ResortFinder';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('items.resort.name'), description: t('items.resort.desc'), alternates: localeAlternates(locale, 'tools/resort-finder/') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });
  return (
    <ToolFrame title={t('items.resort.name')} lead={t('items.resort.desc')} back={t('back')}>
      <ResortFinder />
    </ToolFrame>
  );
}
