/** Sajtens publika adress — sätts i GitHub Actions (NEXT_PUBLIC_SITE_URL). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elementaction.com').replace(/\/$/, '');

/**
 * Adress för eventtips. Delas i två delar så att enkla spam-robotar inte
 * hittar den i HTML:en; den sätts ihop i webbläsaren vid klick (TipEvent).
 * Adressen vidarebefordras med Cloudflare Email Routing (gratis) till
 * Martins vanliga inkorg, så den privata adressen syns aldrig på sajten.
 */
export const TIP_EMAIL = { user: 'tips', domain: 'elementaction.com' };
