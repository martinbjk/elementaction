import type { ReactNode } from 'react';

/** Ram för textsidor (Om sajten, Integritetspolicy): neutral grafit, lagom radlängd. */
export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div data-section="home" className="surface-home text-white">
      <article className="mx-auto max-w-2xl px-4 pb-24 pt-14 sm:px-6">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">{title}</h1>
        <div className="info-prose mt-8">{children}</div>
      </article>
    </div>
  );
}
