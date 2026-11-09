import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

/** Ram för verktygssidorna: samma grafitsvarta yta som Om/Integritet, men bredare. */
export function ToolFrame({ title, lead, back, children }: { title: string; lead: string; back?: string; children: ReactNode }) {
  return (
    <div data-section="home" className="surface-home text-white">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6" data-pagefind-body>
        {back && (
          <Link data-pagefind-ignore href="/tools" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
            ← {back}
          </Link>
        )}
        <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/75">{lead}</p>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
