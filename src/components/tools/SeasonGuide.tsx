'use client';

import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SEASONS, type SeasonKind } from '@/lib/tools/seasons';

/**
 * SÄSONGSGUIDEN — välj månad, se var det är bra surf och bra snö just då.
 * Data och källor: src/lib/tools/seasons.ts. Under väljaren visas hela året
 * som ett rutnät (en rad per resmål), så man ser säsongerna på en gång.
 */
const MONTHS = {
  sv: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
const MONTHS_LONG = {
  sv: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const T = {
  sv: {
    pick: 'Välj månad',
    goodIn: (m: string) => `Bra i ${m}`,
    surf: 'Surf',
    snow: 'Snö',
    peak: 'Högsäsong',
    none: 'Inget i guiden just den här månaden.',
    year: 'Hela året',
    legendGood: 'Bra',
    legendPeak: 'Bäst',
    source: 'Källa',
    article: 'Läs artikeln',
    note: 'Säsonger är genomsnitt. Kolla alltid prognosen och ortens egen webbplats innan du bokar.'
  },
  en: {
    pick: 'Pick a month',
    goodIn: (m: string) => `Good in ${m}`,
    surf: 'Surf',
    snow: 'Snow',
    peak: 'Peak season',
    none: 'Nothing in the guide for this month.',
    year: 'The whole year',
    legendGood: 'Good',
    legendPeak: 'Best',
    source: 'Source',
    article: 'Read the article',
    note: 'Seasons are averages. Always check the forecast and the resort’s own website before you book.'
  }
};

export function SeasonGuide() {
  const locale = useLocale();
  const lang = locale === 'sv' ? 'sv' : 'en';
  const t = T[lang];
  // Startar på januari i den statiska HTML:en och hoppar till aktuell månad i webbläsaren
  // (annars skulle byggets månad och besökarens månad krocka vid hydrering).
  const [month, setMonth] = useState(1);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);

  const list = (kind: SeasonKind) =>
    SEASONS.filter((x) => x.kind === kind && x.good.includes(month)).sort(
      (a, b) => Number(b.peak.includes(month)) - Number(a.peak.includes(month))
    );

  return (
    <div>
      <p className="text-sm font-semibold text-white">{t.pick}</p>
      <div className="mt-2 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {MONTHS[lang].map((m, i) => (
          <button
            key={m}
            type="button"
            aria-pressed={month === i + 1}
            onClick={() => setMonth(i + 1)}
            className={clsx(
              'rounded-lg border py-2 text-sm transition',
              month === i + 1 ? 'border-white bg-white font-semibold text-black' : 'border-white/15 text-white/75 hover:border-white/50'
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">{t.goodIn(MONTHS_LONG[lang][month - 1] ?? '')}</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {(['surf', 'snow'] as SeasonKind[]).map((kind) => {
          const items = list(kind);
          return (
            <section key={kind} className="rounded-3xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className={clsx('h-3 w-3 rounded-full', kind === 'surf' ? 'bg-[#3b8eea]' : 'bg-[#5cb6ff]')} />
                {kind === 'surf' ? t.surf : t.snow}
                <span className="text-sm font-normal text-white/50">({items.length})</span>
              </h3>
              {items.length === 0 ? (
                <p className="mt-4 text-sm text-white/60">{t.none}</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {items.map((x) => (
                    <li key={x.id} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                      <p className="font-medium text-white">
                        {x.name[lang]}
                        {x.peak.includes(month) && (
                          <span className="ml-2 rounded-full bg-[#f5c542] px-2 py-0.5 align-middle text-xs font-semibold text-black">{t.peak}</span>
                        )}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{x.note[lang]}</p>
                      <p className="mt-1.5 text-xs text-white/50">
                        {x.article && (
                          <>
                            <Link href={`/${x.article}`} className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white">
                              {t.article}
                            </Link>
                            {' · '}
                          </>
                        )}
                        {t.source}:{' '}
                        <a href={x.source.url} target="_blank" rel="noreferrer noopener" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                          {x.source.label}
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-white">{t.year}</h2>
      <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
        <span className="flex items-center gap-1.5"><span className="h-3 w-5 rounded-sm bg-white/35" />{t.legendGood}</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-5 rounded-sm bg-[#f5c542]" />{t.legendPeak}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-[3px] text-sm">
          <thead>
            <tr>
              <th className="w-56 text-left font-normal text-white/50" />
              {MONTHS[lang].map((m, i) => (
                <th key={m} className={clsx('text-center text-xs font-normal', month === i + 1 ? 'text-white' : 'text-white/50')}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(['surf', 'snow'] as SeasonKind[]).map((kind) => (
              <Fragment key={kind}>
                <tr>
                  <td colSpan={13} className="pt-4 text-xs font-semibold uppercase tracking-wider text-white/60">{kind === 'surf' ? t.surf : t.snow}</td>
                </tr>
                {SEASONS.filter((x) => x.kind === kind).map((x) => (
                  <tr key={x.id}>
                    <td className="pr-3 text-white/85">{x.name[lang]}</td>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((mo) => (
                      <td
                        key={mo}
                        title={`${x.name[lang]}: ${MONTHS_LONG[lang][mo - 1]}`}
                        className={clsx(
                          'h-6 rounded-sm',
                          x.peak.includes(mo) ? 'bg-[#f5c542]' : x.good.includes(mo) ? 'bg-white/35' : 'bg-white/[0.05]',
                          mo === month && 'outline outline-1 outline-white'
                        )}
                      />
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-white/60">{t.note}</p>
    </div>
  );
}
