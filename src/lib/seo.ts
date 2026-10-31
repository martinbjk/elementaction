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

/**
 * canonical + hreflang för en artikel. Artiklar finns bara på vissa språk
 * (oftast bara engelska); på övriga språk visas den engelska texten som
 * reserv. Reservsidorna pekar på den riktiga versionen som canonical, och
 * hreflang listar bara de språk som verkligen finns, så att Google inte ser
 * sex kopior av samma text.
 */
export function articleAlternates(locale: string, path: string, available: string[]) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[l] = `${SITE_URL}/${l}/${path}`;
  const main = available.includes(defaultLocale) ? defaultLocale : available[0];
  languages['x-default'] = `${SITE_URL}/${main}/${path}`;
  const canonicalLocale = available.includes(locale) ? locale : main;
  return { canonical: `${SITE_URL}/${canonicalLocale}/${path}`, languages };
}
