"""Gör ordet ACTION till SVG-banor längs ringens övre båge (viewBox 0 0 100 100),
så att märket ser likadant ut överallt utan att typsnittet behöver laddas."""
import math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont('node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff')
gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font['head'].unitsPerEm
CAP = font['OS/2'].sCapHeight or 0.7 * upm

TEXT = 'ACTION'
CX = CY = 50
R_TEXT = 39.2        # baslinjens radie
CAP_H = 6.9          # versalhöjd i viewBox-enheter
TRACK = 2.2          # extra avstånd mellan bokstäver (enheter längs bågen)
s = CAP_H / CAP

widths = [gs[cmap[ord(c)]].width * s for c in TEXT]
total = sum(widths) + TRACK * (len(TEXT) - 1)
# bågvinkel från bågens längd; texten centreras runt toppen (-90°)
ang_total = total / R_TEXT
a = -math.pi / 2 - ang_total / 2
out = []
for c, w in zip(TEXT, widths):
    mid = a + (w / 2) / R_TEXT
    # glyfens mitt hamnar på bågen, bokstaven står vinkelrätt mot radien
    pen = SVGPathPen(gs)
    x0 = CX + R_TEXT * math.cos(mid); y0 = CY + R_TEXT * math.sin(mid)
    rot = mid + math.pi / 2
    cs, sn = math.cos(rot), math.sin(rot)
    # font-y uppåt → svg-y nedåt; flytta glyfen så att dess mitt (w/2) ligger i origo
    # matris: [x'] = R * S * (x - w/2) där S = (s, -s)
    t = TransformPen(pen, (s * cs, s * sn, s * sn, -s * cs, x0 - (w / 2) * cs, y0 - (w / 2) * sn))
    gs[cmap[ord(c)]].draw(t)
    out.append(pen.getCommands())
    a += (w + TRACK) / R_TEXT
d = ' '.join(out)
d = ' '.join(f'{float(x):.2f}'.rstrip('0').rstrip('.') if x.replace('.', '').replace('-', '').isdigit() else x for x in d.replace(',', ' ').split())
open('src/components/brand-paths.ts', 'w').write(
    '// Genererad av scripts/staging/action_arc.py — ordet ACTION som banor längs ringens övre båge.\n'
    f'export const ACTION_ARC_PATH =\n  {d!r};\n'.replace("'", '"'))
print(len(d), 'tecken')
