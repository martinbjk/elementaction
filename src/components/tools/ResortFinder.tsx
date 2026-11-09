'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RESORTS, type Resort, type ResortRegion } from '@/lib/tools/resorts';

/**
 * RESORTFINNAREN — filtrera de 26 orterna (24 rader, delade liftsystem
 * slås ihop) i resortguiden. Data: src/lib/tools/resorts.ts.
 */
type Feature = 'halfpipe' | 'park' | 'glacier' | 'summer' | 'freeride';
type Sort = 'top' | 'km' | 'name';

const REGIONS: ResortRegion[] = ['france', 'switzerland', 'austria', 'europe', 'northAmerica', 'asiaPacific'];
const FEATURES: Feature[] = ['park', 'halfpipe', 'freeride', 'glacier', 'summer'];

const T = {
  sv: {
    region: 'Område',
    all: 'Alla',
    regions: { france: 'Frankrike', switzerland: 'Schweiz', austria: 'Österrike', europe: 'Övriga Europa', northAmerica: 'Nordamerika', asiaPacific: 'Japan och Nya Zeeland' } as Record<ResortRegion, string>,
    want: 'Jag vill ha',
    features: { park: 'Snowpark', halfpipe: 'Halfpipe', freeride: 'Freeride', glacier: 'Glaciär', summer: 'Åka på sommaren' } as Record<Feature, string>,
    minTop: 'Liftar som går högre än',
    any: 'spelar ingen roll',
    sort: 'Sortera',
    sorts: { top: 'Högst först', km: 'Flest pistkilometer', name: 'Namn' } as Record<Sort, string>,
    count: (n: number) => `${n} ${n === 1 ? 'ort' : 'orter'}`,
    none: 'Ingen ort matchar alla filter. Ta bort ett filter.',
    top: 'Topp',
    terrain: 'Terräng',
    lifts: 'Liftar',
    season: 'Säsong',
    unknown: 'okänt',
    reset: 'Rensa filter',
    guide: 'Läs resortguiden med mer om varje ort',
    note: 'Flaggorna sätts bara när källan uttryckligen nämner saken. Saknas en flagga kan orten ändå ha det, kolla ortens egen webbplats. Siffrorna gäller hela liftsystemet.'
  },
  en: {
    region: 'Region',
    all: 'All',
    regions: { france: 'France', switzerland: 'Switzerland', austria: 'Austria', europe: 'Rest of Europe', northAmerica: 'North America', asiaPacific: 'Japan and New Zealand' } as Record<ResortRegion, string>,
    want: 'I want',
    features: { park: 'Snowpark', halfpipe: 'Halfpipe', freeride: 'Freeride', glacier: 'Glacier', summer: 'Summer riding' } as Record<Feature, string>,
    minTop: 'Lifts higher than',
    any: 'any height',
    sort: 'Sort',
    sorts: { top: 'Highest first', km: 'Most piste km', name: 'Name' } as Record<Sort, string>,
    count: (n: number) => `${n} ${n === 1 ? 'resort' : 'resorts'}`,
    none: 'No resort matches all filters. Remove a filter.',
    top: 'Top',
    terrain: 'Terrain',
    lifts: 'Lifts',
    season: 'Season',
    unknown: 'unknown',
    reset: 'Clear filters',
    guide: 'Read the resort guide for more on each resort',
    note: 'Flags are only set when the source mentions the feature. A missing flag does not mean the resort lacks it, so check its own website. Figures are for the whole lift system.'
  }
};

const HEIGHTS = [0, 2000, 2500, 3000, 3500];

const COUNTRY_SV: Record<string, string> = {
  France: 'Frankrike', Switzerland: 'Schweiz', Austria: 'Österrike', Italy: 'Italien', Andorra: 'Andorra',
  Norway: 'Norge', Slovakia: 'Slovakien', USA: 'USA', Canada: 'Kanada', Japan: 'Japan', 'New Zealand': 'Nya Zeeland'
};
const countrySv = (c: string) => c.split(' / ').map((x) => COUNTRY_SV[x] ?? x).join(' / ');

export function ResortFinder() {
  const locale = useLocale();
  const lang = locale === 'sv' ? 'sv' : 'en';
  const t = T[lang];
  const num = (n: number) => n.toLocaleString(lang === 'sv' ? 'sv-SE' : 'en-GB');

  const [regions, setRegions] = useState<ResortRegion[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [minTop, setMinTop] = useState(0);
  const [sort, setSort] = useState<Sort>('top');

  const toggle = <V,>(list: V[], v: V) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const result = useMemo(() => {
    const r = RESORTS.filter(
      (x) =>
        (!regions.length || regions.includes(x.region)) &&
        features.every((f) => x[f]) &&
        (minTop === 0 || (x.top !== null && x.top >= minTop))
    );
    const val = (x: Resort) => (sort === 'top' ? x.top ?? -1 : x.pisteKm ?? -1);
    return [...r].sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : val(b) - val(a)));
  }, [regions, features, minTop, sort]);

  const chip = (active: boolean) =>
    clsx('rounded-full border px-3.5 py-1.5 text-sm transition', active ? 'border-white bg-white text-black' : 'border-white/20 text-white/75 hover:border-white/50');

  const filtered = regions.length > 0 || features.length > 0 || minTop > 0;

  return (
    <div>
      <div className="space-y-5 rounded-3xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
        <div>
          <p className="text-sm font-semibold text-white">{t.region}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={!regions.length} onClick={() => setRegions([])} className={chip(!regions.length)}>{t.all}</button>
            {REGIONS.map((r) => (
              <button key={r} type="button" aria-pressed={regions.includes(r)} onClick={() => setRegions(toggle(regions, r))} className={chip(regions.includes(r))}>
                {t.regions[r]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.want}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <button key={f} type="button" aria-pressed={features.includes(f)} onClick={() => setFeatures(toggle(features, f))} className={chip(features.includes(f))}>
                {t.features[f]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="text-sm font-semibold text-white">
            {t.minTop}
            <select value={minTop} onChange={(e) => setMinTop(Number(e.target.value))} className="ml-0 mt-2 block rounded-xl border border-white/20 bg-[#17181b] px-3 py-2 font-normal text-white">
              {HEIGHTS.map((h) => (
                <option key={h} value={h}>{h === 0 ? t.any : `${num(h)} m`}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-white">
            {t.sort}
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="mt-2 block rounded-xl border border-white/20 bg-[#17181b] px-3 py-2 font-normal text-white">
              {(['top', 'km', 'name'] as Sort[]).map((s) => (
                <option key={s} value={s}>{t.sorts[s]}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm text-white/70">{t.count(result.length)}</p>
        {filtered && (
          <button type="button" onClick={() => { setRegions([]); setFeatures([]); setMinTop(0); }} className="text-sm text-white underline decoration-white/40 underline-offset-4">
            {t.reset}
          </button>
        )}
      </div>

      {result.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/25 p-8 text-center text-white/70">{t.none}</p>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {result.map((x) => (
            <li key={x.name} className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-white/50">{lang === 'sv' ? countrySv(x.country) : x.country}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{x.name}</h3>
              <p className="mt-1 text-sm text-white/70">{x.knownFor[lang]}</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-white/50">{t.top}</dt>
                  <dd className="font-semibold text-white">{x.top ? `${num(x.top)} m` : t.unknown}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">{t.terrain}</dt>
                  <dd className="font-semibold text-white">{x.terrain}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">{t.lifts}</dt>
                  <dd className="font-semibold text-white">{x.lifts ?? t.unknown}</dd>
                </div>
              </dl>
              {x.season && (
                <p className="mt-3 text-sm text-white/70">
                  <span className="text-white/50">{t.season}:</span> {x.season[lang]}
                </p>
              )}
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {FEATURES.filter((f) => x[f]).map((f) => (
                  <li key={f} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/85">{t.features[f]}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-sm text-white/60">{t.note}</p>
      <Link href="/snowboard/articles/snowboard-resort-guide" className="mt-3 inline-block text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
        {t.guide} →
      </Link>
    </div>
  );
}
