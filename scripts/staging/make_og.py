"""Delningsbilder (1200x630) för artiklarna, i samma stil som de befintliga:
mörk bakgrund, färgad topplist, kicker, rubrik på två rader, ingress,
nyckelord och ELEMENTACTION.COM nere till höger. Illustrationen till höger
är enkel SVG. Kör: python3 scripts/staging/make_og.py"""
import pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/images/articles'

ART = {
    'museum': '''
      <path d="M40 60 H410" stroke="#8a8f94" stroke-width="4" stroke-linecap="round"/>
      <g fill="none" stroke-width="5">
        <rect x="70" y="80" width="70" height="250" rx="35" stroke="#f5f8fb"/>
        <rect x="190" y="80" width="70" height="250" rx="35" stroke="ACC"/>
        <rect x="310" y="80" width="70" height="250" rx="35" stroke="#f5f8fb"/>
      </g>
      <g fill="#8a8f94"><circle cx="105" cy="68" r="5"/><circle cx="225" cy="68" r="5"/><circle cx="345" cy="68" r="5"/></g>
      <g fill="ACC"><circle cx="90" cy="125" r="6"/><circle cx="120" cy="125" r="6"/><circle cx="90" cy="285" r="6"/><circle cx="120" cy="285" r="6"/></g>
      <g fill="#f5f8fb"><circle cx="210" cy="125" r="6"/><circle cx="240" cy="125" r="6"/><circle cx="210" cy="285" r="6"/><circle cx="240" cy="285" r="6"/></g>
      <g fill="ACC"><circle cx="330" cy="125" r="6"/><circle cx="360" cy="125" r="6"/><circle cx="330" cy="285" r="6"/><circle cx="360" cy="285" r="6"/></g>
      <path d="M225 165 l11 22 24 3 -18 17 5 24 -22 -12 -22 12 5 -24 -18 -17 24 -3 z" fill="#f2c335"/>''',
    'deck': '''
      <defs>
        <clipPath id="d1"><rect x="-48" y="-165" width="96" height="330" rx="48"/></clipPath>
      </defs>
      <g transform="translate(110 205) rotate(-14)">
        <rect x="-48" y="-165" width="96" height="330" rx="48" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <g clip-path="url(#d1)">
          <path d="M-60 -40 l120 -50 M-60 0 l120 -50 M-60 40 l120 -50 M-60 80 l120 -50" stroke="#f2c335" stroke-width="12"/>
        </g>
        <g fill="#8a8f94"><circle cx="-14" cy="-118" r="4"/><circle cx="14" cy="-118" r="4"/><circle cx="-14" cy="118" r="4"/><circle cx="14" cy="118" r="4"/></g>
      </g>
      <g transform="translate(340 205) rotate(14)">
        <rect x="-48" y="-165" width="96" height="330" rx="48" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <path d="M-26 -95 l38 0 -22 55 34 0 -52 90 14 -62 -30 0 z" fill="#f5f8fb"/>
        <g fill="#8a8f94"><circle cx="-14" cy="-118" r="4"/><circle cx="14" cy="-118" r="4"/><circle cx="-14" cy="118" r="4"/><circle cx="14" cy="118" r="4"/></g>
      </g>
      <g transform="translate(225 195)">
        <rect x="-48" y="-165" width="96" height="330" rx="48" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <circle cx="0" cy="0" r="24" fill="ACC"/>
        <circle cx="0" cy="0" r="11" fill="#1b1d22"/>
        <path d="M0 -52 V-36 M0 36 V52 M-40 0 H-34 M34 0 H40 M-25 -25 l-9 -9 M25 25 l9 9 M25 -25 l9 -9 M-25 25 l-9 9" stroke="ACC" stroke-width="7" stroke-linecap="round"/>
        <g fill="#8a8f94"><circle cx="-14" cy="-118" r="4"/><circle cx="14" cy="-118" r="4"/><circle cx="-14" cy="118" r="4"/><circle cx="14" cy="118" r="4"/></g>
      </g>''',
    'camera': '''
      <rect x="70" y="110" width="310" height="200" rx="22" fill="none" stroke="#f5f8fb" stroke-width="6"/>
      <path d="M140 110 l25 -35 h120 l25 35" fill="none" stroke="#f5f8fb" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="225" cy="210" r="70" fill="none" stroke="ACC" stroke-width="8"/>
      <circle cx="225" cy="210" r="34" fill="ACC" fill-opacity=".35"/>
      <circle cx="340" cy="145" r="9" fill="#f2c335"/>''',
    'waves': '''
      <path d="M0 260 Q75 200 150 260 T300 260 T450 260" stroke="ACC" stroke-width="5" fill="none"/>
      <path d="M0 300 Q75 240 150 300 T300 300 T450 300" stroke="ACC" stroke-opacity=".6" stroke-width="5" fill="none"/>
      <path d="M0 340 Q75 280 150 340 T300 340 T450 340" stroke="ACC" stroke-opacity=".35" stroke-width="5" fill="none"/>
      <circle cx="360" cy="90" r="38" fill="none" stroke="#f2c335" stroke-width="5"/>
      <path d="M40 120 l60 -10 M60 150 l70 -12 M30 90 l50 -8" stroke="#8a8f94" stroke-width="4" stroke-linecap="round"/>''',
    'bigwave': '''
      <path d="M0 360 C60 360 90 300 120 220 C150 120 230 40 330 50 C400 58 440 110 420 160 C405 200 360 205 340 180 C370 175 380 140 355 120 C320 95 260 130 240 210 C225 280 220 330 260 360 Z" fill="ACC" fill-opacity=".9"/>
      <path d="M0 375 H450" stroke="ACC" stroke-width="5"/>
      <path d="M150 300 l30 -40 l14 6" stroke="#f5f8fb" stroke-width="5" fill="none" stroke-linecap="round"/>
      <text x="262" y="300" font-family="DejaVu Sans" font-weight="700" font-size="40" fill="#f5f8fb">26.21 m</text>''',
    'board': '''
      <g transform="translate(225 200) rotate(-35)">
        <path d="M0 -175 C55 -120 62 60 30 160 L0 175 L-30 160 C-62 60 -55 -120 0 -175 Z" fill="none" stroke="ACC" stroke-width="5"/>
        <path d="M0 -170 V170" stroke="ACC" stroke-opacity=".5" stroke-width="3"/>
        <path d="M-22 120 l-10 30 l14 -6 Z M22 120 l10 30 l-14 -6 Z M0 135 l0 32" stroke="#f2c335" stroke-width="4" fill="#f2c335"/>
      </g>
      <text x="40" y="380" font-family="DejaVu Sans" font-weight="700" font-size="34" fill="#f5f8fb">litres?</text>''',
    'punk': '''
      <rect x="70" y="50" width="310" height="190" rx="16" fill="none" stroke="#f5f8fb" stroke-width="5"/>
      <rect x="110" y="85" width="230" height="70" rx="8" fill="none" stroke="ACC" stroke-width="5"/>
      <circle cx="160" cy="120" r="20" fill="none" stroke="#f5f8fb" stroke-width="5"/>
      <circle cx="290" cy="120" r="20" fill="none" stroke="#f5f8fb" stroke-width="5"/>
      <path d="M130 240 l25 -45 h140 l25 45" fill="none" stroke="#f5f8fb" stroke-width="5"/>
      <path d="M60 320 Q215 360 390 320" stroke="ACC" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="115" cy="352" r="14" fill="ACC"/><circle cx="335" cy="352" r="14" fill="ACC"/>'''
,
    'spiral': '''
      <ellipse cx="225" cy="80" rx="150" ry="26" fill="none" stroke="#c8ccd0" stroke-width="5"/>
      <ellipse cx="225" cy="150" rx="135" ry="24" fill="none" stroke="#c8ccd0" stroke-width="5"/>
      <ellipse cx="225" cy="218" rx="120" ry="22" fill="none" stroke="#c8ccd0" stroke-width="5"/>
      <ellipse cx="225" cy="284" rx="105" ry="20" fill="none" stroke="#c8ccd0" stroke-width="5"/>
      <path d="M75 80 L120 284 M375 80 L330 284" stroke="#c8ccd0" stroke-width="5"/>
      <path d="M40 360 C120 300 170 380 250 330 C310 290 360 350 420 320" stroke="ACC" stroke-width="7" fill="none"/>''',
    'mountain': '''
      <path d="M0 360 L130 140 L200 230 L290 60 L450 360 Z" fill="ACC" fill-opacity=".85"/>
      <path d="M290 60 L250 135 L272 125 L290 145 L310 122 L328 132 Z M130 140 L105 182 L125 175 L140 188 L152 172 Z" fill="#f5f8fb"/>
      <path d="M150 330 l120 -40" stroke="#f2c335" stroke-width="10" stroke-linecap="round"/>''',
    'boards': '''
      <g fill="none" stroke-width="5">
        <rect x="60" y="60" width="62" height="290" rx="31" stroke="ACC"/>
        <rect x="150" y="80" width="62" height="270" rx="31" stroke="ACC" stroke-opacity=".75"/>
        <path d="M240 100 h62 v220 l-31 30 l-31 -30 z" stroke="ACC" stroke-opacity=".55" stroke-linejoin="round"/>
        <path d="M330 120 c0 -40 62 -40 62 0 v190 c0 30 -62 30 -62 0 z" stroke="#f2c335"/>
      </g>''',
}

ART['books'] = '''
      <g transform="translate(225 200)">
        <rect x="-150" y="95" width="300" height="34" rx="4" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <rect x="-135" y="58" width="270" height="34" rx="4" fill="ACC"/>
        <rect x="-155" y="21" width="290" height="34" rx="4" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <rect x="-125" y="-16" width="250" height="34" rx="4" fill="#f2c335"/>
        <path d="M-150 112 H150 M-155 38 H135" stroke="#8a8f94" stroke-width="2"/>
        <path d="M-60 -30 L-60 -130 Q-5 -150 0 -118 Q5 -150 60 -130 L60 -30 Q5 -48 0 -25 Q-5 -48 -60 -30 Z" fill="none" stroke="#f5f8fb" stroke-width="5" stroke-linejoin="round"/>
        <path d="M0 -118 V-25" stroke="#f5f8fb" stroke-width="4"/>
        <path d="M-45 -60 q12 -10 24 0 t20 0" stroke="ACC" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>'''
ART['film'] = '''
      <g transform="translate(225 200)">
        <circle cx="-70" cy="-60" r="72" fill="none" stroke="#f5f8fb" stroke-width="5"/>
        <circle cx="70" cy="-60" r="72" fill="none" stroke="#f5f8fb" stroke-width="5"/>
        <g fill="#f5f8fb"><circle cx="-70" cy="-60" r="10"/><circle cx="70" cy="-60" r="10"/></g>
        <g fill="none" stroke="#8a8f94" stroke-width="4">
          <circle cx="-70" cy="-100" r="18"/><circle cx="-110" cy="-60" r="18"/><circle cx="-30" cy="-60" r="18"/><circle cx="-70" cy="-20" r="18"/>
          <circle cx="70" cy="-100" r="18"/><circle cx="110" cy="-60" r="18"/><circle cx="30" cy="-60" r="18"/><circle cx="70" cy="-20" r="18"/>
        </g>
        <rect x="-150" y="30" width="300" height="110" rx="10" fill="#1b1d22" stroke="#f5f8fb" stroke-width="5"/>
        <path d="M-100 105 q30 -40 60 0 t60 0 t60 0" stroke="ACC" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M150 55 l60 -30 v110 l-60 -30 z" fill="#f5f8fb"/>
      </g>'''
ART['compass'] = '''
      <g transform="translate(225 190)">
        <circle r="150" fill="none" stroke="#f5f8fb" stroke-width="5"/>
        <circle r="128" fill="none" stroke="#8a8f94" stroke-width="2"/>
        <path d="M0 -120 L22 0 L0 120 L-22 0 Z" fill="#f5f8fb"/>
        <path d="M0 -120 L22 0 L-22 0 Z" fill="ACC"/>
        <path d="M-120 0 L0 -16 L120 0 L0 16 Z" fill="#8a8f94"/>
        <circle r="10" fill="#1b1d22" stroke="#f5f8fb" stroke-width="4"/>
        <text y="-160" text-anchor="middle" font-family="DejaVu Sans" font-weight="700" font-size="30" fill="#f5f8fb">N</text>
      </g>
      <path d="M40 365 q40 -30 80 0 t80 0 t80 0 t80 0 t80 0" stroke="ACC" stroke-width="6" fill="none" stroke-linecap="round"/>'''
ART['globedeck'] = '''
      <circle cx="225" cy="185" r="150" fill="none" stroke="#f5f8fb" stroke-width="5"/>
      <ellipse cx="225" cy="185" rx="62" ry="150" fill="none" stroke="#8a8f94" stroke-width="3"/>
      <path d="M75 185 H375 M95 110 H355 M95 260 H355" stroke="#8a8f94" stroke-width="3"/>
      <g transform="translate(225 340)">
        <path d="M-150 -18 Q-170 -18 -175 -34 M150 -18 Q170 -18 175 -34" stroke="ACC" stroke-width="9" fill="none" stroke-linecap="round"/>
        <rect x="-150" y="-26" width="300" height="16" rx="8" fill="ACC"/>
        <circle cx="-95" cy="8" r="14" fill="#f5f8fb"/><circle cx="95" cy="8" r="14" fill="#f5f8fb"/>
      </g>
      <circle cx="300" cy="120" r="9" fill="#f2c335"/>'''
ART['portugal'] = '''<path d="M228.5 255.3 L237.3 223.7 L236.2 215.5 L233.5 214.1 L241.6 210.5 L251.9 197.6 L263.4 159.8 L261.0 155.2 L275.2 99.3 L274.3 87.2 L271.8 84.3 L262.5 43.6 L263.1 35.7 L265.8 32.5 L276.3 22.5 L292.7 20.0 L300.1 15.0 L301.0 21.4 L306.3 22.6 L299.1 32.2 L303.8 39.6 L315.3 34.7 L316.1 31.2 L318.0 37.0 L327.4 32.6 L333.8 34.4 L332.4 38.2 L341.1 35.6 L342.5 39.7 L355.2 34.5 L355.8 28.0 L358.2 26.7 L371.8 30.3 L375.8 29.8 L376.3 26.5 L382.5 30.7 L388.6 28.3 L390.9 30.3 L389.6 34.3 L392.6 35.1 L389.7 44.3 L390.8 48.4 L402.1 49.3 L410.0 55.0 L403.5 69.8 L399.5 69.8 L393.7 78.3 L385.3 79.6 L376.5 94.7 L369.7 95.2 L376.9 107.2 L375.3 114.9 L377.3 121.4 L374.5 128.2 L377.2 132.1 L374.2 136.3 L378.0 142.5 L373.2 149.7 L366.1 151.7 L364.3 155.2 L373.5 167.7 L371.3 177.7 L366.7 182.0 L365.1 192.0 L336.2 192.5 L349.8 207.2 L348.2 212.6 L353.2 219.9 L352.7 224.9 L358.6 227.6 L358.1 232.0 L366.2 232.7 L368.7 238.1 L363.1 246.4 L363.8 249.4 L351.7 259.4 L352.6 266.6 L347.5 280.0 L361.3 299.0 L369.7 296.2 L365.9 309.4 L360.5 307.9 L351.5 312.5 L350.4 320.4 L342.8 328.2 L338.3 339.2 L337.2 342.9 L340.5 347.6 L344.3 370.4 L334.5 372.2 L317.4 385.0 L301.1 375.9 L294.6 377.1 L277.9 373.5 L274.3 376.7 L261.8 379.2 L258.9 382.7 L256.2 380.7 L261.3 370.5 L260.8 369.2 L261.0 368.8 L260.5 368.3 L263.7 363.1 L262.8 361.2 L262.7 359.4 L264.5 357.2 L266.7 351.1 L267.2 350.7 L267.0 317.8 L262.0 314.6 L267.7 299.8 L267.7 287.0 L260.5 274.6 L254.4 279.2 L243.8 281.5 L245.9 273.4 L241.5 263.8 L248.0 262.0 L250.5 264.8 L255.0 257.1 L256.7 257.5 L258.6 256.9 L255.4 256.5 L258.6 255.1 L256.7 254.6 L257.6 253.8 L257.7 252.0 L256.2 254.5 L254.4 249.8 L249.8 260.5 L244.6 262.5 L241.9 261.1 L238.2 263.1 L230.7 261.5 L228.5 255.3 Z" fill="none" stroke="#f5f8fb" stroke-width="4" stroke-linejoin="round"/><circle cx="235.1" cy="214.4" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><circle cx="232.9" cy="240.5" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><circle cx="251.9" cy="196.7" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><circle cx="259.3" cy="381.6" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><circle cx="237.9" cy="262.6" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><circle cx="273.1" cy="85.1" r="7" fill="ACC" stroke="#0a0b0f" stroke-width="2"/><path d="M20 80 q20 -14 40 0 t40 0 t40 0" stroke="ACC" stroke-opacity="0.80" stroke-width="4" fill="none"/><path d="M28 175 q20 -14 40 0 t40 0 t40 0" stroke="ACC" stroke-opacity="0.65" stroke-width="4" fill="none"/><path d="M36 270 q20 -14 40 0 t40 0 t40 0" stroke="ACC" stroke-opacity="0.50" stroke-width="4" fill="none"/>'''
ART['portugal1992'] = ART['portugal'] + '<text x="20" y="390" font-family="DejaVu Sans" font-weight="700" font-size="44" fill="#f2c335">1992</text>'

import re as _re
ART['boardart'] = _re.sub(r'<text[^>]*>[^<]*</text>', '', ART['board'])

DATA = [
    dict(slug='surf-skate-books', acc='#44d62c', art='books',
         kicker='INSPIRATION — BOOKS', t1='Books for', t2='Surfers & Skaters',
         lead='Culture, history and the road: the reading list for board riders.',
         tags='FINNEGAN · NUNN · MULLEN · WARSHAW'),
    dict(slug='legendary-surf-skate-films', acc='#44d62c', art='film',
         kicker='INSPIRATION — LEGENDARY FILMS', t1='Surf & Skate', t2='Films',
         lead='From The Endless Summer to Video Days, Dogtown and Mid90s.',
         tags='ENDLESS SUMMER · ANIMAL CHIN · VIDEO DAYS · MID90S'),
    dict(slug='uncrowded-surf-travel', acc='#44d62c', art='compass',
         kicker='INSPIRATION — TRAVEL', t1='Uncrowded', t2='Waves',
         lead='Nine surf trips away from the crowds, from the Arctic to Papua New Guinea.',
         tags='LOFOTEN · THURSO · NAMIBIA · PNG'),
    dict(slug='state-of-skateboarding-2026', acc='#e0242f', art='globedeck',
         kicker='SKATEBOARD INDUSTRY — 2026', t1='The State of', t2='Skateboarding',
         lead='Money, power and the big skate nations, from the USA and Brazil to Japan.',
         tags='INDUSTRY · NATIONS · PROS · EUROPE'),
    dict(slug='surf-spots-portugal-guide', acc='#3b8eea', art='portugal',
         kicker='SURF GUIDE — PORTUGAL', t1='Surfing', t2='Portugal',
         lead='Six regions, seven maps: from the Minho to Ericeira, Peniche and Sagres.',
         tags='ERICEIRA · PENICHE · NAZARÉ · ALGARVE'),
    dict(slug='portugal-surf-1992-stormrider-guide', acc='#3b8eea', art='portugal1992',
         kicker='SURF HISTORY — PORTUGAL', t1='Portugal', t2='in 1992',
         lead='What the first Stormrider Guide Europe saw, and what changed.',
         tags='72 BREAKS · AZORES · THEN & NOW'),
    dict(slug='skateboarding-hall-of-fame-museum', acc='#e0242f', art='museum',
         kicker='SKATEBOARD HISTORY — HALL OF FAME', t1='Hall of Fame', t2='& Museum',
         lead="Todd Huber's collection in Simi Valley and all 232 inductees, 2009–2026.",
         tags='SIMI VALLEY · 2009–2026 · LEGENDS'),
    dict(slug='skateboard-graphics-history', acc='#e0242f', art='deck',
         kicker='SKATEBOARD DESIGN — GRAPHICS', t1='The Art Under', t2='Your Feet',
         lead='Dogtown crosses, skulls, a screaming hand and the 1990s rip-offs.',
         tags='DOGTOWN · POWELL · SANTA CRUZ · WORLD'),
    dict(slug='surfboard-art-history', acc='#3b8eea', art='boardart',
         kicker='SURF DESIGN — BOARD ART', t1='The Surfboard', t2='as Canvas',
         lead='Pinlines, resin tints, airbrush and the artists who drew surf culture.',
         tags='TINT · PINLINE · AIRBRUSH · SURF ART'),
    dict(slug='snowboard-graphics-history', acc='#5cb6ff', art='boards',
         kicker='SNOWBOARD DESIGN — GRAPHICS', t1='From Logo', t2='to Canvas',
         lead='The boards that changed how snowboards look, from 1977 to today.',
         tags='MYSTERY AIR · OUIJA · LIB TECH · CAPITA'),
    dict(slug='board-culture-photographers', acc='#44d62c', art='camera',
         kicker='INSPIRATION — PHOTOGRAPHY', t1='Through', t2='the Lens',
         lead='The photographers who framed surf, skate and snowboard culture.',
         tags='GRANNIS · BOLSTER · FRIEDMAN · BRITTAIN'),
    dict(slug='snow-guide-world-slopes-2026-27', acc='#5cb6ff', art='mountain',
         kicker='SNOWBOARD GUIDE — SEASON 2026/27', t1='Where the', t2='Snow Is',
         lead='USA, Canada, Japan and Europe: openings, snow reports and avalanche info.',
         tags='OPENING DATES · SNOW · AVALANCHE'),

    dict(slug='la-punk-skate-scene-1980s', acc='#e0242f', art='punk',
         kicker='SKATEBOARD HISTORY — LA 1975–1990', t1='Skate & Destroy', t2='LA Punk',
         lead='Dogtown pools, Black Flag, Suicidal Tendencies and the Skate Rock tapes.',
         tags='Z-BOYS · SST · VENICE · THRASHER'),
    dict(slug='guggenheim-history-museums', acc='#44d62c', art='spiral',
         kicker='INSPIRATION — ARCHITECTURE & ART', t1='The Guggenheim', t2='Story',
         lead='From a spiral on Fifth Avenue to titanium in Bilbao and a new museum in Abu Dhabi.',
         tags='NEW YORK · VENICE · BILBAO · ABU DHABI'),
    dict(slug='snowboard-history', acc='#5cb6ff', art='mountain',
         kicker='SNOWBOARD HISTORY — 1965 TO TODAY', t1='From Snurfer', t2='to Olympic Gold',
         lead='A garage in Michigan, resort bans and the road to Nagano 1998.',
         tags='SNURFER · BURTON · SIMS · OLYMPICS'),
    dict(slug='snowboard-types-how-to-choose', acc='#5cb6ff', art='boards',
         kicker='SNOWBOARD GUIDE — BUYING', t1='Choose the Right', t2='Snowboard',
         lead='Board types, camber and rocker, flex, length and width explained.',
         tags='TYPES · PROFILES · SIZE · WIDTH'),
    dict(slug='surfboards-explained-volume-shape', acc='#3b8eea', art='board',
         kicker='SURF GUIDE — BOARDS', t1='Surfboards', t2='Explained',
         lead='Volume in litres, rocker, rails, fins and how to buy the right board.',
         tags='VOLUME · SHAPE · FINS · BUYING'),
    dict(slug='physics-of-surf-waves', acc='#3b8eea', art='waves',
         kicker='SURF SCIENCE — WAVES', t1='The Physics', t2='of Surf',
         lead='How a distant storm becomes a wave you can ride.',
         tags='SWELL · PERIOD · REFRACTION · BREAKING'),
    dict(slug='big-wave-surfing-nazare-mavericks', acc='#3b8eea', art='bigwave',
         kicker='BIG WAVE SURFING', t1='Nazaré &', t2='Mavericks',
         lead='Why the waves get so big, the world records and the risks.',
         tags='CANYON · REEF · RECORDS · TOW-IN'),
]

TPL = '''<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a0b0f;font-family:'DejaVu Sans',sans-serif;position:relative;overflow:hidden}
.bar{position:absolute;top:0;left:0;right:0;height:15px;background:ACC}
.k{position:absolute;left:70px;top:66px;color:ACC;font-weight:700;font-size:22px;letter-spacing:.5px}
.t{position:absolute;left:70px;top:130px;font-weight:700;font-size:64px;line-height:76px;color:#f4f4f4;width:640px}
.t span{color:ACC}
.l{position:absolute;left:70px;top:310px;width:470px;color:#9a9da3;font-size:28px;line-height:40px}
.g{position:absolute;left:70px;top:456px;color:#9a9da3;font-weight:700;font-size:20px;letter-spacing:.5px}
.d{position:absolute;right:72px;bottom:32px;color:#9a9da3;font-weight:700;font-size:21px;letter-spacing:3.4px}
svg{position:absolute;right:50px;top:90px}
</style></head><body><div class="bar"></div>
<div class="k">KICK</div><div class="t">T1<br><span>T2</span></div>
<div class="l">LEAD</div><div class="g">TAGS</div><div class="d">ELEMENTACTION.COM</div>
<svg width="450" height="400" viewBox="0 0 450 400">ART</svg></body></html>'''

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1200, 'height': 630})
    for d in [x for x in DATA if len(sys.argv) < 2 or x['slug'] in sys.argv[1:]]:
        html = (TPL.replace('ART', ART[d['art']]).replace('ACC', d['acc']).replace('KICK', d['kicker'])
                .replace('T1', d['t1']).replace('T2', d['t2']).replace('LEAD', d['lead']).replace('TAGS', d['tags']))
        pg.set_content(html)
        out = OUT / d['slug'] / 'og-image.png'
        out.parent.mkdir(parents=True, exist_ok=True)
        pg.screenshot(path=str(out))
        print('ok', out)
    b.close()
