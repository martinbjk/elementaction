import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/lib/seo';
import { TOOLS, TOOL_GROUPS, type ToolEntry } from '@/lib/tools';
import { ExternalLink } from 'lucide-react';
import { ToolFrame } from '@/components/tools/ToolFrame';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  return { title: t('title'), description: t('lead'), alternates: localeAlternates(locale, 'tools/') };
}

export default async function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tools' });

  const inner = (tool: ToolEntry) => (
    <>
      <span className="h-1.5 w-12 rounded-full" style={{ background: tool.color }} aria-hidden />
      <span className="mt-4 text-xl font-semibold text-white group-hover:underline group-hover:underline-offset-4">{t(`items.${tool.key}.name`)}</span>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{t(`items.${tool.key}.desc`)}</span>
      {tool.kind === 'external' && <span className="mt-3 text-xs leading-relaxed text-white/50">{t(`items.${tool.key}.note`)}</span>}
      <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/85">
        {tool.kind === 'external' ? (
          <>
            {t('external')} <ExternalLink size={14} aria-hidden />
          </>
        ) : (
          <>{tool.kind === 'article' ? t('inArticle') : t('open')} →</>
        )}
      </span>
    </>
  );
  const cls = 'group flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-6 transition hover:border-white/50';
  const card = (tool: ToolEntry) =>
    tool.kind === 'external' ? (
      <a key={tool.key} href={tool.href} target="_blank" rel="noopener" className={cls}>
        {inner(tool)}
      </a>
    ) : (
      <Link key={tool.key} href={tool.href} className={cls}>
        {inner(tool)}
      </Link>
    );

  return (
    <ToolFrame title={t('title')} lead={t('lead')}>
      {TOOL_GROUPS.map((g, i) => (
        <section key={g} className={i ? 'mt-14' : ''}>
          <h2 className="text-2xl font-bold text-white">{t(`groups.${g}`)}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{TOOLS.filter((x) => x.group === g).map(card)}</div>
        </section>
      ))}
    </ToolFrame>
  );
}
