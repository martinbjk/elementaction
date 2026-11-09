/**
 * SÄSONGSGUIDEN — data.
 *
 * Varje rad: ett resmål, vilka månader det är bra (`good`) och när det är
 * som bäst (`peak`). Månader 1–12. Varje rad har en källa, och där vi har
 * en egen artikel länkas den. Lägg bara till rader med en källa som
 * uttryckligen anger månaderna.
 */
export type SeasonKind = 'surf' | 'snow';

export interface SeasonSpot {
  id: string;
  kind: SeasonKind;
  name: { sv: string; en: string };
  note: { sv: string; en: string };
  good: number[];
  peak: number[];
  source: { label: string; url: string };
  /** Egen artikel: sökväg utan språk, t.ex. "surfing/articles/…". */
  article?: string;
}

const m = (from: number, to: number) => {
  const out: number[] = [];
  for (let i = from; ; i = (i % 12) + 1) {
    out.push(i);
    if (i === to) break;
  }
  return out;
};
const s = (sv: string, en: string) => ({ sv, en });

export const SEASONS: SeasonSpot[] = [
  // ---------- SURF ----------
  { id: 'hawaii-north', kind: 'surf', name: s('Hawaii, North Shore (Oʻahu)', 'Hawaii, North Shore (Oʻahu)'),
    note: s('Stora, kraftiga vinterdyningar. För erfarna.', 'Big, powerful winter swells. For experienced surfers.'),
    good: m(11, 4), peak: m(12, 2),
    source: { label: 'Hawaii Ocean Safety: Hawaii’s surf seasons', url: 'https://oceansafety.hawaii.gov/hawaiis-surf-seasons/' } },
  { id: 'hawaii-south', kind: 'surf', name: s('Hawaii, South Shore', 'Hawaii, South Shore'),
    note: s('Sommarsäsongen, med sydliga dyningar.', 'The summer season, with south swells.'),
    good: m(5, 10), peak: [],
    source: { label: 'Hawaii Ocean Safety: Hawaii’s surf seasons', url: 'https://oceansafety.hawaii.gov/hawaiis-surf-seasons/' } },
  { id: 'bali-west', kind: 'surf', name: s('Bali, västkusten (Uluwatu)', 'Bali, west coast (Uluwatu)'),
    note: s('Torrperioden. Störst dyning och mest folk i juli–augusti.', 'Dry season. Biggest swells and biggest crowds in July–August.'),
    good: m(4, 10), peak: [7, 8],
    source: { label: 'Rapture Surfcamps: Bali weather month by month', url: 'https://www.rapturecamps.com/blog/bali-weather-a-month-by-month' } },
  { id: 'bali-east', kind: 'surf', name: s('Bali, östkusten (Keramas)', 'Bali, east coast (Keramas)'),
    note: s('Regnperioden, när vinden passar östkusten bättre.', 'Wet season, when the wind suits the east coast better.'),
    good: m(11, 3), peak: [],
    source: { label: 'Rapture Surfcamps: Bali weather month by month', url: 'https://www.rapturecamps.com/blog/bali-weather-a-month-by-month' } },
  { id: 'morocco', kind: 'surf', name: s('Marocko, Taghazout', 'Morocco, Taghazout'),
    note: s('Vintern är högsäsong för pointbreaks. Hösten är lugnare och bättre för nybörjare.', 'Winter is peak season for the points. Autumn is mellower and better for beginners.'),
    good: m(9, 3), peak: m(11, 3),
    source: { label: 'The Surf Atlas: Morocco surf season', url: 'https://thesurfatlas.com/surfing-morocco/morocco-surf-season/' } },
  { id: 'atlantic-europe', kind: 'surf', name: s('Frankrike, Spanien och Portugal', 'France, Spain and Portugal'),
    note: s('Hösten, när Nordatlantens dyningssäsong drar igång och vattnet fortfarande är varmt.', 'Autumn, when the North Atlantic swell season starts and the water is still warm.'),
    good: m(9, 11), peak: [9, 10],
    source: { label: 'Perfect Wave Travel: Best time of year for surfing in Europe', url: 'https://www.perfectwavetravel.com/magazine/surf/whats-the-best-time-of-year-for-surfing-in-europe/' },
    article: 'surfing/articles/surf-spots-portugal-guide' },
  { id: 'nazare', kind: 'surf', name: s('Nazaré, Portugal (stora vågor)', 'Nazaré, Portugal (big waves)'),
    note: s('Tävlingsfönstret för storvågor. För att titta, inte för att surfa.', 'The big-wave contest window. For watching, not for surfing.'),
    good: m(11, 3), peak: [],
    source: { label: 'Elementaction: Nazaré and Mavericks', url: 'https://elementaction.com/en/surfing/articles/big-wave-surfing-nazare-mavericks/' },
    article: 'surfing/articles/big-wave-surfing-nazare-mavericks' },
  { id: 'lofoten', kind: 'surf', name: s('Lofoten, Norge', 'Lofoten, Norway'),
    note: s('Surf under norrskenet. Tjock dräkt, huva, handskar och skor.', 'Surf under the northern lights. Thick wetsuit, hood, gloves and boots.'),
    good: m(11, 3), peak: [],
    source: { label: 'Surfer Today: Surfing Lofoten', url: 'https://www.surfertoday.com/surfing/surfing-lofoten-riding-the-waves-of-the-arctic-circle' },
    article: 'inspiration/articles/uncrowded-surf-travel' },
  { id: 'jaeren', kind: 'surf', name: s('Jæren, Norge', 'Jæren, Norway'),
    note: s('Vintern, särskilt januari, ger de renaste dagarna.', 'Winter, especially January, gives the cleanest days.'),
    good: m(12, 2), peak: [1],
    source: { label: 'Elementaction: Cold-water surf spots in Norway', url: 'https://elementaction.com/en/surfing/articles/cold-water-surf-spots-norway/' },
    article: 'surfing/articles/cold-water-surf-spots-norway' },
  { id: 'iceland', kind: 'surf', name: s('Reykjanes, Island', 'Reykjanes, Iceland'),
    note: s('Hösten ger bäst balans mellan vågor och väder. Sommaren är ofta platt.', 'Autumn gives the best balance of waves and weather. Summer is often flat.'),
    good: m(9, 2), peak: m(9, 11),
    source: { label: 'Surfer Today: The best surf spots in Iceland', url: 'https://www.surfertoday.com/surfing/the-best-surf-spots-in-iceland' },
    article: 'inspiration/articles/uncrowded-surf-travel' },
  { id: 'skeleton-bay', kind: 'surf', name: s('Skeleton Bay, Namibia', 'Skeleton Bay, Namibia'),
    note: s('Lång vänstertub. Bara för experter.', 'A long left-hand barrel. Experts only.'),
    good: m(6, 9), peak: [],
    source: { label: 'Surfer Today: Skeleton Bay', url: 'https://www.surfertoday.com/surfing/skeleton-bay-the-endless-namibian-barreling-wave' },
    article: 'inspiration/articles/uncrowded-surf-travel' },
  { id: 'simeulue', kind: 'surf', name: s('Simeulue, Indonesien', 'Simeulue, Indonesia'),
    note: s('Mest pålitliga dyningarna. Vattnet runt 28 °C.', 'Most consistent swells. Water around 28 °C.'),
    good: m(4, 10), peak: [],
    source: { label: 'Perfect Wave Travel: Simeulue surf guide', url: 'https://www.perfectwavetravel.com/simeulue-surf-guide/' },
    article: 'inspiration/articles/uncrowded-surf-travel' },

  // ---------- SNÖ ----------
  { id: 'alps', kind: 'snow', name: s('Alperna', 'The Alps'),
    note: s('De flesta orter har öppet december–april. Högt belägna orter och glaciärer är säkrast tidigt och sent.', 'Most resorts are open December–April. High resorts and glaciers are the safest bets early and late.'),
    good: m(12, 4), peak: [1, 2, 3],
    source: { label: 'Elementaction: Snowboard Resort Guide', url: 'https://elementaction.com/en/snowboard/articles/snowboard-resort-guide/' },
    article: 'snowboard/articles/snowboard-resort-guide' },
  { id: 'alps-high', kind: 'snow', name: s('Glaciärer och höga orter i Alperna', 'Alpine glaciers and high resorts'),
    note: s('Säkrast tidigt och sent på säsongen, till exempel Sölden, Zermatt och Val Thorens.', 'The safest bets early and late in the season, such as Sölden, Zermatt and Val Thorens.'),
    good: [11, 4], peak: [],
    source: { label: 'Elementaction: Where the Snow Is 2026/27', url: 'https://elementaction.com/en/snowboard/articles/snow-guide-world-slopes-2026-27/' },
    article: 'snowboard/articles/snow-guide-world-slopes-2026-27' },
  { id: 'alps-glacier', kind: 'snow', name: s('Glaciärer i Alperna (sommar)', 'Alpine glaciers (summer)'),
    note: s('Sommaråkning och sommarparker: Les Deux Alpes, Tignes, Saas-Fee och Zermatt.', 'Summer riding and summer parks: Les Deux Alpes, Tignes, Saas-Fee and Zermatt.'),
    good: m(6, 8), peak: [],
    source: { label: 'Elementaction: Snowboard Resort Guide', url: 'https://elementaction.com/en/snowboard/articles/snowboard-resort-guide/' },
    article: 'snowboard/articles/snowboard-resort-guide' },
  { id: 'scandinavia', kind: 'snow', name: s('Skandinavien', 'Scandinavia'),
    note: s('Mörkt och snöigt i december, sol och vårskidåkning i april–maj.', 'Dark and snowy in December, sunny spring riding in April–May.'),
    good: m(12, 5), peak: [],
    source: { label: 'Elementaction: Where the Snow Is 2026/27', url: 'https://elementaction.com/en/snowboard/articles/snow-guide-world-slopes-2026-27/' },
    article: 'snowboard/articles/snow-guide-world-slopes-2026-27' },
  { id: 'japan', kind: 'snow', name: s('Japan, Niseko (Hokkaido)', 'Japan, Niseko (Hokkaido)'),
    note: s('Mest puder i januari och februari, med december nära efter.', 'Most powder in January and February, with December close behind.'),
    good: m(12, 4), peak: [1, 2],
    source: { label: 'Niseko Promotion Board: Which month is best?', url: 'https://www.niseko.ne.jp/en/news/which-month-in-winter-is-best-to-visit-niseko/' },
    article: 'snowboard/articles/snow-guide-world-slopes-2026-27' },
  { id: 'whistler', kind: 'snow', name: s('Kanada, Whistler', 'Canada, Whistler'),
    note: s('Säsongen går från sent i november in i maj.', 'The season runs from late November into May.'),
    good: m(12, 5), peak: [],
    source: { label: 'Elementaction: Where the Snow Is 2026/27', url: 'https://elementaction.com/en/snowboard/articles/snow-guide-world-slopes-2026-27/' },
    article: 'snowboard/articles/snow-guide-world-slopes-2026-27' },
  { id: 'mammoth', kind: 'snow', name: s('USA, Mammoth Mountain', 'USA, Mammoth Mountain'),
    note: s('Lång säsong, oftast november–maj. Kan räcka in i sommaren efter snörika vintrar.', 'Long season, usually November–May. Can last into summer after big snow years.'),
    good: m(11, 5), peak: [],
    source: { label: 'Wikipedia: Mammoth Mountain Resort', url: 'https://en.wikipedia.org/wiki/Mammoth_Mountain_Resort' },
    article: 'snowboard/articles/snowboard-resort-guide' },
  { id: 'new-zealand', kind: 'snow', name: s('Nya Zeeland, Cardrona', 'New Zealand, Cardrona'),
    note: s('Vinter på södra halvklotet. Säsongen 2026 gick från slutet av juni till 18 oktober.', 'Southern-hemisphere winter. The 2026 season ran from late June to 18 October.'),
    good: m(7, 9), peak: [],
    source: { label: 'Australasian Leisure Management: Cardrona extends season', url: 'https://www.ausleisure.com.au/news/cardrona-extends-winter-season-until-18th-october' },
    article: 'snowboard/articles/snowboard-resort-guide' }
];
