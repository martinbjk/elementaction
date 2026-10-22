import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { sectionParams, isSection, type SectionId } from '@/lib/sections';
import { getUpcomingEvents } from '@/lib/events';
import { getArticles } from '@/lib/articles';
import { getDesignWall } from '@/lib/design-wall';
import { localeAlternates } from '@/lib/seo';
import { videos } from '@/data/videos';
import { ArticleCard, BlockHeader, DesignWall, EmptyState } from '@/components/Blocks';
import { EventPreview } from '@/components/EventPreview';
import { VideoGrid } from '@/components/VideoGrid';

type Params = { params: { locale: string; section: string } };

export const generateStaticParams = sectionParams;

export async function generateMetadata({ params: { locale, section } }: Params): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `sections.${section}` });
  return { title: `${t('name')} — ${t('tagline')}`, description: t('intro'), alternates: localeAlternates(locale, `${section}/`) };
}

/**
 * Sektionens översikt: ett smakprov från varje flik, i samma ordning
 * som flikraden (kalender, artiklar, design, videos).
 */
export default async function SectionOverview({ params: { locale, section } }: Params) {
  setRequestLocale(locale);
  if (!isSection(section)) return null;
  const s = section as SectionId;
  const t = await getTranslations({ locale });
  const name = t(`sections.${s}.name`);
  const buildTime = new Date().toISOString();

  const events = getUpcomingEvents(s).slice(0, 4);
  const articles = getArticles(s, locale).slice(0, 3);
  const design = getDesignWall(s, locale).slice(0, 3);
  const vids = videos[s];

  return (
    <div className="space-y-20">
      <p className="max-w-2xl text-xl leading-relaxed text-sec-ink/90">{t(`sections.${s}.intro`)}</p>

      <section>
        <BlockHeader title={t('tabs.calendar')} href={`/${s}/calendar`} linkText={t('calendar.seeAll')} />
        <div className="mt-6">
          {events.length ? (
            <EventPreview events={events} section={s} buildTime={buildTime} />
          ) : (
            <EmptyState title={t('calendar.emptyTitle')} body={t('calendar.emptyBody', { section: name })} />
          )}
        </div>
      </section>

      <section>
        <BlockHeader title={t('tabs.articles')} href={`/${s}/articles`} linkText={t('articles.seeAll')} />
        <div className="mt-6">
          {articles.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={locale} onlyInEnglish={t('articles.onlyInEnglish')} />
              ))}
            </div>
          ) : (
            <EmptyState title={t('articles.emptyTitle')} body={t('articles.emptyBody')} />
          )}
        </div>
      </section>

      <section>
        <BlockHeader title={t('tabs.design')} href={`/${s}/design`} linkText={t('design.seeAll')} />
        <div className="mt-6">
          {design.length ? (
            <DesignWall items={design} fromArticle={t('design.fromArticle')} />
          ) : (
            <EmptyState title={t('design.emptyTitle')} body={t('design.emptyBody')} />
          )}
        </div>
      </section>

      <section>
        <BlockHeader title={t('tabs.videos')} href={`/${s}/videos`} linkText={t('videos.seeAll')} />
        <div className="mt-6">
          {vids.length ? <VideoGrid videos={vids} limit={3} /> : <EmptyState title={t('videos.emptyTitle')} body={t('videos.emptyBody')} />}
        </div>
      </section>
    </div>
  );
}
