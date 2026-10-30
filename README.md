# Elementaction

**elementaction.com** — fortsättningen på skateboardeventcalendar.com, nu med fyra sektioner:

| Sektion | Märke | Färg | Rubrikfont | Bildvärld |
|---|---|---|---|---|
| Surfing | Water action (surfare i våg, Martins utkast) | blå (Pantone 2728) | Fraunces | dyningslinjer och en brytande våg |
| Skateboard | Concrete action (skejtare i quarterpipe) | grå | Archivo Black | betongfogar, bowl och bräda |
| Snowboard | Snow action (åkare under bergstopp) | vit | Space Grotesk | berg i lager med fallande snö |
| Inspiration | Mind action (huvud med spiral, Martins utkast) | grön (Pantone 802) på titan | Syne | böjda titanvolymer, som Guggenheim i Bilbao |

Huvudmärket är en cirkel delad i fyra lika stora fält i sektionsfärgerna, med rundade hörn, och ACTION i bågen ovanför (ACT blått (Pantone 2728 C), ION grått, typsnitt Audiowide; Mind-fältet grönt (Pantone 802 C)). Sektionsmärkena är runda brickor med ACTION överst och ett motiv; i menyn används förenklade varianter utan text. Namnet skrivs alltid
som ett ord, **Elementaction**. Märkena finns som SVG i `public/brand/`
(`mark.svg`, `mark-water.svg`, `mark-concrete.svg`, `mark-snow.svg`, `mark-mind.svg`).

Varje sektion har samma fyra flikar: **Kalender, Artiklar, Design, Videos**.

Byggd med Next.js 14 (statisk export), next-intl (7 språk), Tailwind. Publiceras gratis på GitHub Pages.

---

## Var ligger vad?

```
data/events/<sektion>/<slug>.json      Eventen (samma format som skateboardeventcalendar)
content/articles/<sektion>/<språk>/    Artiklarna (Markdown, samma frontmatter som förut)
public/images/articles/<slug>/         Artikelbilder
src/data/videos.ts                     Videos per sektion (YouTube-id + text)
messages/<språk>.json                  All text i gränssnittet, 7 språk
src/lib/sections.ts                    De fyra sektionerna + tillåtna eventkategorier
src/app/globals.css                    Färger och typsnitt per sektion
src/components/SectionArt.tsx          Bildvärlden (SVG) för varje sektion
src/components/Logo.tsx                Huvudmärket och de fyra sektionsmärkena
public/brand/                          Märken som SVG, ikon, delningsbild (og-image.png)
```

`<sektion>` är alltid en av: `surfing`, `skateboard`, `snowboard`, `inspiration`.

---

## Lägga till ett event

1. Kopiera en befintlig fil i `data/events/skateboard/` som mall.
2. Lägg den nya filen i rätt sektionsmapp, t.ex. `data/events/surfing/swedish-surf-champs-2027.json`.
3. Filnamnet och `"slug"` i filen ska vara exakt samma.
4. `"category"` måste vara en av sektionens kategorier:
   - skateboard: street, park, vert, bowl, freestyle, downhill, slalom, demo, contest
   - surfing: shortboard, longboard, bigwave, wavepool, bodyboard, sup, festival, contest
   - snowboard: halfpipe, slopestyle, bigair, boardercross, freeride, rail, festival, contest
   - inspiration: exhibition, design, photography, travel, festival, fair, workshop
5. Commit. GitHub kontrollerar filen automatiskt — är något fel stoppas bygget och felmeddelandet säger vilken fil och vilket fält.

## Lägga till en artikel

1. Lägg Markdown-filen i `content/articles/<sektion>/en/` (eller `sv/`).
2. Bilderna i `public/images/articles/<slug>/`.
3. Samma frontmatter som på skateboardeventcalendar. Ett nytt valfritt fält:
   `kind: "design"` — då hamnar inlägget under fliken **Design** i stället för Artiklar.
4. Alla bilder du använder i en artikel visas automatiskt även på sektionens **Design**-vägg.

## Lägga till videos

Öppna `src/data/videos.ts` och lägg till `{ id, title, intro }` i rätt sektions lista.
`id` är delen efter `v=` i YouTube-länken.

---

## Köra lokalt

```
npm install
npm run dev
```

Öppna http://localhost:3000

## Publicera (GitHub Pages)

Workflowen `.github/workflows/pages-deploy.yml` bygger och publicerar vid varje push till `main`
(ungefär 5–6 minuter). Kräver att GitHub Pages är satt till **GitHub Actions** under
repots Settings → Pages, och att domänen pekar rätt (se nedan).

### Domänen elementaction.com (Cloudflare DNS)

`public/CNAME` innehåller redan `elementaction.com`. I Cloudflare: lägg till fyra A-poster
för `@` mot GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153,
185.199.111.153) och en CNAME för `www` mot `<ditt-github-namn>.github.io`.
Kontrollera de aktuella IP-adresserna i GitHubs dokumentation innan du lägger in dem.

---

## Saker som är medvetet tomma eller kvar att göra

- **Surf-, snowboard- och inspirationskalendrarna är tomma.** Inga event har lagts in som inte är
  kontrollerade mot arrangörens egen källa. Sidorna visar ett "byggs just nu"-läge tills dess.
- **Videos för surf, snowboard och inspiration** är tomma av samma skäl.
- **Delningsbilderna i artiklarna** (og-image.png) har texten SKATEBOARDEVENTCALENDAR.COM i bilden.
  De fungerar, men bör göras om med den nya domänen.
- **Cloudflare Web Analytics**: lägg in en ny token för elementaction.com i `src/app/layout.tsx`.
- **Översättningarna** till tyska, franska, spanska, portugisiska och japanska är maskinskrivna
  av Claude och bör läsas igenom av någon som kan språket. Status-, kategori- och event-texterna
  är återanvända från skateboardeventcalendar.
- Artikeltexterna finns som förut bara på engelska (plus två på svenska); övriga språk visar
  engelska med en notis.

## Licens

All rights reserved — se LICENSE (samma som skateboardeventcalendar).
