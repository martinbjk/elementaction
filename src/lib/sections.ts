/**
 * SEKTIONERNA — den enda platsen där de fyra blocken definieras.
 *
 * Varje sektion har samma fyra flikar (kalender, artiklar, design, videos)
 * men sin egen färg, typsnitt och bildvärld (se globals.css,
 * [data-section="…"]). Lägger du till en femte sektion senare: lägg till
 * den här, i messages/*.json (sections.<id>) och i globals.css.
 */
export const SECTIONS = ['surfing', 'skateboard', 'snowboard', 'inspiration'] as const;
export type SectionId = (typeof SECTIONS)[number];

export const TABS = ['calendar', 'articles', 'design', 'videos'] as const;
export type TabId = (typeof TABS)[number];

export function isSection(value: string): value is SectionId {
  return (SECTIONS as readonly string[]).includes(value);
}

/**
 * Tillåtna eventkategorier per sektion. Kalenderns filterknappar och
 * valideringen av data/events/<sektion>/*.json använder denna lista.
 * Översättningarna ligger i messages/*.json under "category".
 */
export const SECTION_CATEGORIES: Record<SectionId, readonly string[]> = {
  skateboard: ['street', 'park', 'vert', 'bowl', 'freestyle', 'downhill', 'slalom', 'demo', 'contest'],
  surfing: ['shortboard', 'longboard', 'bigwave', 'wavepool', 'bodyboard', 'sup', 'festival', 'contest'],
  snowboard: ['halfpipe', 'slopestyle', 'bigair', 'boardercross', 'parallel', 'freeride', 'rail', 'festival', 'contest'],
  inspiration: ['exhibition', 'design', 'photography', 'travel', 'festival', 'fair', 'workshop']
};

/** Färg per sektion — samma värden som i globals.css, för SVG/inline-bruk. */
export const SECTION_COLORS: Record<SectionId, { main: string; ink: string }> = {
  surfing: { main: '#0047bb', ink: '#06213f' }, // Pantone 2728 C (ungefär)
  skateboard: { main: '#8a8f94', ink: '#1c1d1f' },
  snowboard: { main: '#f5f8fb', ink: '#0d2240' },
  inspiration: { main: '#44d62c', ink: '#0b2a08' } // Pantone 802 C (ungefär)
};

/** Statiska params för sidor under /[section] (krävs per sida av statisk export i `next dev`). */
export function sectionParams() {
  return SECTIONS.map((section) => ({ section }));
}
