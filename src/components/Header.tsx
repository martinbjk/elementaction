'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { SECTIONS, SECTION_COLORS, type SectionId } from '@/lib/sections';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Vilken sektion besökaren är i, utifrån sökvägen (/surfing/... osv). */
export function useActiveSection(): SectionId | null {
  const pathname = usePathname();
  const first = pathname.split('/').filter(Boolean)[0];
  return (SECTIONS as readonly string[]).includes(first ?? '') ? (first as SectionId) : null;
}

/**
 * Toppen är alltid grafitsvart, oavsett sektion — den är "ramen" runt
 * de fyra världarna. Aktiv sektion markeras med sin egen färg under länken.
 */
export function Header() {
  const t = useTranslations();
  const active = useActiveSection();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0e0f11]/90 text-white backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-white focus:px-3 focus:py-1 focus:text-black"
      >
        {t('nav.skip')}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="ElementAction" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t('nav.sections')} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => {
              const isActive = s === active;
              return (
                <li key={s}>
                  <Link
                    href={`/${s}`}
                    aria-current={isActive ? 'page' : undefined}
                    className="group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[15px] text-white/75 transition hover:text-white aria-[current=page]:text-white"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full ring-1 ring-white/30"
                      style={{ background: SECTION_COLORS[s].main }}
                      aria-hidden
                    />
                    {t(`sections.${s}.name`)}
                    <span
                      className="absolute inset-x-3.5 -bottom-[13px] h-[3px] origin-left scale-x-0 rounded-full transition group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                      style={{ background: SECTION_COLORS[s].main }}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
