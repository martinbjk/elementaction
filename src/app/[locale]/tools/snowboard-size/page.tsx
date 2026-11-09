import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { SnowboardSize } from '@/components/tools/SnowboardSize';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('items.sbsize.name'), description: t('items.sbsize.desc'), alternates: localeAlternates(locale, 'tools/snowboard-size/') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });
  return (
    <ToolFrame title={t('items.sbsize.name')} lead={t('items.sbsize.desc')} back={t('back')}>
      <SnowboardSize />
    </ToolFrame>
  );
}
