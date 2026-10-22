'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import type { ElementEvent } from '@/lib/schema';
import { SECTION_CATEGORIES, type SectionId } from '@/lib/sections';
import { localizedCountryName } from '@/lib/events-shared';
import { useLiveNow } from '@/lib/useLiveNow';
import { EventItem } from './EventItem';

type When = 'upcoming' | 'past' | 'all';

/**
 * Hela kalendern för en sektion: välj kommande/tidigare/alla, filtrera
 * på kategori och sök på namn, stad eller land. Eventen grupperas per
 * månad. All data finns redan i sidan (statisk export), så filtreringen
 * sker direkt i webbläsaren utan laddtid.
 */
export function CalendarExplorer({ events, section, buildTime }: { events: ElementEvent[]; section: SectionId; buildTime: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const now = useLiveNow(buildTime);
  const [when, setWhen] = useState<When>('upcoming');
  const [cats, setCats] = useState<string[]>([]);
  const [q, setQ] = useState('');

  // Visa bara kategorier som faktiskt förekommer i sektionens event.
  const usedCats = useMemo(
    () => SECTION_CATEGORIES[section].filter((c) => events.some((e) => e.category.includes(c))),
    [events, section]
  );

  const filtered = useMemo(() => {
    const t0 = new Date(now).getTime();
    const needle = q.trim().toLowerCase();
    const list = events.filter((e) => {
      const ended = new Date(e.endDate).getTime() < t0;
      if (when === 'upcoming' && ended) return false;
      if (when === 'past' && !ended) return false;
      if (cats.length && !e.category.some((c) => cats.includes(c))) return false;
      if (needle) {
        const country = localizedCountryName(e.location.countryCode, locale, e.location.country);
        const hay = [e.name, e.series, e.location.city, e.location.venue, e.location.country, country]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    return when === 'past' ? [...list].reverse() : list;
  }, [events, now, when, cats, q, locale]);

  const groups = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const map = new Map<string, ElementEvent[]>();
    for (const e of filtered) {
      const key = fmt.format(new Date(e.startDate));
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return [...map.entries()];
  }, [filtered, locale]);

  const toggle = (c: string) => setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex self-start rounded-full border border-sec-line/20 p-1" role="group">
          {(['upcoming', 'past', 'all'] as const).map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={when === w}
              onClick={() => setWhen(w)}
              className="rounded-full px-4 py-1.5 text-sm text-sec-muted transition aria-pressed:bg-sec-ink aria-pressed:text-sec-bg"
            >
              {t(`calendar.${w}`)}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sec-muted" aria-hidden />
          <span className="sr-only">{t('calendar.search')}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('calendar.search')}
            className="w-full rounded-full border border-sec-line/20 bg-sec-card/60 py-2.5 pl-10 pr-4 text-sm text-sec-ink placeholder:text-sec-muted focus:border-sec-accent focus:outline-none"
          />
        </label>
      </div>

      {usedCats.length > 1 && (
        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {usedCats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cats.includes(c)}
              onClick={() => toggle(c)}
              className={clsx(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition',
                cats.includes(c)
                  ? 'border-sec-accent bg-sec-accent text-sec-accent-ink'
                  : 'border-sec-line/20 text-sec-muted hover:border-sec-line/50'
              )}
            >
              {t(`category.${c}`)}
            </button>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-sec-muted" aria-live="polite">
        {t('calendar.count', { count: filtered.length })}
      </p>

      {groups.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-sec-line/25 p-8 text-center text-sec-muted">
          {t('calendar.noResults')}
        </p>
      ) : (
        <div className="mt-2 space-y-10">
          {groups.map(([month, list]) => (
            <section key={month}>
              <h3 className="border-b border-sec-line/15 py-2 font-head text-xl capitalize text-sec-ink">
                {month}
              </h3>
              <ul className="mt-2 grid gap-3">
                {list.map((e) => (
                  <li key={e.slug}>
                    <EventItem event={e} section={section} now={now} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <p className="mt-10 text-xs text-sec-muted">{t('event.localTime')}</p>
    </div>
  );
}
