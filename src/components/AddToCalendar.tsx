'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarPlus, ChevronDown } from 'lucide-react';
import type { ElementEvent as SkateEvent } from '@/lib/schema';
import { buildGoogleCalendarUrl, buildIcs } from '@/lib/date';

export function AddToCalendar({ event }: { event: SkateEvent }) {
  const t = useTranslations('event');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function downloadIcs() {
    const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-sec-accent px-5 py-2.5 text-sm font-semibold text-sec-accent-ink transition hover:brightness-110"
      >
        <CalendarPlus size={15} />
        {t('addToCalendar')}
        <ChevronDown size={13} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 w-52 overflow-hidden rounded-xl border border-sec-line/20 bg-sec-card text-sec-ink shadow-lg">
          <a
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer noopener"
            className="block px-4 py-2.5 text-sm hover:bg-sec-accent/15"
          >
            {t('addToGoogle')}
          </a>
          <button
            type="button"
            onClick={downloadIcs}
            className="block w-full px-4 py-2.5 text-left text-sm hover:bg-sec-accent/15"
          >
            {t('downloadIcs')}
          </button>
        </div>
      )}
    </div>
  );
}
