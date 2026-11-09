import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { SiteSearch } from '@/components/SiteSearch';

/** Söksidan. Själva sökningen sker i webbläsaren med Pagefind (se SiteSearch). */
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'search' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: localeAlternates(locale, 'search/'),
    robots: { index: false, follow: true }
  };
}

export default async function SearchPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'search' });
  return (
    // Samma ram som InfoPage, men utan info-prose (den stilen skulle krocka med sökresultatens listor).
    <div data-section="home" className="surface-home text-white">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">{t('title')}</h1>
        <p className="mt-4 text-white/75">{t('lead')}</p>
        <div className="mt-8">
          <SiteSearch />
        </div>
      </div>
    </div>
  );
}
