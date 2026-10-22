/**
 * Lägger till basePath framför sökvägar till filer i /public när sajten
 * ligger under en undermapp (t.ex. martinbjk.github.io/elementaction/).
 * Med egen domän är basePath tom och sökvägen lämnas orörd.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(src: string): string {
  if (!src.startsWith('/') || src.startsWith('//')) return src;
  return `${BASE}${src}`;
}
