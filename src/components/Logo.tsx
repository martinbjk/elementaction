import type { SectionId } from '@/lib/sections';
import { ACTION_ARC_BADGE, ACTION_ARC_RING } from './brand-paths';

/**
 * ELEMENTACTIONS MÄRKEN — ritade efter Martins egna utkast.
 *
 * Huvudmärket: en cirkel delad i fyra färgfält (vatten blått, betong
 * grått, snö isvitt, mind rött) med en smal glipa emellan, och ordet
 * ACTION längs övre bågen. Ingen ytterring. Ordet "Element" står aldrig
 * i märket.
 *
 * Sektionsmärkena: en rund bricka i sektionens färg, ACTION överst och
 * ett motiv i mitten:
 *   Water action     surfare i en brytande våg
 *   Concrete action  skejtare på väg upp i en quarterpipe
 *   Snow action      snowboardåkare som carvar under en bergstopp
 *   Mind action      huvud i profil med en spiral (tanken)
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

/** Detaljerade motiv i en 100×100-bricka, under ACTION-bågen. */
function Motif({ section }: { section: SectionId }) {
  const { ink, bg } = BADGE[section];
  const limb = { fill: 'none', stroke: ink, strokeWidth: 4.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (section) {
    case 'surfing':
      return (
        <>
          {/* vågen: en bred skärva som reser sig och rullar över */}
          <path
            d="M18 88C12 66 22 42 46 34c18-6 36 2 42 18-9-7-21-9-30-4-14 7-20 22-17 40z"
            fill={ink}
          />
          {/* surfaren i tuben */}
          <ellipse cx="63" cy="80" rx="17" ry="3.2" transform="rotate(-18 63 80)" fill={ink} />
          <circle cx="66" cy="52" r="4.2" fill={ink} />
          <path d="M64 58l-5 9" {...limb} />
          <path d="M59 67l7 3 1 7M59 67l-7 4 3 6" {...limb} />
          <path d="M63 60l-11-1M64 60l9 6" {...limb} />
        </>
      );
    case 'skateboard':
      return (
        <>
          {/* quarterpipe: flat, transition, lodrät vägg och coping */}
          <path d="M12 88V80h32c17 0 30-13 30-30V38h12v50z" fill={ink} />
          <circle cx="80" cy="38" r="4.8" fill={bg} stroke={ink} strokeWidth="3" />
          {/* skejtaren på väg upp i transitionen: brädan längs ytan, kroppen lutad in mot rampen */}
          <path d="M56 76.5l13-13" stroke="#1c1d1f" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx="58.6" cy="76.4" r="2" fill="#1c1d1f" />
          <circle cx="68.6" cy="66.4" r="2" fill="#1c1d1f" />
          <circle cx="45" cy="50" r="4.4" fill={ink} />
          <path d="M49 55l6 6" {...limb} />
          <path d="M55 61l-2 7 6 4M55 61l6-1 4 3" {...limb} />
          <path d="M51 57l-9 7M51 57l9-6" {...limb} />
        </>
      );
    case 'snowboard':
      return (
        <>
          <defs>
            <clipPath id="ea-snow-clip">
              <circle cx="50" cy="50" r="49" />
            </clipPath>
          </defs>
          {/* bergskedjan med snötäcke, fyller brickans nedre del */}
          <g clipPath="url(#ea-snow-clip)">
            <path d="M0 82 30 42l10 12 14-20 46 52v20H0z" fill={ink} />
          </g>
          <path d="M30 42l-7.5 10 4.4-1.6 3.3 3.2 3.4-3.8zM54 34l-8.6 12.3 4.8-1.8 3.6 3.2 3.8-4 4 1.4z" fill={bg} />
          {/* åkaren i vitt mot bergssidan, carvar åt vänster */}
          <ellipse cx="56" cy="85" rx="15" ry="3" transform="rotate(-12 56 85)" fill={bg} />
          <circle cx="58" cy="62" r="4" fill={bg} />
          <path d="M57 67l-3 8" stroke={bg} strokeWidth="4.6" strokeLinecap="round" fill="none" />
          <path d="M54 75l7 3 0 5M54 75l-6 4 0 4" stroke={bg} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M56 69l-10-3M57 69l10 2" stroke={bg} strokeWidth="4.6" strokeLinecap="round" fill="none" />
        </>
      );
    case 'inspiration':
      return (
        <>
          {/* huvud i profil som tittar åt höger, med nacke */}
          <path
            d="M34 92c1-9-4-14-6-22-3-12 0-26 11-34 10-7 26-8 36 0 7 6 9 14 8 21l5 8c1 2 0 3-2 3h-3v6c0 4-3 6-7 6h-6l-2 12z"
            fill={ink}
          />
          {/* spiralen: tanken som vecklar ut sig */}
          <path
            d="M57 54c1.6 0 2.4-1.6 1.4-2.9-1.3-1.7-4.2-1.1-4.9 1-.9 2.9 1.6 5.6 4.7 5.4 4-.2 6.2-4.3 4.9-8-1.6-4.7-7.3-6.4-11.4-4-5.1 2.9-5.6 10.2-1.8 14.3 4.4 4.7 12.3 4.3 16.5-.6"
            fill="none"
            stroke={bg}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </>
      );
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
      <circle cx="50" cy="50" r="49" fill={bg} />
      {full ? (
        <>
          <path d={ACTION_ARC_BADGE} fill={text} />
          <Motif section={section} />
        </>
      ) : (
        <SimpleMotif section={section} />
      )}
    </svg>
  );
}

const R = 33.5; // färgcirkelns radie
const GAP = 1.6; // halva glipan mellan fälten
const E = Math.sqrt(R * R - GAP * GAP); // där glipans kant möter cirkeln
const f = (n: number) => n.toFixed(2);

/** Ett kvartsfält med glipa. sx/sy = riktning (−1 vänster/upp, +1 höger/ned). */
function quadrant(sx: number, sy: number) {
  const x0 = 50 + sx * GAP;
  const y0 = 50 + sy * GAP;
  const sweep = sx * sy < 0 ? 1 : 0;
  return `M${f(x0)} ${f(y0)}V${f(50 + sy * E)}A${R} ${R} 0 0 ${sweep} ${f(50 + sx * E)} ${f(y0)}z`;
}

const QUADRANTS: [string, string][] = [
  ['#1d6fe0', quadrant(-1, -1)], // uppe vänster: vatten
  ['#8a8f94', quadrant(1, -1)], // uppe höger: betong
  ['#dce8f3', quadrant(-1, 1)], // nere vänster: snö
  ['#e0242f', quadrant(1, 1)] // nere höger: mind
];

/**
 * Huvudmärket. `text` är färgen på ACTION — vit på mörk bakgrund (standard),
 * mörk på ljus. Glipan mellan fälten är genomskinlig, så bakgrunden syns.
 */
export function LogoMark({ size = 40, className, title = 'Elementaction', text = WHITE }: MarkProps & { text?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      {QUADRANTS.map(([fill, d]) => (
        <path key={fill} d={d} fill={fill} />
      ))}
      <path d={ACTION_ARC_RING} fill={text} />
    </svg>
  );
}

/** Används i sidhuvud och sidfot. Bara märket — namnet finns i aria-label och sidtiteln. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return <LogoMark size={size} className={className} />;
}
