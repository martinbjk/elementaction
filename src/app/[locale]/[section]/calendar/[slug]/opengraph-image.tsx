import { ImageResponse } from 'next/og';
import { locales } from '@/i18n/config';
import { SECTIONS, isSection, type SectionId } from '@/lib/sections';
import { getEvent, getEvents } from '@/lib/events';
import { formatDateRange } from '@/lib/date';
import { localizedCountryName } from '@/lib/events-shared';
import { LogoMark } from '@/components/Logo';

/**
 * DELNINGSBILD PER EVENT — genereras vid bygget (statisk export), en per
 * event och språk. Filen heter "opengraph-image", så Next.js kopplar in den
 * som og:image automatiskt. twitter-image.tsx återanvänder den.
 *
 * Inga externa typsnitt laddas (det skulle kräva nätverk under bygget);
 * satori använder sitt inbyggda typsnitt. lucide-ikoner fungerar inte i
 * satori, därför egna små SVG-ikoner nedan.
 */

export const alt = 'Elementaction';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACCENT: Record<SectionId, string> = {
  surfing: '#4a90f0',
  skateboard: '#a3a8ad',
  snowboard: '#dce8f3',
  inspiration: '#ef3b45'
};
const LABEL: Record<SectionId, string> = {
  surfing: 'Water action',
  skateboard: 'Concrete action',
  snowboard: 'Snow action',
  inspiration: 'Mind action'
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SECTIONS.flatMap((section) => getEvents(section).map((e) => ({ locale, section, slug: e.slug })))
  );
}

function Pin({ color }: { color: string }) {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}

function Cal({ color }: { color: string }) {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <rect x={3} y={4} width={18} height={18} rx={2} />
      <line x1={16} y1={2} x2={16} y2={6} />
      <line x1={8} y1={2} x2={8} y2={6} />
      <line x1={3} y1={10} x2={21} y2={10} />
    </svg>
  );
}

export default function Image({ params }: { params: { locale: string; section: string; slug: string } }) {
  const { locale, section, slug } = params;
  const s: SectionId = isSection(section) ? section : 'skateboard';
  const event = getEvent(s, slug);
  const date = event ? formatDateRange(event, locale) : '';
  const country = event ? localizedCountryName(event.location.countryCode, locale, event.location.country) : '';
  const place = event ? [event.location.city, country].filter(Boolean).join(', ') : '';
  const accent = ACCENT[s];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          backgroundColor: '#0e0f11',
          fontFamily: 'sans-serif'
        }}
      >
        {/* sektionens färg som en bred list i vänsterkanten */}
        <div style={{ display: 'flex', position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, backgroundColor: accent }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: accent }}>{LABEL[s]}</div>
          <LogoMark size={120} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, lineHeight: 1.06, maxWidth: 1060, color: '#f4f5f6' }}>
            {event?.name ?? 'Elementaction'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            {date && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Cal color={accent} />
                <div style={{ display: 'flex', fontSize: 30, color: '#c9cdd2' }}>{date}</div>
              </div>
            )}
            {place && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Pin color={accent} />
                <div style={{ display: 'flex', fontSize: 30, color: '#c9cdd2' }}>{place}</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#8a9099' }}>elementaction.com</div>
      </div>
    ),
    { ...size }
  );
}
