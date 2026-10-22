import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SECTIONS, TABS, type SectionId } from '@/lib/sections';
import { SectionArt } from './SectionArt';

/**
 * STARTSIDANS FYRA BLOCK.
 *
 * Desktop: fyra höga paneler sida vid sida. Den panel man pekar på
 * (eller tabbar in i) växer och visar sin ingress — de andra krymper.
 * Mobil: panelerna staplas och visar allt direkt.
 * Varje panel sätter data-section, så färger och rubrikfont blir rätt
 * automatiskt (snöpanelen får mörk text, surfpanelen ljus osv).
 */
export async function ElementPanels({ locale, counts }: { locale: string; counts: Record<SectionId, { events: number; articles: number }> }) {
  const t = await getTranslations({ locale });

  return (
    <div className="flex flex-col gap-1.5 bg-[#0e0f11] p-1.5 md:h-[min(70vh,700px)] md:min-h-[540px] md:flex-row">
      {SECTIONS.map((s) => (
        <section
          key={s}
          data-section={s}
          style={{ containerType: 'inline-size' }}
          className="group/panel relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl text-sec-ink transition-[flex-grow] duration-500 ease-out md:min-h-0 md:flex-1 md:hover:flex-[2.3] md:focus-within:flex-[2.3]"
        >
          <SectionArt section={s} className="transition-transform duration-700 ease-out md:group-hover/panel:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-sec-bg via-sec-bg/60 to-transparent" />

          <Link href={`/${s}`} className="absolute inset-0 z-10" aria-label={t(`sections.${s}.name`)} />

          <div className="relative z-20 p-6 lg:p-8 pointer-events-none">
            <p className="text-sm font-medium text-sec-ink/80">{t(`sections.${s}.element`)}</p>
            <h2 className="panel-title mt-1 font-head leading-[0.95] tracking-tight">
              {t(`sections.${s}.name`)}
            </h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-sec-ink/85 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover/panel:max-h-32 md:group-hover/panel:opacity-100 md:group-focus-within/panel:max-h-32 md:group-focus-within/panel:opacity-100">
              {t(`sections.${s}.tagline`)}
            </p>
            <p className="mt-3 text-sm text-sec-ink/75 first-letter:uppercase">
              {t('home.events', { count: counts[s].events })}, {t('home.articles', { count: counts[s].articles })}
            </p>
            <ul className="pointer-events-auto mt-4 flex flex-wrap gap-1.5">
              {TABS.map((tab) => (
                <li key={tab}>
                  <Link
                    href={`/${s}/${tab}`}
                    className="relative z-20 block rounded-full border border-sec-ink/35 bg-sec-bg/40 px-3 py-1.5 text-[13px] backdrop-blur-sm transition hover:border-sec-ink hover:bg-sec-ink hover:text-sec-bg"
                  >
                    {t(`tabs.${tab}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
