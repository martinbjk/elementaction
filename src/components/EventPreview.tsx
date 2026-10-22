'use client';

import type { ElementEvent } from '@/lib/schema';
import type { SectionId } from '@/lib/sections';
import { useLiveNow } from '@/lib/useLiveNow';
import { EventItem } from './EventItem';

/** Kort lista med de närmaste eventen (översikt och startsida). */
export function EventPreview({ events, section, buildTime }: { events: ElementEvent[]; section: SectionId; buildTime: string }) {
  const now = useLiveNow(buildTime);
  return (
    <ul className="grid gap-3">
      {events.map((e) => (
        <li key={e.slug}>
          <EventItem event={e} section={section} now={now} />
        </li>
      ))}
    </ul>
  );
}
