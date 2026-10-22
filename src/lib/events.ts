import fs from 'node:fs';
import path from 'node:path';
import { EventSchema, type ElementEvent } from './schema';
import { SECTIONS, SECTION_CATEGORIES, type SectionId } from './sections';

export * from './events-shared';

const EVENTS_DIR = path.join(process.cwd(), 'data', 'events');

/**
 * SERVER-ONLY. Läser data/events/<sektion>/*.json, validerar mot
 * EventSchema + sektionens kategorilista och returnerar sorterat
 * (tidigast först). Ett fel stoppar bygget med filnamnet i meddelandet,
 * hellre än att trasig data publiceras.
 */
export function validateEventFile(section: SectionId, file: string): ElementEvent {
  const rel = `data/events/${section}/${file}`;
  const raw = fs.readFileSync(path.join(EVENTS_DIR, section, file), 'utf-8');
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Ogiltig JSON i ${rel}: ${(err as Error).message}`);
  }
  const result = EventSchema.safeParse(json);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Schema-fel i ${rel}:\n${issues}`);
  }
  if (result.data.slug !== file.replace(/\.json$/, '')) {
    throw new Error(`${rel}: "slug" (${result.data.slug}) matchar inte filnamnet.`);
  }
  const allowed = SECTION_CATEGORIES[section];
  const bad = result.data.category.filter((c) => !allowed.includes(c));
  if (bad.length) {
    throw new Error(`${rel}: okänd kategori ${bad.join(', ')} — tillåtna för ${section}: ${allowed.join(', ')}`);
  }
  return result.data;
}

export function listEventFiles(section: SectionId): string[] {
  const dir = path.join(EVENTS_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
}

const cache = new Map<SectionId, ElementEvent[]>();

export function getEvents(section: SectionId): ElementEvent[] {
  const hit = cache.get(section);
  if (hit) return hit;
  const events = listEventFiles(section)
    .map((f) => validateEventFile(section, f))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  cache.set(section, events);
  return events;
}

export function getEvent(section: SectionId, slug: string): ElementEvent | undefined {
  return getEvents(section).find((e) => e.slug === slug);
}

/** Kommande + pågående event, tidigast först. */
export function getUpcomingEvents(section: SectionId, now = new Date()): ElementEvent[] {
  return getEvents(section).filter((e) => new Date(e.endDate).getTime() >= now.getTime());
}

export function countAllEvents(): Record<SectionId, number> {
  return Object.fromEntries(SECTIONS.map((s) => [s, getEvents(s).length])) as Record<SectionId, number>;
}
