"""Byter domäntexten i artiklarnas delningsbilder mot ELEMENTACTION.COM.
Målar över den gamla texten med bakgrundsfärgen bredvid och skriver den
nya texten i samma höjd, färg och linjering."""
from PIL import Image, ImageDraw, ImageFont
from collections import Counter
import sys

BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'
SANS = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
SANSR = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'

def text_color(im, box, bg):
    x0, y0, x1, y1 = box
    c = Counter()
    for x in range(x0, x1 + 1):
        for y in range(y0, y1 + 1):
            p = im.getpixel((x, y))
            if sum(abs(a - b) for a, b in zip(p, bg)) > 120:
                c[p] += 1
    return c.most_common(1)[0][0]

def draw_tracked(d, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + tracking

def width_tracked(d, text, font, tracking):
    return sum(d.textlength(ch, font=font) for ch in text) + tracking * (len(text) - 1)

def replace(path, jobs):
    im = Image.open(path).convert('RGB')
    d = ImageDraw.Draw(im)
    for box, text, align, fontfile, tracking in jobs:
        x0, y0, x1, y1 = box
        bg = im.getpixel((max(0, x0 - 6), y0 - 6)) if align == 'right' else im.getpixel((x1 + 8 if x1 + 8 < im.width else x0 - 6, y0 - 6))
        col = text_color(im, box, bg)
        d.rectangle([x0 - 3, y0 - 3, x1 + 3, y1 + 3], fill=bg)
        h = y1 - y0 + 1
        # versal-/x-höjd: hitta fontstorlek där 'E' (eller 'k') har rätt höjd
        ref = 'E' if text.isupper() or text[0].isupper() else 'k'
        size = 6
        while True:
            f = ImageFont.truetype(fontfile, size + 1)
            bb = f.getbbox(ref)
            if bb[3] - bb[1] > h: break
            size += 1
        f = ImageFont.truetype(fontfile, size)
        top = y0 - f.getbbox(ref)[1]
        w = width_tracked(d, text, f, tracking)
        x = x1 - w if align == 'right' else x0
        draw_tracked(d, (x, top), text, f, col, tracking)
    im.save(path, optimize=True)
    print('ok', path)

R, L = 'right', 'left'
U = 'ELEMENTACTION.COM'
std = [((768, 573, 1129, 585), U, R, BOLD, 2.2)]
JOBS = {
    'flying-with-a-skateboard/og-image.png': std,
    'flying-with-a-surfboard/og-image.png': [((769, 571, 1129, 583), U, R, BOLD, 2.2)],
    'injured-skating-abroad/og-image.png': std,
    'style-is-everything/og-image.png': std,
    'verified-indoor-skateparks-world/og-image.png': std,
    'flying-with-a-skateboard/og-articles.png': [((687, 573, 1127, 588), U, R, BOLD, 2.6)],
    'park-world-championship-asuncion-2026/og-image.png': [((687, 579, 1127, 594), U, R, BOLD, 2.6)],
    'street-world-championship-asuncion-2026/og-image.png': [((687, 579, 1127, 594), U, R, BOLD, 2.6)],
    'surf-forecast-sites-and-buoys-guide/og-image.png': [((687, 579, 1127, 594), U, R, BOLD, 2.6)],
    'surf-forecast-sites-and-buoys-guide/og-image-sv.png': [((687, 579, 1127, 594), U, R, BOLD, 2.6)],
    'cold-water-surf-spots-norway/og-image.png': [((71, 574, 471, 588), U, L, BOLD, 2.6)],
    'surfable-wave-pools-world/og-image.png': [((71, 574, 471, 588), U, L, BOLD, 2.6)],
    'skateboard-kullager-guide/og-image-en.png': [((61, 564, 384, 582), 'elementaction.com', L, MONO, 0)],
    'skateboard-kullager-guide/og-image.png': [((61, 564, 384, 582), 'elementaction.com', L, MONO, 0)],
    'cold-water-surf-spots-sweden-denmark/og-cold-water.png': [((894, 590, 1134, 599), U, R, MONO, 1.0)],
    'world-skate-games-2026-vert-asuncion/og-image.png': [
        ((71, 546, 485, 568), 'ElementAction', L, SANS, 0),
        ((71, 585, 388, 601), 'elementaction.com', L, SANSR, 0),
    ],
}
for p, j in JOBS.items():
    replace(p, j)
