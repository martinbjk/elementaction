'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShareButton } from '@/components/ShareButton';
import { SHOPS, SHOPS_UPDATED, type Shop } from '@/lib/tools/skateshops';
import { useInitFromUrl, useSyncUrl } from '@/lib/tools/url';
import { TIP_EMAIL } from '@/lib/site';

/**
 * SKATE SHOP FINDER — sök oberoende skateshoppar i Norden och Europa.
 * Data: src/lib/tools/skateshops.ts. Valen sparas i adressen (?q=malmo&k=Sweden),
 * så en delad länk visar samma resultat.
 */
const NORDIC = ['Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'];
// Norden först, sedan resten i bokstavsordning på besökarens språk.
const byRegion = (name: (k: string) => string, collator: Intl.Collator) => (a: string, b: string) => {
  const ia = NORDIC.indexOf(a);
  const ib = NORDIC.indexOf(b);
  if (ia > -1 || ib > -1) return (ia > -1 ? ia : 99) - (ib > -1 ? ib : 99);
  return collator.compare(name(a), name(b));
};
const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/ß/g, 'ss');
// Lokala stavningar och svenska namn hittar också rätt stad.
const ALIAS: Record<string, string> = {
  gothenburg: 'goteborg', copenhagen: 'kobenhavn kopenhamn', prague: 'praha prag', warsaw: 'warszawa warszawa',
  vienna: 'wien', rome: 'roma rom', lisbon: 'lissabon lisboa', antwerp: 'antwerpen', munich: 'munchen', zurich: 'zuerich',
  helsinki: 'helsingfors', amsterdam: 'amsterdam', paris: 'paris', london: 'london', dublin: 'dublin', berlin: 'berlin',
  hamburg: 'hamburg', frankfurt: 'frankfurt', madrid: 'madrid', barcelona: 'barcelona', oslo: 'oslo', stavanger: 'stavanger'
};
const COUNTRY_SV: Record<string, string> = {
  Sweden: 'Sverige', Norway: 'Norge', Denmark: 'Danmark', Finland: 'Finland', 'United Kingdom': 'Storbritannien',
  Ireland: 'Irland', France: 'Frankrike', Spain: 'Spanien', Germany: 'Tyskland', Netherlands: 'Nederländerna',
  Belgium: 'Belgien', Switzerland: 'Schweiz', Austria: 'Österrike', 'Czech Republic': 'Tjeckien', Poland: 'Polen',
  Portugal: 'Portugal', Italy: 'Italien'
};

const T = {
  sv: {
    search: 'Sök stad, land eller butik … t.ex. Malmö, Paris, Ben-G',
    all: 'Alla',
    showU: 'Visa butiker som kontrolleras',
    indie: 'Bara oberoende',
    count: (n: number, total: number) => `${n} av ${total} butiker`,
    stats: { shops: 'butiker', verified: 'verifierade', cities: 'städer', countries: 'länder' },
    verified: '✅ Verifierad',
    checking: '⚠️ Kontrolleras',
    surf: 'Surf + skate',
    group: 'Butikskedja',
    since: 'Sedan',
    noAddr: 'Adressen är inte bekräftad',
    map: 'Karta ↗',
    empty: 'Inga butiker matchar. Prova en annan stad eller rensa filtren.',
    note1: '✅ Verifierad betyder att adressen kommer från butikens egen webbplats, en officiell stads- eller turistlista, eller två oberoende källor som stämmer överens. ⚠️ Kontrolleras betyder att butiken finns, men adressen är inte bekräftad än. Butiker flyttar och stänger, så kolla deras webbplats innan en lång resa.',
    note2: 'Stora kedjor som Blue Tomato, Junkyard, Zumiez, doodah och Decathlon är medvetet inte med. Känner du till en butik som borde finnas här? Det är gratis att bli listad.',
    tip: 'Tipsa om en butik',
    tipSubject: 'Butikstips till Skate Shop Finder',
    tipBody: 'Butikens namn:\nStad och land:\nAdress:\nWebbplats:\nÖvrigt:\n',
    updated: 'Senast uppdaterad: 16 november 2026',
    article: 'Läs artikeln om oberoende skateshoppar i Europa',
    share: 'Skate Shop Finder – Elementaction',
    shareText: (n: number, q: string) => (q ? `${n} skateshoppar för "${q}"` : `${n} oberoende skateshoppar i Norden och Europa`),
    descEn: 'Beskrivningen finns på engelska.'
  },
  en: {
    search: 'Search city, country or shop… e.g. Malmö, Paris, Ben-G',
    all: 'All',
    showU: 'Show shops still being verified',
    indie: 'Independent only',
    count: (n: number, total: number) => `${n} of ${total} shops`,
    stats: { shops: 'shops', verified: 'verified', cities: 'cities', countries: 'countries' },
    verified: '✅ Verified',
    checking: '⚠️ Checking',
    surf: 'Surf + skate',
    group: 'Retail group',
    since: 'Since',
    noAddr: 'Address not confirmed',
    map: 'Map ↗',
    empty: 'No shops match. Try another city or clear the filters.',
    note1: '✅ Verified means the address comes from the shop’s own website, an official city or tourism listing, or two independent sources that agree. ⚠️ Checking means the shop is real, but the address isn’t confirmed yet. Shops move and close, so check their website before a long trip.',
    note2: 'Big chains such as Blue Tomato, Junkyard, Zumiez, doodah and Decathlon are left out on purpose. Know a shop that belongs here? Listing is free.',
    tip: 'Suggest a shop',
    tipSubject: 'Shop tip for the Skate Shop Finder',
    tipBody: 'Shop name:\nCity and country:\nAddress:\nWebsite:\nOther info:\n',
    updated: 'Last updated: 16 November 2026',
    article: 'Read the article on independent skate shops in Europe',
    share: 'Skate Shop Finder – Elementaction',
    shareText: (n: number, q: string) => (q ? `${n} skate shops for "${q}"` : `${n} independent skate shops in the Nordics and Europe`),
    descEn: ''
  }
};

const mapLink = (s: Shop) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([s.n, s.a, s.c, s.k].filter(Boolean).join(', '));

export function SkateShopFinder() {
  const locale = useLocale();
  const lang = locale === 'sv' ? 'sv' : 'en';
  const t = T[lang];
  const countryName = (k: string) => (lang === 'sv' ? COUNTRY_SV[k] ?? k : k);
  const sortRegion = byRegion(countryName, new Intl.Collator(lang === 'sv' ? 'sv' : 'en'));

  const [q, setQ] = useState('');
  const [country, setCountry] = useState('All');
  const [showU, setShowU] = useState(true);
  const [indie, setIndie] = useState(false);

  const countries = useMemo(() => {
    const c: Record<string, number> = {};
    SHOPS.forEach((s) => (c[s.k] = (c[s.k] ?? 0) + 1));
    return Object.keys(c).sort(sortRegion).map((k) => ({ k, n: c[k]! }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ready = useInitFromUrl((p) => {
    setQ(p.get('q') ?? '');
    const k = p.get('k');
    if (k && countries.some((x) => x.k === k)) setCountry(k);
    if (p.get('verified') === '1') setShowU(false);
    if (p.get('indie') === '1') setIndie(true);
  });
  useSyncUrl({ q: q.trim() || null, k: country === 'All' ? null : country, verified: !showU, indie }, ready);

  const list = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    return SHOPS.filter((s) => {
      if (country !== 'All' && s.k !== country) return false;
      if (!showU && s.s === 'u') return false;
      if (indie && s.t === 'group') return false;
      const hay = norm([s.n, s.c, s.k, s.a, s.d, ALIAS[norm(s.c)], COUNTRY_SV[s.k]].join(' '));
      return terms.every((term) => hay.includes(term));
    });
  }, [q, country, showU, indie]);

  const groups = useMemo(() => {
    const g: Record<string, Shop[]> = {};
    list.forEach((s) => (g[s.k] = g[s.k] ?? []).push(s));
    return Object.keys(g)
      .sort(sortRegion)
      .map((k) => ({
        k,
        items: g[k]!.sort((a, b) => (a.s === b.s ? 0 : a.s === 'v' ? -1 : 1) || a.c.localeCompare(b.c) || a.n.localeCompare(b.n))
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, lang]);

  const verifiedCount = SHOPS.filter((s) => s.s === 'v').length;
  const cityCount = new Set(SHOPS.map((s) => s.c)).size;
  const chip = (active: boolean) =>
    clsx('rounded-full border px-3 py-1.5 text-sm transition', active ? 'border-white bg-white font-semibold text-black' : 'border-white/20 text-white/75 hover:border-white/50');

  return (
    <div>
      <div className="flex flex-wrap gap-2 text-sm">
        {[
          [SHOPS.length, t.stats.shops],
          [verifiedCount, t.stats.verified],
          [cityCount, t.stats.cities],
          [countries.length, t.stats.countries]
        ].map(([n, label]) => (
          <span key={String(label)} className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-white/70">
            <b className="text-white">{n}</b> {label}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-4 rounded-3xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search}
          aria-label={t.search}
          autoComplete="off"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-lg text-white outline-none placeholder:text-white/40 focus:border-white"
        />
        <div className="flex flex-wrap gap-2" role="group">
          <button type="button" aria-pressed={country === 'All'} onClick={() => setCountry('All')} className={chip(country === 'All')}>
            {t.all}
          </button>
          {countries.map(({ k, n }) => (
            <button key={k} type="button" aria-pressed={country === k} onClick={() => setCountry(k)} className={chip(country === k)}>
              {countryName(k)} <span className="opacity-60">{n}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={showU} onChange={(e) => setShowU(e.target.checked)} className="h-4 w-4 accent-white" />
            {t.showU}
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={indie} onChange={(e) => setIndie(e.target.checked)} className="h-4 w-4 accent-white" />
            {t.indie}
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm text-white/70">{t.count(list.length, SHOPS.length)}</p>
        <ShareButton title={t.share} getText={() => t.shareText(list.length, q.trim())} />
      </div>

      {list.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/25 p-8 text-center text-white/70">{t.empty}</p>
      ) : (
        groups.map(({ k, items }) => (
          <section key={k} className="mt-8">
            <h2 className="text-xl font-bold text-white">{countryName(k)}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {items.map((s) => (
                <article
                  key={`${s.n}-${s.c}`}
                  className={clsx('rounded-2xl border border-white/15 border-l-4 bg-white/[0.03] p-4', s.s === 'v' ? 'border-l-[#5fbf77]' : 'border-l-[#e0a03a]')}
                >
                  <h3 className="text-lg font-semibold text-white">{s.n}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
                    <span className="rounded bg-white/10 px-2 py-0.5 text-white/80">{s.c}</span>
                    <span className={clsx('rounded px-2 py-0.5', s.s === 'v' ? 'bg-[#5fbf77]/15 text-[#7fd895]' : 'bg-[#e0a03a]/15 text-[#f0b860]')}>
                      {s.s === 'v' ? t.verified : t.checking}
                    </span>
                    {s.t === 'surf' && <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">{t.surf}</span>}
                    {s.t === 'group' && <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">{t.group}</span>}
                    {s.y && <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">{t.since} {s.y}</span>}
                  </div>
                  <p className="mt-2 font-mono text-sm text-white/85">{s.a || t.noAddr}</p>
                  {s.d && <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.d}</p>}
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                    <a href={mapLink(s)} target="_blank" rel="noopener" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                      {t.map}
                    </a>
                    {s.w && (
                      <a href={`https://${s.w}`} target="_blank" rel="noopener" className="break-all text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                        {s.w} ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}

      <div className="mt-12 max-w-3xl space-y-3 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/60">
        {lang === 'sv' && <p className="text-xs text-white/45">{t.descEn}</p>}
        <p>{t.note1}</p>
        <p>
          {t.note2}{' '}
          <button
            type="button"
            onClick={() => {
              window.location.href = `mailto:${TIP_EMAIL.user}@${TIP_EMAIL.domain}?subject=${encodeURIComponent(t.tipSubject)}&body=${encodeURIComponent(t.tipBody)}`;
            }}
            className="font-semibold text-white underline underline-offset-4"
          >
            {t.tip}
          </button>
        </p>
        <p>
          <Link href="/skateboard/articles/independent-skate-shops-europe" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {t.article} →
          </Link>
        </p>
        <p className="text-xs text-white/45">
          {t.updated} <span className="sr-only">({SHOPS_UPDATED})</span>
        </p>
      </div>
    </div>
  );
}
