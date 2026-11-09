'use client';

import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/base-path';

/**
 * SÖKRUTA — Pagefind (https://pagefind.app).
 *
 * Sökindexet byggs när sajten byggs (`pagefind --site out` i postbuild,
 * se package.json) och ligger som statiska filer i /pagefind/. Ingen server,
 * inga cookies, inget skickas någonstans: sökningen görs i webbläsaren.
 *
 * Bara sidor märkta med `data-pagefind-body` indexeras (artiklar och event).
 * Pagefind väljer index efter <html lang>, så /sv/search söker bland de
 * svenska sidorna (där engelska reservartiklar också ingår), osv.
 *
 * I `npm run dev` finns inget index — då visas en kort notis i stället.
 */
type PagefindUIInstance = { triggerSearch: (term: string) => void; destroy?: () => void };
declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => PagefindUIInstance;
  }
}

export function SiteSearch() {
  const ref = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const base = withBase('/pagefind/');
    let ui: PagefindUIInstance | undefined;
    let cancelled = false;

    if (!document.querySelector('link[data-pagefind-css]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${base}pagefind-ui.css`;
      link.dataset.pagefindCss = '';
      document.head.appendChild(link);
    }

    const start = () => {
      if (cancelled || !ref.current || !window.PagefindUI) return;
      ui = new window.PagefindUI({
        element: ref.current,
        bundlePath: base,
        showImages: true,
        showSubResults: true,
        autofocus: true,
        resetStyles: false
      });
      const q = new URLSearchParams(window.location.search).get('q');
      if (q) ui.triggerSearch(q);
    };

    if (window.PagefindUI) start();
    else {
      const script = document.createElement('script');
      script.src = `${base}pagefind-ui.js`;
      script.onload = start;
      script.onerror = () => setMissing(true);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      ui?.destroy?.();
    };
  }, []);

  return (
    <>
      <div ref={ref} className="site-search" />
      {missing && <p className="mt-4 text-sm text-white/60">Sökindexet finns bara i den byggda sajten (npm run build).</p>}
    </>
  );
}
