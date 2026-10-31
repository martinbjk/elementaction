import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localeAlternates } from '@/lib/seo';
import { InfoPage } from '@/components/InfoPage';

/*
 * INTEGRITETSPOLICY
 *
 * Skriven för sajtens FAKTISKA datapraxis i oktober 2026: statisk sajt på
 * GitHub Pages, inga konton, inga formulär, inga cookies, ingen statistik,
 * typsnitten ligger på egen server (inga Google Fonts-anrop), YouTube-
 * miniatyrer på videosidorna.
 *
 * Uppdatera BÅDA språken (sv + en) och datumet om något av detta ändras,
 * t.ex. om Cloudflare Web Analytics, annonser eller ett kontaktformulär
 * läggs till. Detta är inte juridisk rådgivning.
 *
 * Övriga språk (de, fr, es, pt, ja) visar den engelska texten med en notis.
 */

const UPDATED = { sv: '31 oktober 2026', en: '31 October 2026' };
const ISSUES_URL = 'https://github.com/martinbjk/elementaction/issues';
const ext = { target: '_blank', rel: 'noreferrer noopener' } as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('title'), alternates: localeAlternates(locale, 'privacy/') };
}

function Sv() {
  return (
    <>
      <p className="muted">Senast uppdaterad: {UPDATED.sv}</p>

      <h2>Kort sagt</h2>
      <p>
        Elementaction är en statisk webbplats. Det finns inga konton, ingen inloggning, inga formulär och inga cookies.
        Vi samlar inte in besöksstatistik och visar inga annonser. Nedan står exakt vad som händer när du besöker sajten.
      </p>

      <h2>Det här gör vi inte</h2>
      <ul>
        <li>Inga användarkonton eller inloggning</li>
        <li>Ingen insamling av namn, e-post eller andra personuppgifter via sajten</li>
        <li>Inga cookies, inga spårningsverktyg och ingen besöksstatistik</li>
        <li>Inga annonser</li>
        <li>Vi säljer aldrig uppgifter, eftersom vi inte samlar in några</li>
      </ul>

      <h2>Det som sparas i din webbläsare</h2>
      <p>
        Om du byter språk manuellt sparas ditt val i webbläsaren (<code>localStorage</code>), så att sajten öppnas på
        rätt språk nästa gång. Inget annat sparas, och uppgiften skickas aldrig någonstans. Du kan radera den när som
        helst via webbläsarens inställningar för webbplatsdata.
      </p>

      <h2>Drift och domän</h2>
      <p>
        Sajten ligger på <strong>GitHub Pages</strong>. Som alla webbservrar tar GitHub emot din IP-adress när sidan
        laddas och kan spara den en kort tid av säkerhetsskäl. Se{' '}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" {...ext}>
          GitHubs integritetspolicy
        </a>
        . Domännamnet hanteras av <strong>Cloudflare</strong>, som har en egen{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" {...ext}>
          integritetspolicy
        </a>
        .
      </p>
      <p>Typsnitten ligger på vår egen server. Inga anrop görs till Google Fonts.</p>

      <h2>Videos från YouTube</h2>
      <p>
        På videosidorna visas miniatyrbilder som hämtas från YouTubes servrar. Det betyder att din IP-adress skickas
        till YouTube (Google) när sidan visas. Själva videospelaren laddas först när du klickar på play, och då från{' '}
        <code>youtube-nocookie.com</code>, YouTubes läge med förbättrad integritet. Se{' '}
        <a href="https://policies.google.com/privacy" {...ext}>
          Googles integritetspolicy
        </a>
        .
      </p>

      <h2>Länkar till andra webbplatser</h2>
      <p>
        Eventsidor länkar till Google Maps och till arrangörernas egna webbplatser för anmälan och biljetter. Två
        surfartiklar visar vågprognoser från våra egna verktyg, som också ligger på GitHub Pages. Andra webbplatser
        omfattas av sina egna integritetspolicyer.
      </p>
      <p>
        Knappen ”Bjud på en kaffe” är en vanlig länk till PayPal. Inget skickas till PayPal förrän du klickar på den.
        Om du väljer att ge ett bidrag hanteras betalningen helt av PayPal enligt deras integritetspolicy. Vi får då
        se ditt namn och belopp i PayPal, men sparar inget av det på sajten.
      </p>

      <h2>Personuppgiftsansvarig och kontakt</h2>
      <p>
        Elementaction drivs av Martin Björck, Helsingborg. Eftersom sajten inte samlar in personuppgifter finns det i
        regel inget om dig att begära ut eller radera. Har du frågor om integritet kan du{' '}
        <a href={ISSUES_URL} {...ext}>
          öppna ett ärende på GitHub
        </a>
        .
      </p>

      <h2>Ändringar</h2>
      <p>
        Vi uppdaterar den här sidan om sajten ändras, till exempel om besöksstatistik eller annonser läggs till. Då
        frågar vi om ditt samtycke innan några cookies sätts. Datumet högst upp visar senaste ändring.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <p className="muted">Last updated: {UPDATED.en}</p>

      <h2>In short</h2>
      <p>
        Elementaction is a static website. There are no accounts, no login, no forms and no cookies. We do not collect
        visitor statistics and we show no ads. Below is exactly what happens when you visit the site.
      </p>

      <h2>What we don’t do</h2>
      <ul>
        <li>No user accounts or login</li>
        <li>No collection of names, email addresses or other personal data through the site</li>
        <li>No cookies, no tracking tools and no visitor statistics</li>
        <li>No ads</li>
        <li>We never sell data, because we don’t collect any</li>
      </ul>

      <h2>What is stored in your browser</h2>
      <p>
        If you change the language manually, your choice is saved in your browser (<code>localStorage</code>) so the
        site opens in the right language next time. Nothing else is stored, and it is never sent anywhere. You can delete
        it at any time in your browser’s site-data settings.
      </p>

      <h2>Hosting and domain</h2>
      <p>
        The site is hosted on <strong>GitHub Pages</strong>. Like any web server, GitHub receives your IP address when a
        page loads and may keep it for a short time for security purposes. See{' '}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" {...ext}>
          GitHub’s privacy statement
        </a>
        . The domain name is managed by <strong>Cloudflare</strong>, which has its own{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" {...ext}>
          privacy policy
        </a>
        .
      </p>
      <p>Fonts are served from our own server. No requests are made to Google Fonts.</p>

      <h2>Videos from YouTube</h2>
      <p>
        The video pages show thumbnails loaded from YouTube’s servers, which means your IP address is sent to YouTube
        (Google) when the page is shown. The video player itself only loads when you press play, and then from{' '}
        <code>youtube-nocookie.com</code>, YouTube’s privacy-enhanced mode. See{' '}
        <a href="https://policies.google.com/privacy" {...ext}>
          Google’s privacy policy
        </a>
        .
      </p>

      <h2>Links to other websites</h2>
      <p>
        Event pages link to Google Maps and to organizers’ own websites for registration and tickets. Two surf articles
        show wave forecasts from our own tools, which are also hosted on GitHub Pages. Other websites are covered by
        their own privacy policies.
      </p>
      <p>
        The “Buy me a coffee” button is a plain link to PayPal. Nothing is sent to PayPal until you click it. If you
        choose to give a contribution, the payment is handled entirely by PayPal under its own privacy policy. We then
        see your name and the amount in PayPal, but nothing of it is stored on the site.
      </p>

      <h2>Data controller and contact</h2>
      <p>
        Elementaction is run by Martin Björck, Helsingborg, Sweden. Because the site collects no personal data, there is
        usually nothing about you to request or delete. If you have questions about privacy, please{' '}
        <a href={ISSUES_URL} {...ext}>
          open an issue on GitHub
        </a>
        .
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page if the site changes, for example if visitor statistics or ads are added. In that case we
        will ask for your consent before any cookies are set. The date at the top shows the latest change.
      </p>
    </>
  );
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const note = t('englishNote');
  return (
    <InfoPage title={t('title')}>
      {locale === 'sv' ? (
        <Sv />
      ) : (
        <>
          {locale !== 'en' && note && <p className="muted">{note}</p>}
          <En />
        </>
      )}
    </InfoPage>
  );
}
