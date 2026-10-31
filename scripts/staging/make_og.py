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

import re as _re
ART['boardart'] = _re.sub(r'<text[^>]*>[^<]*</text>', '', ART['board'])

DATA = [
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
