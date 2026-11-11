/**
 * VERKTYGSLISTAN — en plats för alla verktyg på /tools.
 * `page`: verktyg med egen sida under /tools/<slug>.
 * `article`: verktyg som ligger inbäddade i en artikel (länkas dit).
 * `key` pekar på texten i messages/*.json → tools.items.<key>.
 */
export type ToolKey = 'vol' | 'season' | 'resort' | 'sbsize' | 'wetsuit' | 'parkjudge' | 'parks' | 'pools' | 'norway' | 'sweden' | 'swell';

export type ToolGroup = 'surf' | 'skate' | 'snow' | 'travel';

export interface ToolEntry {
  key: ToolKey;
  href: string;
  /** page = egen verktygssida, article = inbäddat i en artikel, external = egen app på annan adress. */
  kind: 'page' | 'article' | 'external';
  group: ToolGroup;
  color: string;
}

export const TOOL_GROUPS: ToolGroup[] = ['surf', 'skate', 'snow', 'travel'];

export const TOOL_PAGES = {
  vol: 'surfboard-volume',
  season: 'season-guide',
  resort: 'resort-finder',
  sbsize: 'snowboard-size',
  wetsuit: 'wetsuit-guide'
} as const;

export const TOOLS: ToolEntry[] = [
  // Surf
  { key: 'vol', href: `/tools/${TOOL_PAGES.vol}`, kind: 'page', group: 'surf', color: '#3b8eea' },
  { key: 'wetsuit', href: `/tools/${TOOL_PAGES.wetsuit}`, kind: 'page', group: 'surf', color: '#3b8eea' },
  { key: 'pools', href: '/surfing/articles/surfable-wave-pools-world', kind: 'article', group: 'surf', color: '#3b8eea' },
  { key: 'swell', href: '/surfing/articles/surf-forecast-sites-and-buoys-guide', kind: 'article', group: 'surf', color: '#3b8eea' },
  { key: 'sweden', href: '/surfing/articles/cold-water-surf-spots-sweden-denmark', kind: 'article', group: 'surf', color: '#3b8eea' },
  { key: 'norway', href: '/surfing/articles/cold-water-surf-spots-norway', kind: 'article', group: 'surf', color: '#3b8eea' },
  // Skateboard
  { key: 'parkjudge', href: 'https://park-judge.vercel.app/', kind: 'external', group: 'skate', color: '#e0242f' },
  { key: 'parks', href: '/skateboard/articles/verified-indoor-skateparks-world', kind: 'article', group: 'skate', color: '#e0242f' },
  // Snowboard
  { key: 'sbsize', href: `/tools/${TOOL_PAGES.sbsize}`, kind: 'page', group: 'snow', color: '#5cb6ff' },
  { key: 'resort', href: `/tools/${TOOL_PAGES.resort}`, kind: 'page', group: 'snow', color: '#5cb6ff' },
  // Resor
  { key: 'season', href: `/tools/${TOOL_PAGES.season}`, kind: 'page', group: 'travel', color: '#44d62c' }
];
