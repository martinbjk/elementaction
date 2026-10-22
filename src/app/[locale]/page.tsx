import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SECTIONS, SECTION_COLORS, type SectionId } from '@/lib/sections';
import { getEvents, getUpcomingEvents } from '@/lib/events';
import { getArticles, getLatestAcrossSections } from '@/lib/articles';
import { formatArticleDate } from '@/lib/articles-shared';
import { withBase } from '@/lib/base-path';
import { ElementPanels } from '@/components/ElementPanels';
import { EventPreview } from '@/components/EventPreview';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const buildTime = new Date().toISOString();

  const counts = Object.fromEntries(
    SECTIONS.map((s) => [s, { events: getEvents(s).length, articles: getArticles(s, locale).length }])
  ) as Record<SectionId, { events: number; articles: number }>;

  // Nästa event per sektion som har några — så startsidan speglar alla element.
  const nextUp = SECTIONS.map((s) => ({ section: s, events: getUpcomingEvents(s).slice(0, 3) })).filter((g) => g.events.length);
  const latest = getLatestAcrossSections(locale, 4);

  return (
    <div data-section="home" className="surface-home">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 md:pt-12">
        <p className="text-white/60">{t('home.kicker')}</p>
        <h1 className="mt-2 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98] tracking-[-0.03em] text-white">
          {SECTIONS.map((s, i) => (
            <span key={s} className={['font-surf font-medium', 'font-skate', 'font-snow font-medium', 'font-fire font-extrabold'][i]}>
              {t(`sections.${s}.element`)}.{i < SECTIONS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{t('home.lead')}</p>
      </div>

      <ElementPanels locale={locale} counts={counts} />

      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        {nextUp.length > 0 && (
          <section>
            <h2 className="border-b border-white/15 pb-3 text-2xl font-semibold text-white">{t('home.nextUp')}</h2>
            <div className="mt-6 space-y-8">
              {nextUp.map(({ section, events }) => (
                <div key={section} data-section={section} className={`surface-${section} rounded-2xl p-4 text-sec-ink sm:p-5`}>
                  <Link href={`/${section}/calendar`} className="mb-3 inline-block font-head text-xl hover:underline">
                    {t(`sections.${section}.name`)}
                  </Link>
                  <EventPreview events={events} section={section} buildTime={buildTime} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="border-b border-white/15 pb-3 text-2xl font-semibold text-white">{t('home.latest')}</h2>
          <ul className="mt-6 divide-y divide-white/10">
            {latest.map((a) => (
              <li key={`${a.section}-${a.slug}`}>
                <Link href={`/${a.section}/articles/${a.slug}`} className="group grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8.5rem_1fr]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(a.ogImage)} alt="" loading="lazy" className="aspect-[1200/630] w-full rounded-lg object-cover" />
                  <span>
                    <span className="flex items-center gap-2 text-sm text-white/55">
                      <span className="h-2 w-2 rounded-full" style={{ background: SECTION_COLORS[a.section].main }} aria-hidden />
                      {t(`sections.${a.section}.name`)}, {formatArticleDate(a.date, locale)}
                    </span>
                    <span className="mt-1 block font-medium leading-snug text-white group-hover:underline group-hover:underline-offset-4">{a.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
