'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarPlus, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { TIP_EMAIL } from '@/lib/site';

/**
 * TIPSA OM ETT EVENT
 *
 * `banner`: stor ruta överst i kalendern och på sektionernas startsidor.
 * `inline`: en rad längst ner på eventsidorna.
 * `button`: mejlknappen på sidan /submit-event, med "visa adressen" för
 * den som inte har ett mejlprogram kopplat.
 *
 * Mejlet öppnas med ämne och en ifylld mall (tip.subject / tip.template i
 * messages), så att alla tips kommer med samma uppgifter.
 */
function mailto(subject: string, body: string) {
  const addr = `${TIP_EMAIL.user}@${TIP_EMAIL.domain}`;
  return `mailto:${addr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function TipEvent({ variant, sectionName }: { variant: 'banner' | 'inline' | 'button'; sectionName?: string }) {
  const t = useTranslations('tip');
  const [shown, setShown] = useState(false);
  const subject = sectionName ? `${t('subject')} (${sectionName})` : t('subject');
  const open = () => {
    window.location.href = mailto(subject, t('template'));
  };

  if (variant === 'inline') {
    return (
      <p className="mt-10 border-t border-sec-line/20 pt-6 text-sm text-sec-muted">
        {t('inline')}{' '}
        <Link href="/submit-event" className="font-semibold text-sec-ink underline underline-offset-4 hover:text-sec-accent">
          {t('cta')}
        </Link>
      </p>
    );
  }

  if (variant === 'button') {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={open}
          className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/85"
        >
          <Mail size={18} aria-hidden />
          {t('send')}
        </button>
        {shown ? (
          <span className="select-all rounded-lg border border-white/20 px-3 py-2 font-mono text-sm text-white">
            {TIP_EMAIL.user}@{TIP_EMAIL.domain}
          </span>
        ) : (
          <button type="button" onClick={() => setShown(true)} className="text-sm text-white/70 underline underline-offset-4 hover:text-white">
            {t('showAddress')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-sec-accent/50 bg-sec-accent/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <CalendarPlus className="mt-0.5 shrink-0 text-sec-accent" size={26} aria-hidden />
        <div>
          <p className="text-lg font-semibold text-sec-ink">{t('bannerTitle')}</p>
          <p className="mt-1 text-sm text-sec-muted">{t('bannerBody')}</p>
        </div>
      </div>
      <Link
        href="/submit-event"
        className="shrink-0 rounded-full bg-sec-accent px-5 py-2.5 text-center text-sm font-semibold text-sec-accent-ink transition hover:brightness-110"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
