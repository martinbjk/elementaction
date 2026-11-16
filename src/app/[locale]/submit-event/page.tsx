import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localeAlternates } from '@/lib/seo';
import { ToolFrame } from '@/components/tools/ToolFrame';
import { TipEvent } from '@/components/TipEvent';

/** "Tipsa om ett event": förklarar vad vi behöver och öppnar ett ifyllt mejl (se TipEvent). */
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tip' });
  return { title: t('title'), description: t('lead'), alternates: localeAlternates(locale, 'submit-event/') };
}

export default async function SubmitEventPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tip' });
  const need = t.raw('need') as string[];
  const how = t.raw('how') as string[];
  const [before, after] = t('privacy').split(t('privacyLink'));

  return (
    <ToolFrame title={t('title')} lead={t('lead')}>
      <TipEvent variant="button" />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-bold text-white">{t('needTitle')}</h2>
          <ul className="mt-4 space-y-2">
            {need.map((x) => (
              <li key={x} className="flex gap-3 text-white/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">{t('howTitle')}</h2>
          <ol className="mt-4 space-y-3">
            {how.map((x, i) => (
              <li key={x} className="flex gap-3 text-white/80">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">{i + 1}</span>
                {x}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-white/60">
        {before}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
          {t('privacyLink')}
        </Link>
        {after}
      </p>
    </ToolFrame>
  );
}
