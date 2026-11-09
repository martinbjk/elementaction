'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShareButton } from '@/components/ShareButton';
import { num, useInitFromUrl, useSyncUrl } from '@/lib/tools/url';

/**
 * VÅTDRÄKTSGUIDEN — vattentemperatur → tjocklek och tillbehör.
 * Källa: Rip Curl, "Wetsuit Temperature & Thickness Guide" (tabellen anger
 * °F; °C är omräknat). Rip Curls text föreslår huva redan under 10 °C,
 * vilket är strängare än tabellens 8,9 °C, så vi följer texten.
 */
const ROWS = [
  { minF: 75, mm: '0–1', suit: 'shorts', boots: 'no', gloves: 'no', hood: 'no' },
  { minF: 65, mm: '2', suit: 'spring', boots: 'no', gloves: 'no', hood: 'no' },
  { minF: 60, mm: '3/2', suit: 'full', boots: 'optional', gloves: 'no', hood: 'no' },
  { minF: 55, mm: '4/3', suit: 'full', boots: 'recommended', gloves: 'no', hood: 'no' },
  { minF: 48, mm: '4/3 – 5/4', suit: 'full', boots: 'yes', gloves: 'yes', hood: 'no' },
  { minF: -99, mm: '5/4 – 6/5', suit: 'hooded', boots: 'yes', gloves: 'yes', hood: 'yes' }
] as const;

const T = {
  sv: {
    temp: 'Vattentemperatur',
    result: 'Våtdräkt',
    suits: { shorts: 'Boardshorts eller lycratröja', spring: 'Shorty, kortärmad dräkt eller topp', full: 'Heldräkt', hooded: 'Heldräkt med huva' } as Record<string, string>,
    boots: 'Skor', gloves: 'Handskar', hood: 'Huva',
    val: { no: 'Behövs inte', optional: 'Valfritt', recommended: 'Rekommenderas', yes: 'Ja' } as Record<string, string>,
    hood10: 'Under 10 °C föreslår Rip Curl huva, även om tabellen drar gränsen lite lägre.',
    note: 'Fryser du lätt, surfar länge eller blåser det kallt: välj en tjockare dräkt. Lufttemperatur och vind spelar också in.',
    mm: 'mm',
    share: 'Våtdräktsguiden – Elementaction',
    links: 'Läs om kallvattensurf i Sverige, Danmark och Norge'
  },
  en: {
    temp: 'Water temperature',
    result: 'Wetsuit',
    suits: { shorts: 'Boardshorts or rash guard', spring: 'Spring suit, short-arm or top', full: 'Full suit', hooded: 'Hooded full suit' } as Record<string, string>,
    boots: 'Boots', gloves: 'Gloves', hood: 'Hood',
    val: { no: 'Not needed', optional: 'Optional', recommended: 'Recommended', yes: 'Yes' } as Record<string, string>,
    hood10: 'Below 10 °C Rip Curl suggests a hood, even though its chart sets the line a little lower.',
    note: 'If you get cold easily, surf long sessions or the wind is cold, go thicker. Air temperature and wind matter too.',
    mm: 'mm',
    share: 'Wetsuit guide – Elementaction',
    links: 'Read about cold-water surf in Sweden, Denmark and Norway'
  }
};

export function WetsuitGuide() {
  const locale = useLocale();
  const t = locale === 'sv' ? T.sv : T.en;
  const [unit, setUnit] = useState<'c' | 'f'>('c');
  const [c, setC] = useState(12);
  const ready = useInitFromUrl((p) => {
    const v = num(p.get('c'), 0, 30);
    if (v !== undefined) setC(Math.round(v));
    if (p.get('unit') === 'f') setUnit('f');
  });
  useSyncUrl({ c, unit: unit === 'f' ? 'f' : null }, ready);
  const f = c * 1.8 + 32;
  const row = ROWS.find((r) => f >= r.minF) ?? ROWS[ROWS.length - 1]!;
  const hood = row.hood === 'yes' || c < 10;
  const show = (v: number) => (unit === 'c' ? `${v.toFixed(0)} °C` : `${(v * 1.8 + 32).toFixed(0)} °F`);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">{t.temp}</p>
          <div className="flex rounded-full border border-white/20 p-1">
            {(['c', 'f'] as const).map((u) => (
              <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)} className={clsx('rounded-full px-4 py-1 text-sm', unit === u ? 'bg-white text-black' : 'text-white/70')}>
                °{u.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-6xl font-bold text-white">{show(c)}</p>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={c}
          onChange={(e) => setC(Number(e.target.value))}
          aria-label={t.temp}
          className="mt-6 w-full accent-white"
        />
        <div className="mt-1 flex justify-between text-xs text-white/50">
          <span>{show(0)}</span>
          <span>{show(15)}</span>
          <span>{show(30)}</span>
        </div>
      </div>

      <div className="self-start rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8" aria-live="polite">
        <p className="text-sm uppercase tracking-wider text-white/60">{t.result}</p>
        <p className="mt-2 text-5xl font-bold leading-none text-white">
          {row.mm}
          <span className="ml-2 text-2xl font-normal text-white/70">{t.mm}</span>
        </p>
        <p className="mt-2 text-white/80">{t.suits[row.suit]}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
          {([['boots', row.boots], ['gloves', row.gloves], ['hood', hood ? 'yes' : 'no']] as const).map(([k, v]) => (
            <div key={k} className={clsx('rounded-xl border px-3 py-3', v === 'yes' ? 'border-white bg-white/10' : 'border-white/15')}>
              <dt className="text-xs text-white/50">{t[k]}</dt>
              <dd className="mt-1 font-semibold text-white">{t.val[v]}</dd>
            </div>
          ))}
        </dl>
        {c < 10 && row.hood !== 'yes' && <p className="mt-3 text-sm text-white/70">{t.hood10}</p>}
        <p className="mt-5 text-sm leading-relaxed text-white/60">{t.note}</p>
        <div className="mt-6">
          <ShareButton title={t.share} getText={() => `${show(c)}: ${row.mm} mm, ${t.suits[row.suit]!.toLowerCase()}`} />
        </div>
        <div className="mt-5 flex flex-col gap-2 text-sm">
          <Link href="/surfing/articles/cold-water-surf-spots-sweden-denmark" className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            {t.links} →
          </Link>
        </div>
      </div>
    </div>
  );
}
