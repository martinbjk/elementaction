"""Gör ordet ACTION till SVG-banor längs en övre båge (viewBox 0 0 100 100),
så att märkena ser likadana ut överallt utan att typsnittet behöver laddas.
Två varianter: RING (runt rundmärkets färgcirkel) och BADGE (inuti ett
sektionsmärke)."""
import math, re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont('node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff')
gs = font.getGlyphSet(); cmap = font.getBestCmap()
CAP = font['OS/2'].sCapHeight

def arc(text, r, cap_h, track, cx=50, cy=50):
    s = cap_h / CAP
    widths = [gs[cmap[ord(c)]].width * s for c in text]
    total = sum(widths) + track * (len(text) - 1)
    a = -math.pi / 2 - (total / r) / 2
    out = []
    for c, w in zip(text, widths):
        mid = a + (w / 2) / r
        x0 = cx + r * math.cos(mid); y0 = cy + r * math.sin(mid)
        rot = mid + math.pi / 2; cs, sn = math.cos(rot), math.sin(rot)
        pen = SVGPathPen(gs)
        t = TransformPen(pen, (s * cs, s * sn, s * sn, -s * cs, x0 - (w / 2) * cs, y0 - (w / 2) * sn))
        gs[cmap[ord(c)]].draw(t)
        out.append(pen.getCommands())
        a += (w + track) / r
    d = ' '.join(out)
    return re.sub(r'-?\d+\.\d+', lambda m: ('%.2f' % float(m.group())).rstrip('0').rstrip('.'), d)

ring = arc("ACTION", 37.4, 9.4, 2.6)
badge = arc('ACTION', 33.5, 8.6, 2.2)
open('src/components/brand-paths.ts', 'w').write(
    '// Genererad av scripts/staging/action_arc.py — ordet ACTION som banor längs en övre båge.\n'
    '// RING: runt rundmärkets färgcirkel. BADGE: inuti ett sektionsmärke.\n'
    f'export const ACTION_ARC_RING = "{ring}";\n\n'
    f'export const ACTION_ARC_BADGE = "{badge}";\n')
print('ok')
