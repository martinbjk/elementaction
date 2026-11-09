'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Share2, Check } from 'lucide-react';

/**
 * Delaknapp för event- och artikelsidor. Använder native Web Share API
 * (öppnar telefonens/OS:ets egen delningsmeny — Instagram, WhatsApp, SMS
 * osv) där det stöds, annars faller den tillbaka på att kopiera länken
 * till urklipp med en kort "kopierat"-bekräftelse. Skrivbordswebbläsare
 * saknar oftast navigator.share, så fallback är det vanliga läget där.
 *
 * `text` är valfri — eventsidorna delar bara titel + URL, artikelsidorna
 * skickar även med utdraget (excerpt) som delningstext.
 *
 * Verktygen skickar `getUrl`/`getText` i stället: de läses först vid klick,
 * så länken får med besökarens aktuella val (?kg=80&level=… osv).
 */
export function ShareButton({
  url: fixedUrl,
  title,
  text: fixedText,
  getUrl,
  getText,
  className
}: {
  url?: string;
  title: string;
  text?: string;
  getUrl?: () => string;
  getText?: () => string;
  className?: string;
}) {
  const t = useTranslations('event');
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = getUrl ? getUrl() : fixedUrl ?? window.location.href;
    const text = getText ? getText() : fixedText;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url, ...(text ? { text } : {}) });
      } catch {
        // Användaren avbröt delningsdialogen eller den nekades — inget att göra
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard-API otillgängligt (t.ex. icke-säker kontext) — inget att göra
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={
        className ??
        'flex items-center gap-2 rounded-full border border-sec-line/30 px-5 py-2.5 text-sm font-semibold text-sec-ink transition hover:border-sec-accent'
      }
    >
      {copied ? <Check size={15} /> : <Share2 size={15} />}
      {copied ? t('linkCopied') : t('share')}
    </button>
  );
}
