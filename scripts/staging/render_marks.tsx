import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import { LogoMark, SectionMark } from '../../src/components/Logo';
const secs = ['surfing', 'skateboard', 'snowboard', 'inspiration'] as const;
const names = { surfing: 'water', skateboard: 'concrete', snowboard: 'snow', inspiration: 'mind' } as const;
const x = (s: string) => s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ') + '\n';
writeFileSync('public/brand/mark.svg', x(renderToStaticMarkup(<LogoMark size={512} />)));
writeFileSync('public/brand/mark-on-light.svg', x(renderToStaticMarkup(<LogoMark size={512} text="#16181b" />)));
writeFileSync('public/brand/icon.svg', x(renderToStaticMarkup(<LogoMark size={512} />)));
for (const s of secs) {
  writeFileSync(`public/brand/mark-${names[s]}.svg`, x(renderToStaticMarkup(<SectionMark section={s} size={512} title={`${names[s]} action`} />)));
  writeFileSync(`public/brand/mark-${names[s]}-small.svg`, x(renderToStaticMarkup(<SectionMark section={s} size={64} detail={false} title={`${names[s]} action`} />)));
}
writeFileSync(process.argv[2]!, `<html><body style="margin:0;background:#20242b;padding:24px">
<div style="display:flex;gap:24px;align-items:center">${renderToStaticMarkup(<LogoMark size={230} />)}
<div style="background:#f3f5f7;padding:10px;border-radius:12px">${renderToStaticMarkup(<LogoMark size={120} text="#16181b" />)}</div></div>
<div style="display:flex;gap:20px;margin-top:20px">${secs.map((s) => renderToStaticMarkup(<SectionMark section={s} size={230} />)).join('')}</div>
<div style="display:flex;gap:14px;margin-top:20px;align-items:center">${secs.map((s) => renderToStaticMarkup(<SectionMark section={s} size={22} />)).join('')}
${renderToStaticMarkup(<LogoMark size={40} />)} ${renderToStaticMarkup(<LogoMark size={20} />)}</div>
</body></html>`);
