import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/lib/seo';
import { TOOLS, type ToolEntry } from '@/lib/tools';
import { ToolFrame } from '@/components/tools/ToolFrame';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('title'), description: t('lead'), alternates: localeAlternates(locale, 'tools/') };
}

export default async function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });

  const card = (tool: ToolEntry) => (
    <Link
      key={tool.key}
      href={tool.href}
      className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-white/50"
    >
      <span className="h-1.5 w-12 rounded-full" style={{ background: tool.color }} aria-hidden />
      <span className="mt-4 text-xl font-semibold text-white group-hover:underline group-hover:underline-offset-4">{t(`items.${tool.key}.name`)}</span>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{t(`items.${tool.key}.desc`)}</span>
      <span className="mt-4 text-sm font-medium text-white/85">
        {tool.kind === 'article' ? t('inArticle') : t('open')} →
      </span>
    </Link>
  );

  return (
    <ToolFrame title={t('title')} lead={t('lead')}>
      <h2 className="text-2xl font-bold text-white">{t('new')}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{TOOLS.filter((x) => x.kind === 'page').map(card)}</div>
      <h2 className="mt-14 text-2xl font-bold text-white">{t('existing')}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{TOOLS.filter((x) => x.kind === 'article').map(card)}</div>
    </ToolFrame>
  );
}
