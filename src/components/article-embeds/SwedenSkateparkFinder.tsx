'use client';

import { useMemo, useState } from 'react';
import { Search, MapPin, Lightbulb, LightbulbOff, Ruler, Calendar, Hammer, X, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import type { SwedenRegion, SwedenSkatepark } from '@/lib/article-embeds/skateparks/sweden-types';

/**
 * Sök- och filtrerbar lista över svenska betongparker (artikeln
 * skateparks-sweden-travel-guide). Engelsk UI-text, som SkateparkFinder.
 */

const REGIONS: SwedenRegion[] = [
  'Skåne & Blekinge',
  'West Sweden',
  'Småland & Öland',
  'Stockholm, Mälardalen & East',
  'Dalarna & Gävleborg',
  'Norrland'
];

const FEATURES: { key: string; label: string }[] = [
  { key: 'bowl', label: 'Bowl' },
  { key: 'street', label: 'Street' },
  { key: 'flow', label: 'Flow' },
  { key: 'plaza', label: 'Plaza' },
  { key: 'pool', label: 'Pool coping' },
  { key: 'lit', label: 'Lit at night' }
];

function mapsHref(p: SwedenSkatepark): string {
  const q = p.address ?? `${p.name}, ${p.town}, Sweden`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

const chip = (active: boolean) =>
  clsx(
    'flex items-center gap-1.5 rounded-stamp border px-3 py-1.5 font-mono-tight text-xs font-semibold uppercase tracking-wide transition',
    active
      ? 'border-spray bg-spray/10 text-spray shadow-sm'
      : 'border-asphalt-700/25 text-chalk-500 hover:border-spray/50 hover:text-spray dark:border-chalk-500/20'
  );

export function SwedenSkateparkFinder({ parks }: { parks: SwedenSkatepark[] }) {
  const [query, setQuery] = useState('');
  const [regions, setRegions] = useState<SwedenRegion[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const detailedCount = parks.filter((p) => p.detailed).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return parks.filter((p) => {
      if (regions.length && !regions.includes(p.region)) return false;
      if (features.length) {
        if (!p.detailed) return false;
        for (const f of features) {
          if (f === 'lit' ? p.lit !== true : !p.tags.includes(f)) return false;
        }
      }
      if (!q) return true;
      return [p.name, p.town, p.region, p.address, p.features, p.builder, p.note]
        .filter(Boolean)
        .some((s) => (s as string).toLowerCase().includes(q));
    });
  }, [parks, query, regions, features]);

  const grouped = useMemo(
    () =>
      REGIONS.map((region) => ({
        region,
        detailed: filtered.filter((p) => p.region === region && p.detailed),
        pending: filtered.filter((p) => p.region === region && !p.detailed)
      })).filter((g) => g.detailed.length + g.pending.length > 0),
    [filtered]
  );

  const toggle = <T,>(list: T[], set: (v: T[]) => void, v: T) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const hasFilters = query.trim() !== '' || regions.length > 0 || features.length > 0;

  return (
    <section className="mt-10" aria-label="Swedish skatepark finder">
      <h2 className="font-display text-2xl tracking-tight text-spray">Find a park in Sweden</h2>
      <p className="mt-2 text-sm leading-relaxed text-asphalt-800/90 dark:text-chalk-300/90">
        {detailedCount} concrete parks with full details, plus {parks.length - detailedCount} more
        towns listed by Skateparksguiden. Search by park, town, feature or builder, and filter by
        region or terrain.
      </p>

      <div className="relative mt-5">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-chalk-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search parks, towns, features (e.g. hubba, pool, Pivotech)…"
          aria-label="Search Swedish skateparks"
          className="w-full rounded-stamp border border-asphalt-700/30 bg-white/70 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-chalk-500 focus:border-spray dark:border-chalk-500/20 dark:bg-asphalt-900/70"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {REGIONS.map((r) => (
          <button key={r} type="button" aria-pressed={regions.includes(r)} onClick={() => toggle(regions, setRegions, r)} className={chip(regions.includes(r))}>
            {r}
            <span className="opacity-70">{parks.filter((p) => p.region === r).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {FEATURES.map((f) => (
          <button key={f.key} type="button" aria-pressed={features.includes(f.key)} onClick={() => toggle(features, setFeatures, f.key)} className={chip(features.includes(f.key))}>
            {f.label}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setRegions([]);
              setFeatures([]);
            }}
            className="flex items-center gap-1 rounded-stamp px-2.5 py-1.5 font-mono-tight text-xs text-spray hover:underline"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      <p className="mt-3 font-mono-tight text-[11px] uppercase tracking-wide text-chalk-500">
        {filtered.length === parks.length ? `${parks.length} entries` : `${filtered.length} of ${parks.length} entries`}
      </p>

      {grouped.length === 0 ? (
        <p className="mt-6 rounded-stamp border border-asphalt-700/20 px-4 py-6 text-center text-sm text-chalk-500 dark:border-chalk-500/15">
          No parks match your search. Try a different term or clear a filter.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {grouped.map(({ region, detailed, pending }) => (
            <div key={region}>
              <h3 className="font-mono-tight text-xs uppercase tracking-wide text-chalk-500">
                {region} · {detailed.length + pending.length}
              </h3>
              <ul className="mt-3 space-y-4">
                {detailed.map((p) => (
                  <li key={p.id} className="rounded-stamp border border-asphalt-700/20 bg-white/50 p-4 dark:border-chalk-500/15 dark:bg-asphalt-900/40">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <h4 className="font-display text-lg leading-tight tracking-tight text-asphalt-900 dark:text-chalk-100">{p.name}</h4>
                      <span className="font-mono-tight text-[11px] uppercase tracking-wide text-chalk-500">{p.town}</span>
                    </div>
                    {p.features && <p className="mt-2 text-sm leading-relaxed text-asphalt-800/90 dark:text-chalk-300/90">{p.features}</p>}
                    {p.note && <p className="mt-1.5 text-sm italic leading-relaxed text-asphalt-800/80 dark:text-chalk-300/80">{p.note}</p>}
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono-tight text-[11px] uppercase tracking-wide text-chalk-500">
                      {p.built && (<span className="flex items-center gap-1"><Calendar size={12} />Built {p.built}</span>)}
                      {p.sizeM2 && (<span className="flex items-center gap-1"><Ruler size={12} />{p.sizeM2.toLocaleString('en-GB')} m²</span>)}
                      {p.lit === true && (<span className="flex items-center gap-1 text-spray"><Lightbulb size={12} />Lit</span>)}
                      {p.lit === false && (<span className="flex items-center gap-1"><LightbulbOff size={12} />No lights</span>)}
                      {p.builder && (<span className="flex items-center gap-1"><Hammer size={12} />{p.builder}</span>)}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <a href={mapsHref(p)} target="_blank" rel="noreferrer noopener" className="flex items-start gap-1.5 text-spray underline decoration-spray/40 underline-offset-2 hover:decoration-spray">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        {p.address ?? 'Open in maps'}
                      </a>
                      <a href={p.source} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1 text-xs text-chalk-500 hover:text-spray">
                        <ExternalLink size={12} />
                        Skateparksguiden
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              {pending.length > 0 && (
                <div className="mt-4 rounded-stamp border border-dashed border-asphalt-700/25 p-3 dark:border-chalk-500/20">
                  <p className="font-mono-tight text-[11px] uppercase tracking-wide text-chalk-500">More towns · details coming</p>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
                    {pending.map((p) => (
                      <li key={p.id}>
                        <a href={p.source} target="_blank" rel="noreferrer noopener" title={p.features ?? undefined} className="text-spray underline decoration-spray/40 underline-offset-2 hover:decoration-spray">
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
