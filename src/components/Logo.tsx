import type { SectionId } from '@/lib/sections';

/**
 * ELEMENTACTIONS MÄRKEN — helt grafiska, ingen text.
 *
 * Fyra sektionsmärken, ett per "action":
 *   Water action     blå ruta, en våg som bryter
 *   Concrete action  grå ruta, en quarterpipe i profil med coping
 *   Snow action      isvit ruta, en bergstopp med snötäcke
 *   Mind action      röd ruta, en spiral (tanken som vecklar ut sig)
 *
 * Huvudmärket är de fyra sektionsmärkena satta i ett 2×2-rutnät.
 * Fristående SVG-filer finns i public/brand/ (mark.svg, mark-water.svg …)
 * för profilbilder, favicon och tryck.
 */

type MarkProps = { size?: number; className?: string; title?: string };

const TILE = 22; // rutans storlek i huvudmärkets 48×48-rutnät

/** Symbolerna ritas i en 22×22-ruta så att de kan återanvändas i båda storlekarna. */
function Symbol({ section }: { section: SectionId }) {
  switch (section) {
    case 'surfing':
      return (
        <>
          <rect width={TILE} height={TILE} rx="4" fill="#1d6fe0" />
          {/* vågen: bred front som rullar över i en läpp */}
          <path
            d="M2 17c2.5 0 4.5-1.5 6-4.5C9.6 9.3 11.6 7 14.6 7c2.8 0 4.6 2 4.4 4.3-.2 1.9-1.8 3-3.3 2.5 1.2-.8 1.4-2.4.4-3.3-1.4-1.3-3.8-.6-5 1.9C9.6 15.8 8 18.8 5 20H2z"
            fill="#f5f8fb"
          />
        </>
      );
    case 'skateboard':
      return (
        <>
          <rect width={TILE} height={TILE} rx="4" fill="#8a8f94" />
          {/* quarterpipe: transition från flat upp till lodrät vägg */}
          <path d="M3 19v-3h5.2c4.3 0 6.8-2.5 6.8-6.8V4.5h3.5V19z" fill="#1c1d1f" />
          <circle cx="16.75" cy="4.5" r="1.75" fill="#f5f8fb" />
        </>
      );
    case 'snowboard':
      return (
        <>
          <rect width={TILE} height={TILE} rx="4" fill="#dce8f3" />
          <path d="M2.5 18.5 9 7l3.4 5 2.4-3.2 4.7 9.7z" fill="#0d2240" />
          {/* snötäcket på toppen */}
          <path d="M9 7 6.6 11.2l1.7-.7 1.1 1.2 1.2-1.4 1.4.5z" fill="#ffffff" />
          <path d="M14.8 8.8 13.6 10.4l.8-.2.5.6.6-.5.6.1z" fill="#ffffff" />
        </>
      );
    case 'inspiration':
      return (
        <>
          <rect width={TILE} height={TILE} rx="4" fill="#e0242f" />
          {/* spiral som vecklar ut sig från mitten */}
          <path
            d="M11 11.2c.9 0 1.3-.9.8-1.6-.7-.9-2.3-.6-2.7.6-.5 1.6.9 3.1 2.6 3 2.2-.1 3.4-2.4 2.7-4.4-.9-2.6-4-3.5-6.3-2.2-2.8 1.6-3.1 5.6-1 7.9 2.4 2.6 6.8 2.4 9.1-.3"
            fill="none"
            stroke="#f5f8fb"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </>
      );
  }
}

/** Ett sektionsmärke för sig (Water action, Concrete action …). */
export function SectionMark({ section, size = 32, className, title }: MarkProps & { section: SectionId }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${TILE} ${TILE}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Symbol section={section} />
    </svg>
  );
}

/** Huvudmärket: alla fyra i ett 2×2-rutnät. */
export function LogoMark({ size = 40, className, title = 'Elementaction' }: MarkProps) {
  const cells: [SectionId, number, number][] = [
    ['surfing', 0, 0],
    ['skateboard', 26, 0],
    ['snowboard', 0, 26],
    ['inspiration', 26, 26]
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} role="img" aria-label={title}>
      {cells.map(([s, x, y]) => (
        <g key={s} transform={`translate(${x} ${y})`}>
          <Symbol section={s} />
        </g>
      ))}
    </svg>
  );
}

/** Används i sidhuvud och sidfot. Bara märket — namnet finns i aria-label och sidtiteln. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return <LogoMark size={size} className={className} />;
}
