import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { WetsuitGuide } from '@/components/tools/WetsuitGuide';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('items.wetsuit.name'), description: t('items.wetsuit.desc'), alternates: localeAlternates(locale, 'tools/wetsuit-guide/') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });
  return (
    <ToolFrame title={t('items.wetsuit.name')} lead={t('items.wetsuit.desc')} back={t('back')}>
      <WetsuitGuide />
    </ToolFrame>
  );
}
