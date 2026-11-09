'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { SECTIONS, SECTION_COLORS, type SectionId } from '@/lib/sections';
import { Logo, SectionMark } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Search, Wrench } from 'lucide-react';

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
        <Link href="/" aria-label="Elementaction" className="shrink-0">
          <Logo size={40} />
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
                    <SectionMark section={s} size={18} />
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

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/tools"
            title={t('nav.tools')}
            className="flex h-10 items-center gap-2 rounded-full px-2.5 text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Wrench size={19} aria-hidden />
            <span className="hidden text-[15px] lg:inline">{t('nav.tools')}</span>
            <span className="sr-only lg:hidden">{t('nav.tools')}</span>
          </Link>
          <Link
            href="/search"
            aria-label={t('nav.search')}
            title={t('nav.search')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Search size={20} aria-hidden />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
