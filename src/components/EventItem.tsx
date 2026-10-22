'use client';

import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import type { ElementEvent } from '@/lib/schema';
import type { SectionId } from '@/lib/sections';
import { getCountdown, getEventStatus, localizedCountryName } from '@/lib/events-shared';
import { formatDateRange } from '@/lib/date';

/**
 * En rad i kalendern. Datumblocket till vänster ritas i sektionens
 * rubrikfont, så en skatekalender ser ut som betongstencil och en
 * surfkalender som mjuk serif — samma komponent, olika värld.
 * `now` kommer från useLiveNow (byggtid först, sedan riktig tid) så att
 * statusen alltid stämmer utan hydreringsflimmer.
 */
export function EventItem({ event, section, now }: { event: ElementEvent; section: SectionId; now: string }) {
  const locale = useLocale();
  const t = useTranslations();
  const nowDate = new Date(now);
  const status = getEventStatus(event, nowDate);
  const countdown = status === 'upcoming' ? getCountdown(event, nowDate) : null;

  const start = new Date(event.startDate);
  const day = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: event.timezone }).format(start);
  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: event.timezone }).format(start);
  const country = localizedCountryName(event.location.countryCode, locale, event.location.country);

  let statusText: string | null = null;
  if (status === 'live') statusText = t('status.liveNow');
  else if (status === 'cancelled' || status === 'postponed') statusText = t(`status.${status}`);
  else if (countdown?.unit === 'tomorrow') statusText = t('status.tomorrow');
  else if (countdown?.unit === 'hours') statusText = t('status.inHours', { hours: countdown.value });
  else if (countdown?.unit === 'days' && countdown.value <= 60) statusText = t('status.inDays', { days: countdown.value });

  return (
    <Link
      href={`/${section}/calendar/${event.slug}`}
      className={clsx(
        'group grid grid-cols-[4.25rem_1fr] items-center gap-4 rounded-xl border border-sec-line/15 bg-sec-card/70 p-3 pr-4 transition hover:border-sec-accent/70 sm:grid-cols-[4.75rem_1fr_auto]',
        status === 'finished' && 'opacity-60 saturate-0 hover:opacity-100'
      )}
    >
      <span className="flex aspect-square flex-col items-center justify-center rounded-lg bg-sec-ink text-sec-bg">
        <span className="font-head text-[1.7rem] leading-none">{day}</span>
        <span className="mt-1 text-xs">{month}</span>
      </span>

      <span className="min-w-0">
        <span className="block font-head text-lg leading-tight text-sec-ink group-hover:underline group-hover:decoration-sec-accent group-hover:underline-offset-4">
          {event.name}
        </span>
        <span className="mt-1 block truncate text-sm text-sec-muted">
          {formatDateRange(event, locale)} — {event.location.city}, {country}
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {event.category.map((c) => (
            <span key={c} className="rounded-full border border-sec-line/20 px-2 py-0.5 text-xs text-sec-muted">
              {t(`category.${c}`)}
            </span>
          ))}
        </span>
      </span>

      {statusText && (
        <span
          className={clsx(
            'col-start-2 justify-self-start rounded-full px-3 py-1 text-xs font-semibold sm:col-start-3 sm:justify-self-end',
            status === 'live' ? 'bg-live text-white' : 'bg-sec-accent text-sec-accent-ink'
          )}
        >
          {status === 'live' && <span className="mr-1.5 inline-block h-2 w-2 animate-pulse-live rounded-full bg-white" />}
          {statusText}
        </span>
      )}
    </Link>
  );
}
