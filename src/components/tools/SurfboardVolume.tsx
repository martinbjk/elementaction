'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * VOLYMKALKYLATOR FÖR SURFBRÄDA
 *
 * Bygger på Guild Factor-formeln exakt som den står i artikeln
 * "surfboards-explained-volume-shape" (källa: Surfer Today):
 *   vikt (kg) × Guild Factor = rekommenderad volym (liter)
 * Epoxi/EPS flyter mer: dra av 2–3 liter. Brädtyperna per nivå kommer från
 * artikelns tabell "The main types of surfboard" (kolumnen "Who it suits").
 * Ändras artikeln ska siffrorna här ändras också.
 */
type Level = 'beginner' | 'casual' | 'intermediate' | 'intAdv' | 'advanced';

const FACTORS: Record<Level, { min: number; max: number | null }> = {
  beginner: { min: 0.5, max: null },
  casual: { min: 0.43, max: 0.49 },
  intermediate: { min: 0.38, max: 0.42 },
  intAdv: { min: 0.36, max: 0.38 },
  advanced: { min: 0.34, max: 0.36 }
};

const T = {
  sv: {
    weight: 'Din vikt',
    level: 'Din nivå',
    material: 'Brädans material',
    pu: 'Polyuretan (PU)',
    epoxy: 'Epoxi / EPS',
    result: 'Rekommenderad volym',
    atLeast: 'minst',
    litres: 'liter',
    factor: 'Guild Factor',
    epoxyNote: 'Epoxi och EPS flyter mer än PU, så vi har dragit av 2–3 liter.',
    boards: 'Brädtyper som brukar passa',
    more: 'Välj den övre delen av spannet om du surfar sällan, i svaga vågor, i tjock våtdräkt eller vill paddla lättare. Ärligt talat: de flesta överskattar sin nivå.',
    beginnerMore: 'För nybörjare är mer volym bättre. Surfskolor börjar ofta med långa mjuka brädor med mycket mer volym än formelns minimum.',
    readMore: 'Läs hela guiden: volym, form, fenor och köpråd',
    levels: {
      beginner: 'Nybörjare',
      casual: 'Surfar då och då',
      intermediate: 'Medel',
      intAdv: 'Medel till avancerad',
      advanced: 'Avancerad / proffs'
    } as Record<Level, string>,
    levelHelp: {
      beginner: 'Lär dig ställa dig upp och åka vitvatten',
      casual: 'Några gånger om året, även om du surfat länge',
      intermediate: 'Tar gröna vågor och svänger, eller äldre surfare',
      intAdv: 'Surfar ofta och svänger kontrollerat',
      advanced: 'Surfar mycket, i kraftiga vågor'
    } as Record<Level, string>,
    types: {
      beginner: ['Soft-top', 'Longboard', 'Mid-length'],
      casual: ['Mid-length', 'Funboard / mini-mal', 'Longboard'],
      intermediate: ['Funboard / mini-mal', 'Fish', 'Groveller / hybrid'],
      intAdv: ['Fish', 'Groveller / hybrid', 'Shortboard'],
      advanced: ['Shortboard', 'Step-up', 'Groveller / hybrid']
    } as Record<Level, string[]>,
    disclaimer: 'Ett riktvärde, inte ett facit. Två brädor med samma volym kan kännas olika beroende på var volymen sitter.'
  },
  en: {
    weight: 'Your weight',
    level: 'Your level',
    material: 'Board construction',
    pu: 'Polyurethane (PU)',
    epoxy: 'Epoxy / EPS',
    result: 'Recommended volume',
    atLeast: 'at least',
    litres: 'litres',
    factor: 'Guild Factor',
    epoxyNote: 'Epoxy and EPS float more than PU, so we have taken off 2–3 litres.',
    boards: 'Board types that usually suit',
    more: 'Pick the top of the range if you surf rarely, in weak waves, in a thick wetsuit, or want easier paddling. Honestly: most surfers overestimate their level.',
    beginnerMore: 'For beginners, more volume is better. Surf schools often start people on long soft boards with far more volume than the formula’s minimum.',
    readMore: 'Read the full guide: volume, shape, fins and buying advice',
    levels: {
      beginner: 'Beginner',
      casual: 'Casual / weekend',
      intermediate: 'Intermediate',
      intAdv: 'Intermediate to advanced',
      advanced: 'Advanced / pro'
    } as Record<Level, string>,
    levelHelp: {
      beginner: 'Learning to stand up and ride whitewater',
      casual: 'A few times a year, even if you have surfed for years',
      intermediate: 'Catching green waves and turning, or an older surfer',
      intAdv: 'Surfing often, with controlled turns',
      advanced: 'Surfing a lot, in powerful waves'
    } as Record<Level, string>,
    types: {
      beginner: ['Soft-top', 'Longboard', 'Mid-length'],
      casual: ['Mid-length', 'Funboard / mini-mal', 'Longboard'],
      intermediate: ['Funboard / mini-mal', 'Fish', 'Groveller / hybrid'],
      intAdv: ['Fish', 'Groveller / hybrid', 'Shortboard'],
      advanced: ['Shortboard', 'Step-up', 'Groveller / hybrid']
    } as Record<Level, string[]>,
    disclaimer: 'A starting point, not a final answer. Two boards with the same volume can feel different depending on where the volume sits.'
  }
};

const LEVELS: Level[] = ['beginner', 'casual', 'intermediate', 'intAdv', 'advanced'];
const fmt = (n: number) => (Math.round(n * 2) / 2).toFixed(1);

export function SurfboardVolume() {
  const locale = useLocale();
  const t = locale === 'sv' ? T.sv : T.en;
  const comma = (v: string) => (locale === 'sv' ? v.replace('.', ',') : v);

  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = useState(75);
  const [level, setLevel] = useState<Level>('intermediate');
  const [epoxy, setEpoxy] = useState(false);

  const kg = unit === 'kg' ? weight : weight * 0.45359237;
  const res = useMemo(() => {
    const f = FACTORS[level];
    const cut = epoxy ? 2.5 : 0;
    const lo = kg * f.min - cut;
    const hi = f.max ? kg * f.max - cut : null;
    return { lo, hi, f };
  }, [kg, level, epoxy]);

  const valid = kg >= 25 && kg <= 200;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-7">
        <div>
          <label htmlFor="sv-weight" className="text-sm font-semibold text-white">{t.weight}</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="sv-weight"
              type="number"
              inputMode="decimal"
              min={unit === 'kg' ? 25 : 55}
              max={unit === 'kg' ? 200 : 440}
              value={Number.isFinite(weight) ? weight : ''}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-28 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-lg text-white outline-none focus:border-white"
            />
            <div className="flex rounded-full border border-white/20 p-1">
              {(['kg', 'lb'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={unit === u}
                  onClick={() => {
                    if (u === unit) return;
                    setWeight(Math.round(u === 'kg' ? weight * 0.45359237 : weight / 0.45359237));
                    setUnit(u);
                  }}
                  className={clsx('rounded-full px-4 py-1.5 text-sm', unit === u ? 'bg-white text-black' : 'text-white/70 hover:text-white')}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-white">{t.level}</legend>
          <div className="mt-2 grid gap-2">
            {LEVELS.map((l) => (
              <label
                key={l}
                className={clsx(
                  'flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition',
                  level === l ? 'border-white bg-white/10' : 'border-white/15 hover:border-white/40'
                )}
              >
                <input type="radio" name="sv-level" value={l} checked={level === l} onChange={() => setLevel(l)} className="mt-1 accent-white" />
                <span>
                  <span className="block font-medium text-white">{t.levels[l]}</span>
                  <span className="block text-sm text-white/60">{t.levelHelp[l]}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-white">{t.material}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[false, true].map((e) => (
              <button
                key={String(e)}
                type="button"
                aria-pressed={epoxy === e}
                onClick={() => setEpoxy(e)}
                className={clsx('rounded-full border px-4 py-2 text-sm', epoxy === e ? 'border-white bg-white text-black' : 'border-white/20 text-white/75 hover:border-white/50')}
              >
                {e ? t.epoxy : t.pu}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="self-start rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8" aria-live="polite">
        <p className="text-sm uppercase tracking-wider text-white/60">{t.result}</p>
        {valid ? (
          <p className="mt-2 font-head text-5xl font-bold leading-none text-white">
            {res.hi === null ? (
              <>
                <span className="text-2xl font-normal text-white/70">{t.atLeast} </span>
                {comma(fmt(res.lo))}
              </>
            ) : (
              <>
                {comma(fmt(res.lo))}–{comma(fmt(res.hi))}
              </>
            )}
            <span className="ml-2 text-2xl font-normal text-white/70">{t.litres}</span>
          </p>
        ) : (
          <p className="mt-2 text-white/70">–</p>
        )}
        <p className="mt-3 text-sm text-white/60">
          {comma(kg.toFixed(0))} kg × {t.factor} {comma(res.f.min.toFixed(2))}
          {res.f.max ? `–${comma(res.f.max.toFixed(2))}` : '+'}
          {epoxy && (locale === 'sv' ? ' − 2,5 L' : ' − 2.5 L')}
        </p>
        {epoxy && <p className="mt-2 text-sm text-white/60">{t.epoxyNote}</p>}

        <p className="mt-6 text-sm font-semibold text-white">{t.boards}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {t.types[level].map((b) => (
            <li key={b} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/85">{b}</li>
          ))}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-white/70">{level === 'beginner' ? t.beginnerMore : t.more}</p>
        <p className="mt-3 text-xs leading-relaxed text-white/50">{t.disclaimer}</p>
        <Link href="/surfing/articles/surfboards-explained-volume-shape" className="mt-5 inline-block text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
          {t.readMore} →
        </Link>
      </div>
    </div>
  );
}
