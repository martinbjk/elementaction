import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import { LogoMark, SectionMark } from '../../src/components/Logo';
const secs = ['surfing', 'skateboard', 'snowboard', 'inspiration'] as const;
const names = { surfing: 'water', skateboard: 'concrete', snowboard: 'snow', inspiration: 'mind' } as const;
const xmlns = (s: string) => s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
writeFileSync('public/brand/mark.svg', xmlns(renderToStaticMarkup(<LogoMark size={512} />)) + '\n');
writeFileSync('public/brand/icon.svg', xmlns(renderToStaticMarkup(<LogoMark size={512} />)) + '\n');
for (const s of secs) writeFileSync(`public/brand/mark-${names[s]}.svg`, xmlns(renderToStaticMarkup(<SectionMark section={s} size={512} title={`${names[s]} action`} />)) + '\n');
const big = (s: string) => s;
writeFileSync(process.argv[2]!, `<html><body style="margin:0;background:#0e0f11;display:flex;gap:28px;padding:28px;align-items:center">
${renderToStaticMarkup(<LogoMark size={200} />)}
${secs.map((s) => renderToStaticMarkup(<SectionMark section={s} size={140} />)).join('')}
<div style="background:#fff;padding:12px;border-radius:8px">${renderToStaticMarkup(<LogoMark size={32} />)} ${renderToStaticMarkup(<LogoMark size={16} />)}</div>
</body></html>`);
