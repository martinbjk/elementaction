import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection } from '@/lib/sections';
import { getEvents } from '@/lib/events';
import { localeAlternates } from '@/lib/seo';
import { CalendarExplorer } from '@/components/CalendarExplorer';
import { BlockHeader, EmptyState } from '@/components/Blocks';

type Params = { params: { locale: string; section: string } };

export const generateStaticParams = sectionParams;

export async function generateMetadata({ params: { locale, section } }: Params): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const name = t(`sections.${section}.name`);
  return { title: t('calendar.title', { section: name }), description: t(`sections.${section}.intro`), alternates: localeAlternates(locale, `${section}/calendar/`) };
}

export default async function CalendarPage({ params: { locale, section } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) return null;
  const t = await getTranslations({ locale });
  const name = t(`sections.${section}.name`);
  const events = getEvents(section);

  return (
    <div>
      <BlockHeader title={t('calendar.title', { section: name })} />
      <div className="mt-8">
        {events.length ? (
          <CalendarExplorer events={events} section={section} buildTime={new Date().toISOString()} />
        ) : (
          <EmptyState title={t('calendar.emptyTitle')} body={t('calendar.emptyBody', { section: name })} />
        )}
      </div>
    </div>
  );
}
