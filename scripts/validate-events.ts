/**
 * Validerar alla data/events/<sektion>/*.json. Körs med
 * `npm run validate-events` och automatiskt i GitHub Actions.
 * Avslutar med exit 1 vid fel, så att CI stoppar trasig data.
 */
import { SECTIONS } from '../src/lib/sections';
import { listEventFiles, validateEventFile } from '../src/lib/events';

let errors = 0;
let total = 0;
for (const section of SECTIONS) {
  const seen = new Set<string>();
  for (const file of listEventFiles(section)) {
    total++;
    try {
      const ev = validateEventFile(section, file);
      if (seen.has(ev.slug)) throw new Error(`Dubblett-slug ${ev.slug} i ${section}`);
      seen.add(ev.slug);
    } catch (err) {
      errors++;
      console.error(`✗ ${(err as Error).message}`);
    }
  }
}
if (errors) {
  console.error(`\n${errors} fel i ${total} eventfiler.`);
  process.exit(1);
}
console.log(`✓ ${total} eventfiler validerade.`);
