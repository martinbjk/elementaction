/** Sajtens publika adress — sätts i GitHub Actions (NEXT_PUBLIC_SITE_URL). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elementaction.com').replace(/\/$/, '');
