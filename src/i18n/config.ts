/**
 * Språk på elementaction.com — samma sju som skateboardeventcalendar.com.
 *
 * Lägga till ett språk senare:
 *  1. Lägg till koden i `locales` nedan.
 *  2. Skapa messages/<kod>.json (kopiera messages/en.json som mall).
 *  3. Lägg till namnet i LOCALE_LABELS (nedan).
 *  4. Lägg till koden i LOCALES-listan i scripts/fix-html-lang.mjs.
 * Routing, sitemap och hreflang plockar upp nya språk automatiskt.
 */
export const locales = ['sv', 'en', 'de', 'fr', 'es', 'pt', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  sv: 'Svenska',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  ja: '日本語'
};
