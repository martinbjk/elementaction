'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * STORLEKSKALKYLATOR FÖR SNOWBOARD
 *
 * Exakt samma regler som i artikeln "snowboard-types-how-to-choose":
 *  - Längd efter vikt: REI:s tabell (vikt i lb, omräknad till kg).
 *  - Stil: park/freestyle 2–4 cm kortare, puder/freeride 2–4 cm längre (K2).
 *  - Längd efter kroppslängd: längd minus cirka 20 cm (Salomon), som kontroll.
 *  - Midjebredd efter skostorlek: REI och K2. Över EU 44 (US 10,5): överväg
 *    mid-wide eller wide (Salomon).
 * Ändras artikeln ska tabellerna här ändras också.
 */
const LENGTH_ROWS = [
  { kgMin: 50, kgMax: 54, cmMin: 128, cmMax: 136 },
  { kgMin: 52, kgMax: 59, cmMin: 133, cmMax: 141 },
  { kgMin: 57, kgMax: 61, cmMin: 139, cmMax: 147 },
  { kgMin: 61, kgMax: 66, cmMin: 144, cmMax: 152 },
  { kgMin: 64, kgMax: 70, cmMin: 149, cmMax: 157 },
  { kgMin: 68, kgMax: 75, cmMin: 154, cmMax: 162 },
  { kgMin: 73, kgMax: 79, cmMin: 159, cmMax: 167 }
];
const WIDTH_ROWS = [
  { euMax: 41, mm: '235–245' },
  { euMax: 43, mm: '245–255' },
  { euMax: 45.5, mm: '255–260' },
  { euMax: 99, mm: '260–265+' }
];
type Style = 'all' | 'park' | 'powder';

const T = {
  sv: {
    weight: 'Din vikt (kg)', height: 'Din längd (cm), frivilligt', boot: 'Skostorlek (EU)', style: 'Hur du åker mest',
    styles: { all: 'All-mountain, lite av allt', park: 'Park och freestyle', powder: 'Puder och freeride' } as Record<Style, string>,
    beginner: 'Jag är nybörjare',
    length: 'Brädlängd', width: 'Midjebredd', cm: 'cm', mm: 'mm',
    fromWeight: (a: number, b: number) => `Efter vikt: ${a}–${b} cm`,
    styleAdj: { all: 'Ingen justering för all-mountain.', park: 'Park: 2–4 cm kortare än viktens värde.', powder: 'Puder: 2–4 cm längre än viktens värde.' } as Record<Style, string>,
    heightCheck: (n: number) => `Kontroll mot din längd: cirka ${n} cm (längd minus 20 cm).`,
    beginnerNote: 'Nybörjare: välj den kortare delen av spannet. En kortare bräda är lättare att styra.',
    under: 'Under 50 kg: tabellen räcker inte. Använd tillverkarens storleksguide för små åkare och barn.',
    over: 'Över 77 kg säger tabellen bara 160 cm och uppåt. Använd tillverkarens tabell för just den modellen.',
    wide: 'Med EU 44 eller större: överväg en mid-wide eller wide (W) bräda.',
    widthNote: 'Kängorna ska sticka ut 1–2 cm över kanten på varje sida.',
    volumeShift: 'Volume-shifted brädor (kortare och bredare) åks kortare. Följ tillverkarens tabell för dem.',
    readMore: 'Läs hela guiden: brädtyper, camber, rocker och storlek'
  },
  en: {
    weight: 'Your weight (kg)', height: 'Your height (cm), optional', boot: 'Boot size (EU)', style: 'How you ride most',
    styles: { all: 'All-mountain, a bit of everything', park: 'Park and freestyle', powder: 'Powder and freeride' } as Record<Style, string>,
    beginner: 'I am a beginner',
    length: 'Board length', width: 'Waist width', cm: 'cm', mm: 'mm',
    fromWeight: (a: number, b: number) => `From weight: ${a}–${b} cm`,
    styleAdj: { all: 'No adjustment for all-mountain.', park: 'Park: 2–4 cm shorter than the weight value.', powder: 'Powder: 2–4 cm longer than the weight value.' } as Record<Style, string>,
    heightCheck: (n: number) => `Check against your height: about ${n} cm (height minus 20 cm).`,
    beginnerNote: 'Beginners: pick the shorter end of the range. A shorter board is easier to control.',
    under: 'Under 50 kg the chart does not apply. Use the brand’s size chart for small riders and kids.',
    over: 'Above 77 kg the chart only says 160 cm and up. Use the brand’s chart for the exact model.',
    wide: 'With EU 44 or bigger: consider a mid-wide or wide (W) board.',
    widthNote: 'Your boots should stick out 1–2 cm over the edge on each side.',
    volumeShift: 'Volume-shifted boards (shorter and wider) are ridden shorter. Follow the brand’s chart for those.',
    readMore: 'Read the full guide: board types, camber, rocker and size'
  }
};

function lengthFor(kg: number) {
  if (kg < 50) return 'under' as const;
  if (kg > 79) return 'over' as const;
  // Raderna överlappar: välj raden vars mitt ligger närmast vikten.
  const row = [...LENGTH_ROWS]
    .filter((r) => kg >= r.kgMin && kg <= r.kgMax)
    .sort((a, b) => Math.abs((a.kgMin + a.kgMax) / 2 - kg) - Math.abs((b.kgMin + b.kgMax) / 2 - kg))[0];
  return row ?? ('over' as const);
}

export function SnowboardSize() {
  const locale = useLocale();
  const t = locale === 'sv' ? T.sv : T.en;
  const [kg, setKg] = useState(72);
  const [height, setHeight] = useState<number | ''>('');
  const [eu, setEu] = useState(43);
  const [style, setStyle] = useState<Style>('all');
  const [beginner, setBeginner] = useState(false);

  const row = lengthFor(kg);
  const adj = style === 'park' ? [-4, -2] : style === 'powder' ? [2, 4] : [0, 0];
  const width = WIDTH_ROWS.find((w) => eu <= w.euMax) ?? WIDTH_ROWS[WIDTH_ROWS.length - 1]!;

  const input = 'w-28 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-lg text-white outline-none focus:border-white';

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-6">
          <label className="text-sm font-semibold text-white">
            {t.weight}
            <input type="number" inputMode="decimal" min={30} max={150} value={Number.isFinite(kg) ? kg : ''} onChange={(e) => setKg(parseFloat(e.target.value))} className={clsx(input, 'mt-2 block')} />
          </label>
          <label className="text-sm font-semibold text-white">
            {t.boot}
            <input type="number" inputMode="decimal" step={0.5} min={34} max={50} value={Number.isFinite(eu) ? eu : ''} onChange={(e) => setEu(parseFloat(e.target.value))} className={clsx(input, 'mt-2 block')} />
          </label>
          <label className="text-sm font-semibold text-white">
            {t.height}
            <input type="number" inputMode="decimal" min={100} max={220} value={height} onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))} className={clsx(input, 'mt-2 block')} />
          </label>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-white">{t.style}</legend>
          <div className="mt-2 grid gap-2">
            {(['all', 'park', 'powder'] as Style[]).map((s) => (
              <label key={s} className={clsx('flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3', style === s ? 'border-white bg-white/10' : 'border-white/15 hover:border-white/40')}>
                <input type="radio" name="sb-style" checked={style === s} onChange={() => setStyle(s)} className="accent-white" />
                <span className="text-white">{t.styles[s]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex cursor-pointer items-center gap-3 text-white">
          <input type="checkbox" checked={beginner} onChange={(e) => setBeginner(e.target.checked)} className="h-4 w-4 accent-white" />
          {t.beginner}
        </label>
      </div>

      <div className="self-start rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8" aria-live="polite">
        <p className="text-sm uppercase tracking-wider text-white/60">{t.length}</p>
        {row === 'under' || row === 'over' ? (
          <p className="mt-2 text-white/80">{row === 'under' ? t.under : t.over}</p>
        ) : (
          <>
            <p className="mt-2 text-5xl font-bold leading-none text-white">
              {row.cmMin + adj[0]!}–{row.cmMax + adj[1]!}
              <span className="ml-2 text-2xl font-normal text-white/70">{t.cm}</span>
            </p>
            <p className="mt-3 text-sm text-white/60">{t.fromWeight(row.cmMin, row.cmMax)}. {t.styleAdj[style]}</p>
          </>
        )}
        {typeof height === 'number' && height >= 100 && <p className="mt-2 text-sm text-white/60">{t.heightCheck(Math.round(height - 20))}</p>}
        {beginner && <p className="mt-2 text-sm text-white/80">{t.beginnerNote}</p>}

        <p className="mt-8 text-sm uppercase tracking-wider text-white/60">{t.width}</p>
        <p className="mt-2 text-4xl font-bold leading-none text-white">
          {width.mm}
          <span className="ml-2 text-xl font-normal text-white/70">{t.mm}</span>
        </p>
        <p className="mt-3 text-sm text-white/60">{t.widthNote}</p>
        {eu >= 44 && <p className="mt-2 text-sm font-medium text-white">{t.wide}</p>}

        <p className="mt-6 text-xs leading-relaxed text-white/50">{t.volumeShift}</p>
        <Link href="/snowboard/articles/snowboard-types-how-to-choose" className="mt-5 inline-block text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
          {t.readMore} →
        </Link>
      </div>
    </div>
  );
}
