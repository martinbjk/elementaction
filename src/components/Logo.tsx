import type { SectionId } from '@/lib/sections';
import { ACTION_ARC_BADGE, ACTION_ARC_RING_LEFT, ACTION_ARC_RING_RIGHT } from './brand-paths';
import { MIND_HEAD, WATER_RIDER, WATER_WAVE } from './brand-traced';

/**
 * ELEMENTACTIONS MÄRKEN — ritade efter Martins egna utkast.
 *
 * Huvudmärket (efter Martins utkast): en cirkel delad i fyra lika stora
 * färgfält med rundade hörn (vatten blått, betong grått, snö isvitt, mind
 * rött) och ordet ACTION i bågen ovanför — ACT blått, ION grått.
 * Ordet "Element" står aldrig i märket.
 *
 * Sektionsmärkena: en rund bricka i sektionens färg, ACTION överst och
 * ett motiv i mitten. Water och Mind är spårade från Martins utkast; samma
 * åkarfigur används i Concrete och Snow så att alla fyra hänger ihop:
 *   Water action     surfare i en brytande våg (Martins utkast)
 *   Concrete action  åkaren på väg upp i en quarterpipe
 *   Snow action      åkaren mot en bergssida med snötoppar
 *   Mind action      huvud i profil med en spiral (Martins utkast)
 *
 * I små storlekar (menyn, mobilens bottenrad) går detaljerna inte att
 * se, så där används en förenklad variant: samma bricka utan text, med
 * bara den enkla symbolen (våg, ramp, bergstopp, spiral).
 *
 * ACTION-texten är färdiga banor (brand-paths.ts, genererad av
 * scripts/staging/action_arc.py). Fristående SVG-filer: public/brand/.
 */

type MarkProps = { size?: number; className?: string; title?: string };

const WHITE = '#f5f8fb';

export const BADGE: Record<SectionId, { bg: string; ink: string; text: string }> = {
  surfing: { bg: '#1d6fe0', ink: WHITE, text: WHITE },
  skateboard: { bg: '#8a8f94', ink: WHITE, text: WHITE },
  snowboard: { bg: '#dce8f3', ink: '#0d2240', text: '#0d2240' },
  inspiration: { bg: '#e0242f', ink: WHITE, text: WHITE }
};

/**
 * Detaljerade motiv i en 100×100-bricka, under ACTION-bågen.
 * Vågen, surfaren och huvudet är spårade direkt från Martins utkast
 * (brand-traced.ts). Samma åkarfigur används i Concrete och Snow så att
 * alla fyra märken har samma teckning.
 */
const BELOW_TEXT = 'translate(50 57) scale(0.8) translate(-50 -50)';

function Motif({ section }: { section: SectionId }) {
  const { ink, bg } = BADGE[section];
  switch (section) {
    case 'surfing':
      return (
        <g transform={BELOW_TEXT}>
          <path d={WATER_WAVE} fill={ink} fillRule="evenodd" />
          <path d={WATER_RIDER} fill={ink} fillRule="evenodd" />
        </g>
      );
    case 'skateboard':
      return (
        <>
          {/* quarterpipe: flat, transition, lodrät vägg och coping */}
          <path d="M10 92V82h28c20 0 34-14 34-34V42h14v50z" fill={ink} />
          <circle cx="79" cy="42" r="5.2" fill={bg} stroke={ink} strokeWidth="3.4" />
          {/* åkaren på väg upp i transitionen, lutad mot rampen */}
          <g transform="translate(50 57) rotate(-30) scale(0.66) translate(-63 -66)">
            <path d={WATER_RIDER} fill={ink} fillRule="evenodd" />
          </g>
        </>
      );
    case 'snowboard':
      return (
        <>
          {/* bergskedjan med snötäcke */}
          <path d="M-2 78 28 38l11 13 15-21 48 50v28H-2z" fill={ink} />
          <path d="M28 38l-8 10.4 4.6-1.6 3.4 3.4 3.6-4zM54 30l-9.2 12.8 5-1.8 3.8 3.4 4-4.2 4.2 1.4z" fill={bg} />
          {/* åkaren i ljust mot bergssidan */}
          <g transform="translate(53 72) rotate(-8) scale(0.56) translate(-60 -62)">
            <path d={WATER_RIDER} fill={bg} fillRule="evenodd" />
          </g>
        </>
      );
    case 'inspiration':
      return <path d={MIND_HEAD} fill={ink} fillRule="evenodd" />;
  }
}

/** Förenklade symboler för små storlekar (ingen text, få detaljer). */
function SimpleMotif({ section }: { section: SectionId }) {
  const { ink, bg } = BADGE[section];
  switch (section) {
    case 'surfing':
      return <path d="M14 70c10 0 18-6 24-18 7-14 15-22 28-22 12 0 20 9 19 19-1 8-8 13-15 11 5-4 6-11 2-15-6-6-17-3-22 8-6 13-13 23-26 27H14z" fill={ink} />;
    case 'skateboard':
      return (
        <>
          <path d="M18 76V64h22c13 0 20-7 20-20V24h14v52z" fill={ink} />
          <circle cx="67" cy="24" r="6.5" fill={bg} stroke={ink} strokeWidth="4" />
        </>
      );
    case 'snowboard':
      return (
        <>
          <path d="M12 76 40 28l14 20 10-13 24 41z" fill={ink} />
          <path d="M40 28l-10 17 6-2 4 4 5-5 5 2z" fill={bg} />
        </>
      );
    case 'inspiration':
      return (
        <path
          d="M50 52c2.4 0 3.6-2.4 2.1-4.4-2-2.6-6.3-1.7-7.4 1.5-1.4 4.4 2.4 8.5 7.1 8.2 6-.3 9.3-6.5 7.4-12.1-2.4-7.1-11-9.7-17.3-6.1-7.7 4.4-8.5 15.4-2.7 21.7 6.6 7.1 18.6 6.5 25-.9"
          fill="none"
          stroke={ink}
          strokeWidth="6.4"
          strokeLinecap="round"
        />
      );
  }
}

/**
 * Sektionsmärket. Under 44 px ritas den förenklade varianten (utan text),
 * annars hela märket med ACTION och motiv. `detail` tvingar fram ett läge.
 */
export function SectionMark({ section, size = 32, className, title, detail }: MarkProps & { section: SectionId; detail?: boolean }) {
  const full = detail ?? size >= 44;
  const { bg, text } = BADGE[section];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <clipPath id={`ea-badge-${section}`}>
          <circle cx="50" cy="50" r="49" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="49" fill={bg} />
      {full ? (
        <>
          <path d={ACTION_ARC_BADGE} fill={text} />
          <g clipPath={`url(#ea-badge-${section})`}>
            <Motif section={section} />
          </g>
        </>
      ) : (
        <SimpleMotif section={section} />
      )}
    </svg>
  );
}

// Efter Martins utkast: fyra lika stora fält med rundade hörn och en glipa
// emellan. Rundningen görs genom att rita ett något mindre fält med en
// kantlinje i samma färg och rundade hörn (strokeLinejoin round).
const R = 35; // fältens ytterradie
const GAP = 1.9; // halva glipan mellan fälten
const RC = 2.6; // hörnens rundning
const f = (n: number) => n.toFixed(2);

/** Ett kvartsfält (insatt med RC). sx/sy = riktning (−1 vänster/upp, +1 höger/ned). */
function quadrant(sx: number, sy: number) {
  const g = GAP + RC;
  const r = R - RC;
  const E = Math.sqrt(r * r - g * g);
  const x0 = 50 + sx * g;
  const y0 = 50 + sy * g;
  const sweep = sx * sy < 0 ? 1 : 0;
  return `M${f(x0)} ${f(y0)}V${f(50 + sy * E)}A${r} ${r} 0 0 ${sweep} ${f(50 + sx * E)} ${f(y0)}z`;
}

const BLUE = '#1d6fe0';
const GREY = '#8a8f94';
const QUADRANTS: [string, string][] = [
  [BLUE, quadrant(-1, -1)], // uppe vänster: vatten
  [GREY, quadrant(1, -1)], // uppe höger: betong
  ['#dce8f3', quadrant(-1, 1)], // nere vänster: snö
  ['#e0242f', quadrant(1, 1)] // nere höger: mind
];

/**
 * Huvudmärket: fyra lika fält och ACTION i bågen ovanför — ACT i blått
 * över det blå fältet, ION i grått över det grå. Fungerar på både mörk
 * och ljus bakgrund; glipan är genomskinlig.
 */
export function LogoMark({ size = 40, className, title = 'Elementaction' }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      {QUADRANTS.map(([fill, d]) => (
        <path key={fill} d={d} fill={fill} stroke={fill} strokeWidth={RC * 2} strokeLinejoin="round" />
      ))}
      {/* kantlinjen i samma färg gör Audiowide lika fet som i utkastet */}
      <path d={ACTION_ARC_RING_LEFT} fill={BLUE} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d={ACTION_ARC_RING_RIGHT} fill={GREY} stroke={GREY} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/** Används i sidhuvud och sidfot. Bara märket — namnet finns i aria-label och sidtiteln. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return <LogoMark size={size} className={className} />;
}
