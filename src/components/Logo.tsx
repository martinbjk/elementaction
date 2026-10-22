import type { SectionId } from '@/lib/sections';

import { ACTION_ARC_PATH } from './brand-paths';

/**
 * ELEMENTACTIONS MÄRKEN
 *
 * Huvudmärket är en rund bricka: en mörk ring med ordet ACTION längs
 * övre bågen, och en inre cirkel delad i fyra fält i sektionernas färger
 * (vatten blått, betong grått, snö isvitt, mind rött) med en smal glipa
 * emellan. Ordet "Element" står aldrig i märket.
 *
 * Fyra sektionsmärken, ett per "action":
 *   Water action     blå ruta, en våg som bryter
 *   Concrete action  grå ruta, en quarterpipe i profil med coping
 *   Snow action      isvit ruta, en bergstopp med snötäcke
 *   Mind action      röd ruta, en sinuskurva
 *
 * ACTION-texten är färdiga banor (brand-paths.ts), så märket ser likadant
 * ut överallt utan att typsnittet behöver laddas. Fristående SVG-filer
 * finns i public/brand/ (mark.svg, mark-water.svg …).
 */

type MarkProps = { size?: number; className?: string; title?: string };

const TILE = 22; // sektionsmärkets ruta (viewBox 22×22)

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
          {/* sinuskurva: en och en halv period över rutan */}
          <path
            d="M3 11C4.9 4.6 6.4 4.6 8.33 11S11.7 17.4 13.67 11 17.1 4.6 19 11"
            fill="none"
            stroke="#f5f8fb"
            strokeWidth="2.2"
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

const QUADRANTS: [string, string][] = [
  ['#1d6fe0', 'M50 50V15A35 35 0 0 0 15 50z'], // uppe vänster: vatten
  ['#8a8f94', 'M50 50V15A35 35 0 0 1 85 50z'], // uppe höger: betong
  ['#dce8f3', 'M50 50H15A35 35 0 0 0 50 85z'], // nere vänster: snö
  ['#e0242f', 'M50 50H85A35 35 0 0 1 50 85z'] // nere höger: mind
];

/** Huvudmärket: ring med ACTION överst, fyra färgfält i mitten. */
export function LogoMark({ size = 40, className, title = 'Elementaction' }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      <circle cx="50" cy="50" r="49.5" fill="#16181b" />
      <circle cx="50" cy="50" r="48.6" fill="none" stroke="#4a4e53" strokeWidth=".9" />
      <circle cx="50" cy="50" r="36.6" fill="none" stroke="#4a4e53" strokeWidth=".6" />
      <path d={ACTION_ARC_PATH} fill="#f5f8fb" />
      {/* små markeringar där bågtexten slutar */}
      <circle cx="10.6" cy="58.5" r="1.6" fill="#5c6166" />
      <circle cx="89.4" cy="58.5" r="1.6" fill="#5c6166" />
      {QUADRANTS.map(([fill, d]) => (
        <path key={fill} d={d} fill={fill} />
      ))}
      {/* glipan mellan fälten */}
      <rect x="48.6" y="14" width="2.8" height="72" fill="#16181b" />
      <rect x="14" y="48.6" width="72" height="2.8" fill="#16181b" />
    </svg>
  );
}

/** Används i sidhuvud och sidfot. Bara märket — namnet finns i aria-label och sidtiteln. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return <LogoMark size={size} className={className} />;
}
