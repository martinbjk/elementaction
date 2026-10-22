import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { SECTIONS, isSection } from '@/lib/sections';
import { SectionHero } from '@/components/SectionHero';
import { SectionTabs } from '@/components/SectionTabs';


export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

/**
 * Ramen för varje sektion. data-section byter ALLA sec-*-färger och
 * rubrikfonten för allt innehåll därunder (se globals.css).
 */
export default function SectionLayout({ children, params: { locale, section } }: { children: ReactNode; params: { locale: string; section: string } }) {
  if (!isSection(section)) notFound();
  setRequestLocale(locale);
  return (
    <div data-section={section} className={`surface-${section} min-h-[70vh] text-sec-ink`}>
      <SectionHero section={section} locale={locale} />
      <SectionTabs section={section} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">{children}</div>
    </div>
  );
}
