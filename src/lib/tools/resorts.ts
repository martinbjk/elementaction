/**
 * RESORTFINNAREN — data.
 *
 * Exakt samma siffror som i artikeln content/articles/snowboard/en/
 * snowboard-resort-guide.md (källor listas där). Ändras en siffra i
 * artikeln ska den ändras här också, och tvärtom.
 *
 * Siffrorna gäller hela det sammanlänkade liftsystemet. `top` = högsta
 * liftburna punkt i meter. `null` = ingen tillförlitlig siffra hittades.
 * Flaggorna sätts BARA när artikeln/källan uttryckligen nämner saken.
 * `summer` = går att åka under juni–augusti (glaciär i norr, eller vinter
 * på södra halvklotet som Cardrona).
 */
export type ResortRegion = 'france' | 'switzerland' | 'austria' | 'europe' | 'northAmerica' | 'asiaPacific';

export interface Resort {
  name: string;
  country: string;
  region: ResortRegion;
  top: number | null;
  /** Pister: km i Europa, "acres"/"ha"/"trails" utanför (visas som text). */
  terrain: string;
  pisteKm: number | null;
  lifts: number | null;
  season: { sv: string; en: string } | null;
  halfpipe: boolean;
  glacier: boolean;
  summer: boolean;
  park: boolean;
  freeride: boolean;
  knownFor: { sv: string; en: string };
}

const s = (sv: string, en: string) => ({ sv, en });

export const RESORTS: Resort[] = [
  { name: 'Chamonix (Grands Montets)', country: 'France', region: 'france', top: 2765, terrain: '29 km', pisteKm: 29, lifts: 8,
    season: s('28 nov 2026 – 2 maj 2027', '28 Nov 2026 – 2 May 2027'), halfpipe: false, glacier: true, summer: false, park: false, freeride: true,
    knownFor: s('Freeride och glaciärterräng', 'Freeride, glacier terrain') },
  { name: 'La Plagne (Paradiski)', country: 'France', region: 'france', top: 3250, terrain: '225 km', pisteKm: 225, lifts: null,
    season: null, halfpipe: false, glacier: true, summer: false, park: false, freeride: false,
    knownFor: s('Stort sammanlänkat område', 'Big linked area') },
  { name: 'Les Arcs (Paradiski)', country: 'France', region: 'france', top: 3226, terrain: '200 km', pisteKm: 200, lifts: 52,
    season: s('12 dec 2026 – 25 apr 2027', '12 Dec 2026 – 25 Apr 2027'), halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Freestylepark, över 2 000 m fallhöjd', 'Freestyle park, over 2,000 m vertical') },
  { name: 'Les Deux Alpes', country: 'France', region: 'france', top: 3600, terrain: '~220 km', pisteKm: 220, lifts: null,
    season: s('Vinter + sommar på glaciären (juni–sep)', 'Winter + summer on the glacier (Jun–Sep)'), halfpipe: true, glacier: true, summer: true, park: true, freeride: false,
    knownFor: s('Europas största åkbara glaciär, sommarpark', "Europe's largest skiable glacier, summer park") },
  { name: 'Méribel / Val Thorens (3 Vallées)', country: 'France', region: 'france', top: 3230, terrain: '600 km', pisteKm: 600, lifts: 159,
    season: s('21 nov 2026 – 2 maj 2027', '21 Nov 2026 – 2 May 2027'), halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Störst i guiden, flera parker', 'Largest in the guide, several parks') },
  { name: 'Morzine / Avoriaz (Portes du Soleil)', country: 'France / Switzerland', region: 'france', top: 2254, terrain: '580 km', pisteKm: 580, lifts: 163,
    season: s('11 dec 2026 – 18 apr 2027', '11 Dec 2026 – 18 Apr 2027'), halfpipe: true, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Freestylehistoria, låg höjd', 'Freestyle history, low altitude') },
  { name: "Tignes / Val d'Isère", country: 'France', region: 'france', top: 3456, terrain: '300 km', pisteKm: 300, lifts: 80,
    season: s('Sen nov – början av maj, glaciären även mitten juni – mitten aug', 'Late Nov – early May, glacier also mid-Jun – mid-Aug'), halfpipe: true, glacier: true, summer: true, park: true, freeride: false,
    knownFor: s('Halfpipe, airbag, glaciär', 'Halfpipe, airbag, glacier') },
  { name: 'Laax', country: 'Switzerland', region: 'switzerland', top: 3018, terrain: '224 km', pisteKm: 224, lifts: 35,
    season: null, halfpipe: true, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Superpipe, fyra parker, inomhusakademi', 'Superpipe, four parks, indoor academy') },
  { name: 'Saas-Fee', country: 'Switzerland', region: 'switzerland', top: 3573, terrain: '101 km', pisteKm: 101, lifts: 23,
    season: s('18 jul 2026 – 18 apr 2027', '18 Jul 2026 – 18 Apr 2027'), halfpipe: false, glacier: true, summer: true, park: true, freeride: false,
    knownFor: s('Sommarpark på glaciären, bilfri by', 'Summer glacier park, car-free village') },
  { name: 'Verbier (4 Vallées)', country: 'Switzerland', region: 'switzerland', top: 3330, terrain: '412 km', pisteKm: 412, lifts: 65,
    season: s('7 nov 2026 – 25 apr 2027', '7 Nov 2026 – 25 Apr 2027'), halfpipe: false, glacier: false, summer: false, park: true, freeride: true,
    knownFor: s('Freeride, Xtreme Verbier', 'Freeride, Xtreme Verbier') },
  { name: 'Zermatt / Cervinia', country: 'Switzerland / Italy', region: 'switzerland', top: 3899, terrain: '322 km', pisteKm: 322, lifts: 51,
    season: s('Hela året', 'All year'), halfpipe: false, glacier: true, summer: true, park: true, freeride: false,
    knownFor: s('Högst i Europa i guiden, öppet hela året', 'Highest in Europe in this guide, open all year') },
  { name: 'Damüls-Mellau', country: 'Austria', region: 'austria', top: 2050, terrain: '76 km', pisteKm: 76, lifts: 21,
    season: s('Början av dec – mitten av apr', 'Early Dec – mid-Apr'), halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Snösäkerhet', 'Snow reliability') },
  { name: 'Mayrhofen', country: 'Austria', region: 'austria', top: 2500, terrain: '142 km', pisteKm: 142, lifts: 23,
    season: null, halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('PenkenPark, Snowbombing', 'PenkenPark, Snowbombing') },
  { name: 'St Anton (Ski Arlberg)', country: 'Austria', region: 'austria', top: 2811, terrain: '300 km', pisteKm: 300, lifts: 85,
    season: s('2 dec 2026 – 18 apr 2027', '2 Dec 2026 – 18 Apr 2027'), halfpipe: false, glacier: false, summer: false, park: true, freeride: true,
    knownFor: s('Offpist och afterski', 'Off-piste, après-ski') },
  { name: 'Courmayeur', country: 'Italy', region: 'europe', top: 2755, terrain: '42 km', pisteKm: 42, lifts: null,
    season: null, halfpipe: false, glacier: false, summer: false, park: false, freeride: true,
    knownFor: s('Freeride under Mont Blanc', 'Mont Blanc freeride') },
  { name: 'Grandvalira', country: 'Andorra', region: 'europe', top: 2640, terrain: '215 km', pisteKm: 215, lifts: 75,
    season: s('5 dec 2026 – 4 apr 2027', '5 Dec 2026 – 4 Apr 2027'), halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Prisvärt, två parker', 'Value, two parks') },
  { name: 'Trysil', country: 'Norway', region: 'europe', top: null, terrain: '70 km', pisteKm: 70, lifts: 31,
    season: null, halfpipe: false, glacier: false, summer: false, park: false, freeride: false,
    knownFor: s('Norges största, nära Sverige', "Norway's largest, close to Sweden") },
  { name: 'Jasná', country: 'Slovakia', region: 'europe', top: 2024, terrain: '34 km', pisteKm: 34, lifts: 25,
    season: null, halfpipe: false, glacier: false, summer: false, park: true, freeride: true,
    knownFor: s('Branta couloirer, låga priser', 'Couloirs, low prices') },
  { name: 'Breckenridge', country: 'USA', region: 'northAmerica', top: 3962, terrain: '2,908 acres', pisteKm: null, lifts: 35,
    season: null, halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Parker, hög höjd', 'Parks, altitude') },
  { name: 'Mammoth Mountain', country: 'USA', region: 'northAmerica', top: 3369, terrain: '3,500 acres', pisteKm: null, lifts: 25,
    season: s('Oftast nov – maj', 'Usually Nov – May'), halfpipe: false, glacier: false, summer: false, park: true, freeride: false,
    knownFor: s('Åtta parker, lång säsong', 'Eight parks, long season') },
  { name: 'Whistler Blackcomb', country: 'Canada', region: 'northAmerica', top: 2240, terrain: '8,171 acres', pisteKm: null, lifts: 34,
    season: s('Sen nov – maj', 'Late Nov – May'), halfpipe: false, glacier: false, summer: false, park: false, freeride: false,
    knownFor: s('Storlek och snö', 'Size, snow') },
  { name: 'Sun Peaks', country: 'Canada', region: 'northAmerica', top: null, terrain: '4,270 acres', pisteKm: null, lifts: null,
    season: null, halfpipe: false, glacier: false, summer: false, park: false, freeride: false,
    knownFor: s('Gott om plats, få köer', 'Space, few crowds') },
  { name: 'Niseko United', country: 'Japan', region: 'asiaPacific', top: 1308, terrain: '73 trails', pisteKm: null, lifts: 30,
    season: s('Sen nov – början av maj', 'Late Nov – early May'), halfpipe: false, glacier: false, summer: false, park: false, freeride: true,
    knownFor: s('Puder, gate-system för offpist', 'Powder, gate system for off-piste') },
  { name: 'Cardrona', country: 'New Zealand', region: 'asiaPacific', top: null, terrain: '615 ha', pisteKm: null, lifts: 9,
    season: s('Juni – oktober (södra halvklotets vinter)', 'June – October (southern winter)'), halfpipe: true, glacier: false, summer: true, park: true, freeride: false,
    knownFor: s('Halfpipes när det är sommar i Europa', 'Halfpipes during the European summer') }
];
