/**
 * VERKTYGSLISTAN — en plats för alla verktyg på /tools.
 * `page`: verktyg med egen sida under /tools/<slug>.
 * `article`: verktyg som ligger inbäddade i en artikel (länkas dit).
 * `key` pekar på texten i messages/*.json → tools.items.<key>.
 */
export type ToolKey = 'vol' | 'season' | 'resort' | 'sbsize' | 'wetsuit' | 'parks' | 'pools' | 'norway' | 'sweden' | 'swell';

export interface ToolEntry {
  key: ToolKey;
  href: string;
  kind: 'page' | 'article';
  color: string;
}

export const TOOL_PAGES = {
  vol: 'surfboard-volume',
  season: 'season-guide',
  resort: 'resort-finder',
  sbsize: 'snowboard-size',
  wetsuit: 'wetsuit-guide'
} as const;

export const TOOLS: ToolEntry[] = [
  { key: 'vol', href: `/tools/${TOOL_PAGES.vol}`, kind: 'page', color: '#3b8eea' },
  { key: 'season', href: `/tools/${TOOL_PAGES.season}`, kind: 'page', color: '#44d62c' },
  { key: 'resort', href: `/tools/${TOOL_PAGES.resort}`, kind: 'page', color: '#5cb6ff' },
  { key: 'sbsize', href: `/tools/${TOOL_PAGES.sbsize}`, kind: 'page', color: '#5cb6ff' },
  { key: 'wetsuit', href: `/tools/${TOOL_PAGES.wetsuit}`, kind: 'page', color: '#3b8eea' },
  { key: 'parks', href: '/skateboard/articles/verified-indoor-skateparks-world', kind: 'article', color: '#e0242f' },
  { key: 'pools', href: '/surfing/articles/surfable-wave-pools-world', kind: 'article', color: '#3b8eea' },
  { key: 'swell', href: '/surfing/articles/surf-forecast-sites-and-buoys-guide', kind: 'article', color: '#3b8eea' },
  { key: 'sweden', href: '/surfing/articles/cold-water-surf-spots-sweden-denmark', kind: 'article', color: '#3b8eea' },
  { key: 'norway', href: '/surfing/articles/cold-water-surf-spots-norway', kind: 'article', color: '#3b8eea' }
];
