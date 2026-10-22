'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { TABS, type SectionId } from '@/lib/sections';

/**
 * Flikraden inne i en sektion. Ligger klistrad under toppen när man
 * scrollar, så att kalender/artiklar/design/videos alltid är ett klick bort.
 */
export function SectionTabs({ section }: { section: SectionId }) {
  const t = useTranslations('tabs');
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  const current = parts[1] ?? 'overview';
  const items = [{ id: 'overview', href: `/${section}` }, ...TABS.map((id) => ({ id, href: `/${section}/${id}` }))];

  return (
    <nav className="sticky top-16 z-30 border-b border-sec-line/15 bg-sec-bg/90 backdrop-blur" aria-label={t('overview')}>
      <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
        {items.map(({ id, href }) => (
          <li key={id} className="shrink-0">
            <Link
              href={href}
              aria-current={current === id ? 'page' : undefined}
              className="relative block px-3.5 py-3.5 text-[15px] text-sec-muted transition hover:text-sec-ink aria-[current=page]:font-semibold aria-[current=page]:text-sec-ink"
            >
              {t(id)}
              {current === id && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-sec-accent" />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
