'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SECTIONS, SECTION_COLORS } from '@/lib/sections';
import { LogoMark } from './Logo';
import { useActiveSection } from './Header';

/**
 * Mobil navigering: fast rad i botten med hem + de fyra sektionerna,
 * så att man alltid är ett tumtryck från nästa element. Döljs från md.
 */
export function BottomNav() {
  const t = useTranslations();
  const active = useActiveSection();

  return (
    <nav
      aria-label={t('nav.sections')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0e0f11]/95 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur md:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        <li>
          <Link href="/" className="flex h-full flex-col items-center justify-center gap-1 text-[11px] text-white/70">
            <LogoMark size={20} />
            {t('nav.home')}
          </Link>
        </li>
        {SECTIONS.map((s) => (
          <li key={s}>
            <Link
              href={`/${s}`}
              aria-current={s === active ? 'page' : undefined}
              className="relative flex h-full flex-col items-center justify-center gap-1 text-[11px] text-white/70 aria-[current=page]:text-white"
            >
              <span
                className="h-5 w-5 rounded-md ring-1 ring-white/30"
                style={{ background: SECTION_COLORS[s].main }}
                aria-hidden
              />
              <span className="max-w-full truncate px-1">{t(`sections.${s}.name`)}</span>
              {s === active && (
                <span className="absolute inset-x-4 top-0 h-[3px] rounded-b" style={{ background: SECTION_COLORS[s].main }} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
