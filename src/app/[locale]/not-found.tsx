import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-surf text-6xl text-white">{t('title')}</h1>
      <p className="mt-4 text-white/70">{t('body')}</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black">
        {t('home')}
      </Link>
    </div>
  );
}
