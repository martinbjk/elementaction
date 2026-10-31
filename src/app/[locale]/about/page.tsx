import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { InfoPage } from '@/components/InfoPage';
import { CoffeeButton } from '@/components/CoffeeButton';

const ISSUES_URL = 'https://github.com/martinbjk/elementaction/issues';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('p1'), alternates: localeAlternates(locale, 'about/') };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <InfoPage title={t('about.title')}>
      <p>{t('about.p1')}</p>
      <p>{t('about.p2')}</p>
      <p>{t('about.p3')}</p>
      <p>{t('about.p4')}</p>
      <h2>{t('support.title')}</h2>
      <p>{t('support.body')}</p>
      <p>
        <CoffeeButton label={t('support.cta')} />
      </p>
      <p className="muted">{t('support.note')}</p>
      <h2>{t('about.contactTitle')}</h2>
      <p>{t('about.contactBody')}</p>
      <p>
        <a href={ISSUES_URL} target="_blank" rel="noreferrer noopener">
          {t('about.contactCta')}
        </a>
      </p>
      <p className="muted">
        <Link href="/privacy">{t('privacy.title')}</Link>
      </p>
    </InfoPage>
  );
}
