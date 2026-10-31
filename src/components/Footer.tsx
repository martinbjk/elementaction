import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SECTIONS, TABS } from '@/lib/sections';
import { Logo } from './Logo';
import { CoffeeButton } from './CoffeeButton';

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0e0f11] text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo size={56} />
          <p className="mt-4 text-sm leading-relaxed">{t('footer.tagline')}</p>
          <p className="mt-3 text-sm leading-relaxed">
            <a href="https://skateboardeventcalendar.com" className="underline decoration-white/30 underline-offset-4 hover:text-white">
              {t('footer.legacy')}
            </a>
          </p>
          <CoffeeButton label={t('support.cta')} className="mt-5" />
        </div>
        {SECTIONS.map((s) => (
          <div key={s}>
            <Link href={`/${s}`} className="font-semibold text-white hover:underline">
              {t(`sections.${s}.name`)}
            </Link>
            <ul className="mt-3 space-y-2 text-sm">
              {TABS.map((tab) => (
                <li key={tab}>
                  <Link href={`/${s}/${tab}`} className="hover:text-white">
                    {t(`tabs.${tab}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 pb-10 text-sm text-white/55 sm:px-6">
        <Link href="/about" className="hover:text-white">
          {t('nav.about')}
        </Link>
        <Link href="/privacy" className="hover:text-white">
          {t('nav.privacy')}
        </Link>
        <span className="text-xs text-white/40">
          © {year} Elementaction. {t('footer.rights')}
        </span>
      </div>
    </footer>
  );
}
