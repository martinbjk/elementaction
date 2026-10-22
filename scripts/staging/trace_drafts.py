"""Spårar Martins egna märkesutkast (PNG) till SVG-banor i en 100×100-bricka.
Bokstäverna tas bort (ACTION läggs på i samma typsnitt i alla märken),
kvar blir motiven: vågen + surfaren, och huvudet med spiralen."""
import sys, numpy as np
from PIL import Image
from scipy import ndimage
import potrace

def load(path):
    a = np.array(Image.open(path).convert('RGB')).astype(int)
    col = np.abs(a - a[5, 5]).sum(2) > 60
    ys, xs = np.nonzero(col)
    cx, cy, R = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2, (xs.max() - xs.min()) / 2
    white = (a.min(2) > 170) & col
    lab, _ = ndimage.label(white)
    return lab, cx, cy, R

def trace(mask, cx, cy, R):
    k = 49 / R
    T = lambda p: (50 + (p.x - cx) * k, 50 + (p.y - cy) * k)
    bm = potrace.Bitmap(~mask)  # potracer behandlar False som förgrund
    plist = bm.trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.3)
    out = []
    fmt = lambda p: f'{T(p)[0]:.2f} {T(p)[1]:.2f}'
    for curve in plist:
        parts = [f'M{fmt(curve.start_point)}']
        for seg in curve.segments:
            if seg.is_corner:
                parts.append(f'L{fmt(seg.c)}L{fmt(seg.end_point)}')
            else:
                parts.append(f'C{fmt(seg.c1)} {fmt(seg.c2)} {fmt(seg.end_point)}')
        parts.append('Z')
        out.append(''.join(parts))
    d = ''.join(out)
    import re
    return re.sub(r'(\d+\.\d)0\b', r'\1', d)

def parts(lab, cx, cy, R):
    """Delar upp i motivdelar; bokstäverna (små delar nära kanten) tas bort."""
    keep = []
    for i in range(1, lab.max() + 1):
        yy, xx = np.nonzero(lab == i)
        if len(xx) < 40:
            continue
        d = np.hypot(xx.mean() - cx, yy.mean() - cy) / R
        if d > 0.74 and len(xx) < 8000:
            continue  # en bokstav i ACTION
        keep.append((i, len(xx), xx.mean(), yy.mean()))
    return keep

src = sys.argv[1]
lab, cx, cy, R = load(f'{src}/water.png')
kp = parts(lab, cx, cy, R)
print('water parts', [(i, a, int(x), int(y)) for i, a, x, y in kp])
# surfaren+brädan är delen vars tyngdpunkt ligger lägst till höger; resten är vågen
rider_id = max(kp, key=lambda t: t[2] + t[3])[0]
wave = trace(np.isin(lab, [i for i, *_ in kp if i != rider_id]), cx, cy, R)
rider = trace(lab == rider_id, cx, cy, R)
lab, cx, cy, R = load(f'{src}/mind.png')
kp = parts(lab, cx, cy, R)
print('mind parts', [(i, a, int(x), int(y)) for i, a, x, y in kp])
head = trace(np.isin(lab, [i for i, *_ in kp]), cx, cy, R)
open('src/components/brand-traced.ts', 'w').write(
    '// Genererad av scripts/staging/trace_drafts.py från Martins egna utkast.\n'
    '// Koordinater i en 100×100-bricka (centrum 50,50, radie 49). Rita med fillRule="evenodd".\n'
    f'export const WATER_WAVE = "{wave}";\n\n'
    f'export const WATER_RIDER = "{rider}";\n\n'
    f'export const MIND_HEAD = "{head}";\n')
print('ok', len(wave), len(rider), len(head))
