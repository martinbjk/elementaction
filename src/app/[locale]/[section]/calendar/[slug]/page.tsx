import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, ExternalLink, Ticket, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { SECTIONS, isSection, type SectionId } from '@/lib/sections';
import { getEvent, getEvents } from '@/lib/events';
import { googleMapsUrl, locationIsKnown, localizedCountryName } from '@/lib/events-shared';
import { formatDateRange, formatTime } from '@/lib/date';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import type { ElementEvent } from '@/lib/schema';
import { AddToCalendar } from '@/components/AddToCalendar';
import { ShareButton } from '@/components/ShareButton';

type Params = { params: { locale: string; section: string; slug: string } };


export function generateStaticParams({ params }: { params: { section?: string } }) {
  const sections = params.section ? [params.section].filter(isSection) : SECTIONS;
  return sections.flatMap((section) => getEvents(section).map((e) => ({ section, slug: e.slug })));
}

const pick = (e: ElementEvent, locale: string) => e.description[locale as 'sv' | 'en'] ?? e.description.en;

export async function generateMetadata({ params: { locale, section, slug } }: Params): Promise<Metadata> {
  if (!isSection(section)) return {};
  const event = getEvent(section, slug);
  if (!event) return {};
  const date = formatDateRange(event, locale);
  const country = localizedCountryName(event.location.countryCode, locale, event.location.country);
  const description = `${pick(event, locale)} ${event.location.city}, ${country}, ${date}.`;
  const url = `${SITE_URL}/${locale}/${section}/calendar/${slug}/`;
  return {
    title: `${event.name} (${date})`,
    description,
    alternates: localeAlternates(locale, `${section}/calendar/${slug}/`),
    openGraph: { title: event.name, description, url, type: 'article' }
  };
}

/**
 * Strukturerad data (schema.org) för Google.
 * Inget `offers`-block: vi har inga priser, och ett offers utan pris,
 * valuta och säljstart ger varningar i Search Console. Biljett- och
 * anmälningslänkarna finns kvar som knappar på sidan.
 */
function jsonLd(event: ElementEvent, section: SectionId, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': section === 'inspiration' ? 'Event' : 'SportsEvent',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus:
      event.statusOverride === 'cancelled'
        ? 'https://schema.org/EventCancelled'
        : event.statusOverride === 'postponed'
          ? 'https://schema.org/EventPostponed'
          : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: pick(event, locale),
    url: `${SITE_URL}/${locale}/${section}/calendar/${event.slug}/`,
    // Eventets egen delningsbild (opengraph-image.tsx) om ingen bild angetts.
    image: [event.image || `${SITE_URL}/${locale}/${section}/calendar/${event.slug}/opengraph-image`],
    location: {
      '@type': 'Place',
      name: event.location.venue || event.location.city,
      address: { '@type': 'PostalAddress', addressLocality: event.location.city, addressCountry: event.location.countryCode }
    },
    ...(event.organizer ? { organizer: { '@type': 'Organization', name: event.organizer, url: event.officialUrl ?? SITE_URL } } : {})
  };
}

function LinkButton({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 rounded-full border border-sec-line/30 px-5 py-2.5 text-sm font-semibold text-sec-ink transition hover:border-sec-accent">
      {icon}
      {children}
    </a>
  );
}

export default async function EventPage({ params: { locale, section, slug } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) notFound();
  const event = getEvent(section, slug);
  if (!event) notFound();
  const t = await getTranslations({ locale });
  const country = localizedCountryName(event.location.countryCode, locale, event.location.country);
  const place = [event.location.venue, event.location.city, country].filter(Boolean).join(', ');

  return (
    <article className="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(event, section, locale)) }} />
      <Link href={`/${section}/calendar`} className="text-sm text-sec-muted underline-offset-4 hover:text-sec-ink hover:underline">
        {t('event.backToCalendar')}
      </Link>
      {event.series && <p className="mt-6 text-sec-muted">{event.series}</p>}
      <h1 className="mt-2 font-head text-4xl leading-[1.05] text-sec-ink sm:text-5xl">{event.name}</h1>

      <dl className="mt-8 grid gap-4 rounded-2xl border border-sec-line/15 bg-sec-card/70 p-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-sec-muted">{formatDateRange(event, locale)}</dt>
          <dd className="mt-1 font-semibold">
            {formatTime(event.startDate, event.timezone, locale)}–{formatTime(event.endDate, event.timezone, locale)}{' '}
            <span className="font-normal text-sec-muted">({event.timezone.split('/').pop()?.replace(/_/g, ' ')})</span>
          </dd>
        </div>
        <div>
          <dt className="text-sm text-sec-muted">{t('event.venue')}</dt>
          <dd className="mt-1 font-semibold">
            {locationIsKnown(event) ? (
              <a href={googleMapsUrl(event)} target="_blank" rel="noreferrer noopener" className="inline-flex items-start gap-1.5 underline decoration-sec-accent underline-offset-4">
                <MapPin size={16} className="mt-0.5 shrink-0 text-sec-accent" aria-hidden />
                {place}
              </a>
            ) : (
              place
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {event.category.map((c) => (
          <span key={c} className="rounded-full border border-sec-line/25 px-3 py-1 text-sm text-sec-muted">
            {t(`category.${c}`)}
          </span>
        ))}
        <span className="rounded-full bg-sec-accent/15 px-3 py-1 text-sm text-sec-ink">{t(`level.${event.level}`)}</span>
      </div>

      <p className="mt-8 text-lg leading-relaxed text-sec-ink/90">{pick(event, locale)}</p>

      {event.disciplines && event.disciplines.length > 0 && (
        <p className="mt-6 text-sec-muted">
          {t('event.disciplines')}: <span className="text-sec-ink">{event.disciplines.join(', ')}</span>
        </p>
      )}
      {event.organizer && (
        <p className="mt-2 flex items-center gap-2 text-sec-muted">
          <Users size={16} aria-hidden />
          {t('event.organizer')}: <span className="text-sec-ink">{event.organizer}</span>
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <AddToCalendar event={event} />
        <ShareButton url={`${SITE_URL}/${locale}/${section}/calendar/${event.slug}/`} title={event.name} />
        {event.officialUrl && (
          <LinkButton href={event.officialUrl} icon={<ExternalLink size={15} aria-hidden />}>
            {t('event.officialSite')}
          </LinkButton>
        )}
        {event.registrationUrl && (
          <LinkButton href={event.registrationUrl} icon={<Users size={15} aria-hidden />}>
            {t('event.register')}
          </LinkButton>
        )}
        {event.ticketsUrl && (
          <LinkButton href={event.ticketsUrl} icon={<Ticket size={15} aria-hidden />}>
            {t('event.tickets')}
          </LinkButton>
        )}
      </div>

      {event.source?.url && (
        <p className="mt-10 text-sm text-sec-muted">
          {t('event.source')}:{' '}
          <a href={event.source.url} target="_blank" rel="noreferrer noopener" className="break-all underline">
            {event.source.url}
          </a>
        </p>
      )}
    </article>
  );
}
