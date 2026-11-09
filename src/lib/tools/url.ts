'use client';

/**
 * DELBARA VERKTYG — besökarens val sparas i adressen (?kg=80&level=…),
 * så en delad länk visar exakt samma resultat. Inget sparas någon
 * annanstans: det är bara själva adressen i webbläsaren som ändras.
 */
import { useEffect, useRef } from 'react';

export function readParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/** Läser adressen en gång efter första renderingen (statisk HTML har inga parametrar). */
export function useInitFromUrl(apply: (p: URLSearchParams) => void) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    apply(readParams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return done;
}

/** Skriver valen till adressen (utan att skapa nya steg i historiken). */
export function useSyncUrl(values: Record<string, string | number | boolean | null | undefined>, ready: { current: boolean }) {
  const key = JSON.stringify(values);
  useEffect(() => {
    if (!ready.current) return;
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(values)) {
      if (v === null || v === undefined || v === '' || v === false) continue;
      p.set(k, v === true ? '1' : String(v));
    }
    const qs = p.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
    window.history.replaceState(window.history.state, '', url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

export const num = (v: string | null, min: number, max: number): number | undefined => {
  if (v === null) return undefined;
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= min && n <= max ? n : undefined;
};
export function oneOf<T extends string>(v: string | null, list: readonly T[]): T | undefined {
  return v !== null && (list as readonly string[]).includes(v) ? (v as T) : undefined;
}
