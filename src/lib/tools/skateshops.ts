/**
 * SKATE SHOP FINDER — data.
 *
 * Flyttad från public/skate-shop-finder.html (16 nov 2026) så att verktyget
 * får sajtens meny, sju språk och dela-knapp. Lägg till eller ändra butiker här.
 *
 * Fält: n = namn, c = stad (engelska), k = land (engelska), a = adress
 * ("" = inte bekräftad), w = webbplats utan https://, y = startår,
 * s = "v" verifierad / "u" kontrolleras fortfarande,
 * t = "indie" oberoende, "surf" surfbutik med skate, "group" del av en liten butikskedja,
 * d = kort beskrivning (engelska).
 *
 * Verifierad betyder: adressen kommer från butikens egen webbplats, en officiell
 * stads- eller turistlista, eller två oberoende källor som stämmer överens.
 * Stora kedjor (Blue Tomato, Junkyard, Zumiez, doodah, Decathlon) tas inte med.
 */
export interface Shop {
  n: string;
  c: string;
  k: string;
  a: string;
  w?: string;
  y?: string;
  s: 'v' | 'u';
  t: 'indie' | 'surf' | 'group';
  d?: string;
}

export const SHOPS_UPDATED = '2026-11-16';

export const SHOPS: Shop[] = [
  // ---------- SWEDEN ----------
  {n:"Streetlab", c:"Malmö", k:"Sweden", a:"Regementsgatan 12, 211 42 Malmö", w:"streetlab.nu", y:"2001", s:"v", t:"indie", d:"Malmö's best-known core shop with its own Streetlab line and full shop videos."},
  {n:"Bryggeriet Skateshop", c:"Malmö", k:"Sweden", a:"Ystadvägen 44, 214 45 Malmö", w:"skatemalmo.se", s:"v", t:"indie", d:"Fully stocked shop inside Bryggeriet indoor skatepark."},
  {n:"Stigberget Skateshop", c:"Gothenburg", k:"Sweden", a:"Stigbergsliden 1, 414 63 Göteborg", w:"stigbergetskateshop.se", s:"v", t:"indie", d:"Hardware, clothing and its own collection by Gorm Boberg."},
  {n:"Standtall", c:"Gothenburg", k:"Sweden", a:"Aröds Industriväg 40, Göteborg", w:"standtall.se", y:"2020", s:"v", t:"indie", d:"Skate and snowboard shop with its whole web stock in the store. Free parking."},
  {n:"EVA Hardware", c:"Stockholm", k:"Sweden", a:"Bondegatan 48, Stockholm", w:"evahardware.com", s:"v", t:"indie", d:"Skateboard and vintage shop run by the EVA Skateboards crew. Open Wednesday to Saturday."},
  {n:"Surfers Paradise", c:"Varberg", k:"Sweden", a:"Södergatan 22, Varberg", w:"surfers.se", y:"1985", s:"u", t:"surf", d:"Surf shop and board-sports hub near Apelviken. Address needs a second source."},
  {n:"Street Style", c:"Stockholm", k:"Sweden", a:"Hamngatan 10 (PK-huset), 111 47 Stockholm", w:"streetstyle08.com", y:"1988", s:"v", t:"indie", d:"Skateboard and streetwear store in the PK-huset arcade, with decks, hardware, clothing and a second-hand section. Roots in the Stockholm skate scene of the late 1980s."},
  {n:"Coyote Grind Lounge", c:"Stockholm", k:"Sweden", a:"", y:"2005", s:"u", t:"indie", d:"Core shop founded by three older skaters. Street address not confirmed."},
  {n:"Stuntwood", c:"Stockholm", k:"Sweden", a:"Södermalm", w:"stuntwood.se", s:"u", t:"indie", d:"Skate and snowboard shop on Södermalm. Street address not confirmed."},
  {n:"Kahalani Boardstore", c:"Stockholm", k:"Sweden", a:"Östgötagatan 20, 116 25 Stockholm", w:"kahalani.se", y:"1998", s:"v", t:"indie", d:"Skateboards, longboards, surfskates, roller skates and roller derby gear on Södermalm. Open Mon–Fri 12–18, Sat 12–16."},
  {n:"FuckIt Skateboards", c:"Norrköping", k:"Sweden", a:"Tenngatan 13 (Ladan skatehall), 602 23 Norrköping", w:"fuckitskateboards.com", s:"v", t:"indie", d:"Local board brand that prints its own graphics in Norrköping. Pick graphic, shape and width for a custom board. Sold in the Ladan skatehall and online."},
  {n:"Boardlife", c:"Jönköping", k:"Sweden", a:"", w:"boardlife.se", s:"u", t:"indie", d:"Not confirmed whether the physical store is still open."},

  // ---------- NORWAY ----------
  {n:"SHIT® Skate Shop", c:"Stavanger", k:"Norway", a:"Øvre Holmegate 11, 2nd floor, 4006 Stavanger", w:"shitskateboardcompany.com", s:"v", t:"indie", d:"Norway's longest-running skateboard brand. Limited opening hours."},
  {n:"Lille Løkka", c:"Oslo", k:"Norway", a:"Torggata 22, 0183 Oslo", w:"lillelokka.com", s:"v", t:"indie", d:"Local skateboard and streetwear shop in central Oslo."},
  {n:"Annex (Hunting Lodge)", c:"Oslo", k:"Norway", a:"Grünerløkka", s:"u", t:"indie", d:"Skate department of a streetwear store, opened around 2020. Current status not confirmed."},
  {n:"Eightynine", c:"Voss", k:"Norway", a:"Vangsgata 6, 5700 Voss", s:"u", t:"indie", y:"2024", d:"Skate and snowboard shop. The address comes from the company register."},

  // ---------- DENMARK ----------
  {n:"Sidewalk Skateshop", c:"Copenhagen", k:"Denmark", a:"Enghave Plads 10, 1670 København V", w:"sidewalkshop.dk", y:"2003", s:"v", t:"indie", d:"Original Vesterbro shop near Copenhagen Skatepark."},
  {n:"Circus Circus", c:"Copenhagen", k:"Denmark", a:"Guldbergsgade 16 (basement), 2200 København N", w:"circuscircus.dk", y:"2008", s:"v", t:"indie", d:"100% skateboard shop with a circus theme."},
  {n:"do you!", c:"Copenhagen", k:"Denmark", a:"Blågårdsgade 7A, 2200 København N", w:"doyou-shop.dk", s:"v", t:"indie", d:"A 'skateshop & more' concept store on Nørrebro."},
  {n:"Pasteelo", c:"Copenhagen", k:"Denmark", a:"Frederiksborggade 31, 1360 København K", w:"pasteelo.com", s:"v", t:"indie", d:"Skate shop, music store and clothing brand near Nørreport."},
  {n:"LabCph", c:"Copenhagen", k:"Denmark", a:"", s:"u", t:"indie", d:"Long-running Copenhagen skate shop. Street address not confirmed."},
  {n:"ALIS", c:"Copenhagen", k:"Denmark", a:"", w:"alis.dk", s:"u", t:"indie", d:"Current address and status not confirmed."},
  {n:"Sidewalk Aarhus", c:"Aarhus", k:"Denmark", a:"Nørregade 54, 8000 Aarhus C", s:"u", t:"indie", d:"Address from one source."},

  // ---------- FINLAND ----------
  {n:"My Favorite Things", c:"Helsinki", k:"Finland", a:"Fredrikinkatu 31 (courtyard), 00120 Helsinki", w:"myfavoritethings.fi", y:"2014", s:"v", t:"indie", d:"100% skater-owned. Tram 3 to Iso-Roobertinkatu."},
  {n:"Beyond", c:"Helsinki", k:"Finland", a:"Kaisaniemenkatu 4, 00100 Helsinki", y:"2006", s:"v", t:"indie", d:"Finnish street fashion and skateboarding store."},
  {n:"Ponke's The Shop", c:"Helsinki", k:"Finland", a:"Simonkatu 6 (Forum), 00100 Helsinki", y:"1990", s:"v", t:"indie", d:"One of Helsinki's oldest skate and snowboard shops."},
  {n:"Shreddington Snow + Lamina", c:"Helsinki", k:"Finland", a:"Kalevankatu 31, 00100 Helsinki", w:"shreddingtonsnow.com", s:"v", t:"indie", d:"Snowboard specialist that took over the Lamina skate store."},
  {n:"Skate Shop", c:"Helsinki", k:"Finland", a:"Malmin raitti 17 B, 00700 Helsinki", w:"skateshop.fi", s:"u", t:"indie", d:"Address from one source."},
  {n:"Mañana Skateshop", c:"Tampere", k:"Finland", a:"", s:"u", t:"indie", d:"Known for its shop video with Jaakko Ojanen. Street address not confirmed."},

  // ---------- UK & IRELAND ----------
  {n:"Slam City Skates", c:"London", k:"United Kingdom", a:"The Old Truman Brewery, 10 Dray Walk, London E1 6QL", w:"slamcity.com", s:"v", t:"indie", d:"London institution, off Brick Lane. All staff skate."},
  {n:"Parlour Skate Shop", c:"London", k:"United Kingdom", a:"Endell Street, Covent Garden", s:"u", t:"indie", d:"Since 1988. Street number and current status not confirmed."},
  {n:"High Rollers", c:"Dublin", k:"Ireland", a:"", y:"2013", s:"u", t:"indie", d:"Skater-owned. Street address not confirmed."},

  // ---------- FRANCE ----------
  {n:"Nozbone", c:"Paris", k:"France", a:"7 Rue de Marseille, 75010 Paris", w:"nozbone.com", y:"2003", s:"v", t:"indie", d:"European Skateshop of the Year 2016. Concrete mini ramp in the cellar."},
  {n:"VEGA Skateshop", c:"Paris", k:"France", a:"18 Rue Louis Blanc, 75010 Paris", s:"v", t:"indie", d:"A short push from Nozbone."},
  {n:"Arrow & Beast", c:"Paris", k:"France", a:"17 Rue Réaumur, 75003 Paris", s:"u", t:"indie", d:"Address from one source."},
  {n:"Wallstreet Skateshop", c:"Lyon", k:"France", a:"", w:"wallstreetskateshop.fr", s:"u", t:"indie", d:"One of France's most respected shops. Street address not confirmed."},

  // ---------- SPAIN ----------
  {n:"Welcome Skateboarding", c:"Madrid", k:"Spain", a:"Calle Corredera Alta de San Pablo 16, 28004 Madrid", w:"welcomesk8.com", s:"v", t:"indie", d:"Open Monday to Saturday, 12:00–20:00."},
  {n:"Sk8land", c:"Madrid", k:"Spain", a:"Calle de Valverde 19, 28004 Madrid", w:"sk8land.com", y:"2002", s:"v", t:"indie", d:"100% skateboard shop."},
  {n:"Dagger Family", c:"Madrid", k:"Spain", a:"Calle de Ceuta 1, 28039 Madrid", s:"v", t:"indie", d:"Skate shop, tattoo studio, indoor ramp and skate school."},
  {n:"Stance Skateshop", c:"Madrid", k:"Spain", a:"Calle de los Jardines 9, 28013 Madrid", s:"u", t:"indie", d:"Address from one source."},
  {n:"State BCN", c:"Barcelona", k:"Spain", a:"Carrer del Torrent de l'Olla 108, Barcelona", s:"u", t:"indie", d:"Address from one source."},

  // ---------- GERMANY ----------
  {n:"Civilist", c:"Berlin", k:"Germany", a:"Brunnenstraße 13, 10119 Berlin", w:"civilistberlin.com", y:"2009", s:"v", t:"indie", d:"Skate shop, label and gallery in Mitte."},
  {n:"Bonkers", c:"Frankfurt", k:"Germany", a:"Klappergasse 11, 60594 Frankfurt", w:"bonkers-shop.com", y:"2010", s:"v", t:"indie", d:"Shop plus its own private indoor park."},
  {n:"Railslide", c:"Frankfurt", k:"Germany", a:"Neue Kräme 34, 60311 Frankfurt", s:"v", t:"indie", d:"Trading for 30+ years."},
  {n:"Mantis Skateshop", c:"Hamburg", k:"Germany", a:"Große Theaterstraße 7, 20354 Hamburg", y:"2000", s:"u", t:"indie", d:"Next to the Jungfernstieg spot. Address from one source."},
  {n:"Lobby Skateshop", c:"Hamburg", k:"Germany", a:"Marktstraße 145, 20357 Hamburg", y:"2016", s:"u", t:"indie", d:"Address from one source."},
  {n:"SHRN (Soo Hot Right Now)", c:"Munich", k:"Germany", a:"", y:"2013", s:"u", t:"indie", d:"Moved from Klenzestraße 16. New address not confirmed."},

  // ---------- BENELUX ----------
  {n:"Ben-G", c:"Amsterdam", k:"Netherlands", a:"Nieuwezijds Voorburgwal 142, 1012 SH Amsterdam", y:"2005", s:"v", t:"indie", d:"Skater-owned, three floors, famous for its collaborations."},
  {n:"Lockwood Hardgoods", c:"Antwerp", k:"Belgium", a:"Lange Klarenstraat 29, 2000 Antwerpen", w:"lockwood-avenue.com", y:"1996", s:"v", t:"indie", d:"Deck wall of 100 boards above a skate bowl."},
  {n:"Lockwood Avenue", c:"Antwerp", k:"Belgium", a:"IJzerenwaag 1, 2000 Antwerpen", w:"lockwood-avenue.com", y:"1996", s:"v", t:"indie", d:"Skate and sneaker store."},

  // ---------- ALPS ----------
  {n:"Rollladen", c:"Zürich", k:"Switzerland", a:"Konradstrasse 72, 8005 Zürich", w:"roll-laden.tv", s:"v", t:"indie", d:"Skateboards, longboards and a test-board centre."},
  {n:"Board Yard", c:"Zürich", k:"Switzerland", a:"Zürich-Enge", w:"boardyard.ch", s:"u", t:"indie", d:"Skate shop and café. Street address not confirmed."},
  {n:"collateral", c:"Zürich", k:"Switzerland", a:"Stauffacherstrasse 95, 8004 Zürich", s:"u", t:"indie", d:"Address from one source."},
  {n:"Freedom Skateshop", c:"Vienna", k:"Austria", a:"Zieglergasse 28, 1070 Wien", w:"freedomskateshop.at", s:"v", t:"indie", d:"Huge deck wall with hundreds of boards."},
  {n:"St. Louis Skateshop", c:"Vienna", k:"Austria", a:"", y:"1989", s:"u", t:"indie", d:"Directories disagree on the address."},

  // ---------- CENTRAL / EAST ----------
  {n:"StreetMarket", c:"Prague", k:"Czech Republic", a:"Husitská 13, Praha 3", w:"streetmarket.cz", s:"v", t:"indie", d:"Decks, hardware, shoes and clothing from core brands."},
  {n:"Popcorn", c:"Prague", k:"Czech Republic", a:"Milady Horákové 397/32, Praha 7", w:"popcornshop.cz", s:"v", t:"group", d:"Nearly 500 m² with its own skate room. Boardstar group."},
  {n:"El Niño", c:"Prague", k:"Czech Republic", a:"Palackého náměstí 2, Praha 2", w:"elninoshop.cz", s:"v", t:"group", d:"Three-floor skate and snow shop. Boardstar group."},
  {n:"Easy Rider", c:"Prague", k:"Czech Republic", a:"Jugoslávská 15/180, Praha 2", w:"easyridershop.cz", s:"v", t:"group", d:"One of Prague's first skate shops. Boardstar group."},
  {n:"Revolution", c:"Prague", k:"Czech Republic", a:"Revoluční 2, Praha 1", w:"revolutionshop.cz", s:"v", t:"group", d:"Opposite Kotva department store. Boardstar group."},
  {n:"Mystic Skates", c:"Prague", k:"Czech Republic", a:"Štěpánská 37, Praha 1", w:"mysticskateshop.cz", s:"u", t:"indie", d:"Address from one source."},
  {n:"Darkslide", c:"Prague", k:"Czech Republic", a:"K Brusce 281/9, Praha 6", w:"darkslide.cz", s:"u", t:"indie", d:"Address from one source."},
  {n:"California Skateshop", c:"Warsaw", k:"Poland", a:"Aleja Armii Ludowej 12, 00-638 Warszawa", w:"californiaskateshop.pl", s:"v", t:"indie", d:"Calls itself Warsaw's biggest and oldest skate shop."},
  {n:"SH Store", c:"Warsaw", k:"Poland", a:"Oleandrów 3, 00-629 Warszawa", w:"shstore.eu", s:"v", t:"indie", d:"Core skateboard shop."},

  // ---------- SOUTH ----------
  {n:"Cybercafé", c:"Lisbon", k:"Portugal", a:"Rua do Ferragial 1, 1200 Lisboa", w:"cybercafeskateshop.com", y:"2021", s:"v", t:"indie", d:"Skater-owned shop and cultural hub."},
  {n:"7Hills", c:"Rome", k:"Italy", a:"Via Flaminia 47, 00196 Roma", w:"7hillsroma.com", y:"2012", s:"v", t:"indie", d:"Rome's core shop with a pro team. Closed Sundays."}
];
