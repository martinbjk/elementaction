import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { locales } from '@/i18n/config';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('siteTitle'), template: `%s | ${t('siteName')}` },
    description: t('siteDescription'),
    // Appikon: manifestet gör att sajten kan läggas på hemskärmen som en app.
    manifest: '/manifest.webmanifest',
    // Favicon: Google visar den i sökresultaten. Den vill ha favicon.ico eller
    // en bild i en multipel av 48 px; webbläsare tar helst SVG:n.
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/brand/icon.svg', type: 'image/svg+xml' }
      ],
      apple: '/brand/apple-touch-icon.png'
    },
    appleWebApp: { capable: true, title: 'Elementaction', statusBarStyle: 'black' },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: `${SITE_URL}/${locale}/`,
      siteName: t('siteName'),
      type: 'website',
      locale,
      images: [{ url: `${SITE_URL}/brand/og-image.png`, width: 1200, height: 630, alt: t('siteName') }]
    },
    twitter: { card: 'summary_large_image', title: t('siteTitle'), description: t('siteDescription'), images: [`${SITE_URL}/brand/og-image.png`] },
    alternates: localeAlternates(locale, '')
  };
}

export const viewport: Viewport = { themeColor: '#0e0f11' };

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
      <BottomNav />
    </NextIntlClientProvider>
  );
}
