'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, LOCALE_LABELS, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';

/**
 * Byter språk men stannar på samma sida. Valet sparas i localStorage
 * så att rotsidan (src/app/page.tsx) minns det vid nästa besök.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();

  function change(next: string) {
    try {
      window.localStorage.setItem('preferred-locale', next);
    } catch {
      /* localStorage kan vara blockerat — språkbytet fungerar ändå */
    }
    router.replace(pathname, { locale: next as Locale });
  }

  return (
    <label className="relative inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/85 transition hover:border-white/40">
      <Globe size={15} aria-hidden />
      <span className="sr-only">{t('language')}</span>
      <select
        value={locale}
        onChange={(e) => change(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="bg-neutral-900 text-white">
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
