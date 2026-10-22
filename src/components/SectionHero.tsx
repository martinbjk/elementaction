import { getTranslations } from 'next-intl/server';
import type { SectionId } from '@/lib/sections';
import { SectionArt } from './SectionArt';

/**
 * Sektionens toppband. Bilden ligger till höger och tonar in bakom
 * texten; rubriken sätts i sektionens egen font, så man direkt ser
 * vilken värld man klivit in i.
 */
export async function SectionHero({ section, locale }: { section: SectionId; locale: string }) {
  const t = await getTranslations({ locale, namespace: `sections.${section}` });
  return (
    <div className="relative overflow-hidden bg-sec-bg">
      {/* Bilden: täcker hela bandet på mobil (tonad bakom texten), en
          kvadrat till höger från md så att hela motivet syns. */}
      <div className="absolute inset-0 md:left-auto md:w-1/2">
        <SectionArt section={section} />
        <div className="absolute inset-0 bg-sec-bg/85 md:bg-transparent md:bg-gradient-to-r md:from-sec-bg md:via-transparent md:via-35% md:to-transparent" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-12 pt-14 sm:px-6 md:min-h-[360px] md:pb-14 md:pt-16">
        <p className="text-sm font-medium text-sec-muted">{t('element')}</p>
        <h1 className="mt-2 max-w-3xl font-head text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-tight text-sec-ink">
          {t('name')}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-sec-ink/85">{t('tagline')}</p>
      </div>
    </div>
  );
}
