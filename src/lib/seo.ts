import { locales, defaultLocale } from '@/i18n/config';
import { SITE_URL } from './site';

/**
 * canonical + hreflang för en sida. `path` är sökvägen efter språket,
 * med avslutande snedstreck (t.ex. "surfing/calendar/"), eller "" för
 * startsidan. Varje språkversion pekar på sig själv som canonical och
 * på alla sju språk + x-default som alternativ — samma upplägg som
 * löste indexeringsproblemet på skateboardeventcalendar.com.
 */
export function localeAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE_URL}/${l}/${path}`;
  languages['x-default'] = `${SITE_URL}/${defaultLocale}/${path}`;
  return { canonical: `${SITE_URL}/${locale}/${path}`, languages };
}
