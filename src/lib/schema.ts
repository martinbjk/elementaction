import { z } from 'zod';

/**
 * Datastruktur för ett event, gemensam för alla fyra sektioner.
 * Filerna ligger i data/events/<sektion>/<slug>.json. Formatet är
 * exakt samma som på skateboardeventcalendar.com, så eventfiler kan
 * kopieras rakt över. Den enda skillnaden: `category` valideras mot
 * sektionens egen lista (src/lib/sections.ts) i stället för en fast lista.
 */

export const EventLevel = z.enum(['amateur', 'pro', 'open', 'youth']);
export type EventLevel = z.infer<typeof EventLevel>;

export const LocalizedText = z.object({
  sv: z.string().min(1),
  en: z.string().min(1)
});
export type LocalizedText = z.infer<typeof LocalizedText>;

export const EventSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug får bara innehålla a-z, 0-9 och bindestreck'),
  name: z.string().min(1),
  series: z.string().optional(),
  category: z.array(z.string().min(1)).min(1),
  level: EventLevel,
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
  timezone: z.string().min(1),
  location: z.object({
    venue: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    countryCode: z.string().length(2),
    continent: z.enum(['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania']),
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional()
  }),
  description: LocalizedText,
  officialUrl: z.string().url().optional(),
  registrationUrl: z.string().url().optional(),
  ticketsUrl: z.string().url().optional(),
  image: z.string().optional(),
  organizer: z.string().optional(),
  disciplines: z.array(z.string()).optional(),
  statusOverride: z.enum(['cancelled', 'postponed']).optional(),
  source: z
    .object({
      note: z.string().optional(),
      url: z.string().url().optional(),
      retrievedAt: z.string().datetime({ offset: true }).optional()
    })
    .optional(),
  submittedBy: z.string().optional()
});

export type ElementEvent = z.infer<typeof EventSchema>;
/** Gammalt namn, kvar så att kod från skateboardeventcalendar fungerar oförändrad. */
export type SkateEvent = ElementEvent;
