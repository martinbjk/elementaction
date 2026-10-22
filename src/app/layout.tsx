import type { ReactNode } from 'react';
import './globals.css';

/**
 * Rot-layout. <html lang="en"> är en platshållare som skrivs om per
 * språk efter bygget av scripts/fix-html-lang.mjs (samma lösning som på
 * skateboardeventcalendar.com — statisk export har ingen server som kan
 * sätta språket per sida).
 *
 * Cloudflare Web Analytics: skapa en ny sajt för elementaction.com i
 * Cloudflare och klistra in den nya token nedan (den gamla sajtens token
 * ska INTE återanvändas, då blandas statistiken ihop).
 */
const CF_ANALYTICS_TOKEN = '';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {CF_ANALYTICS_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
          />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </body>
    </html>
  );
}
