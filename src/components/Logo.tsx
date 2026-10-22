/**
 * ELEMENTACTION-LOGOTYP
 *
 * Märket är fyra rutor — en per element/sektion, i sektionens färg:
 *   uppe vänster  vatten  (blå)   en våg som bryter
 *   uppe höger    betong  (grå)   en quarterpipe i profil
 *   nere vänster  snö     (vit)   en bergstopp
 *   nere höger    eld     (röd)   en låga
 * Ordmärket står i två rader, ELEMENT / ACTION, och ärver textfärgen
 * (currentColor) så att det fungerar på både mörk och ljus bakgrund.
 *
 * Fristående SVG-filer för profilbilder, favicon m.m. finns i
 * public/brand/ (genereras inte — de är handskrivna kopior av detta).
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="ElementAction"
    >
      {/* vatten */}
      <rect x="0" y="0" width="22" height="22" rx="3" fill="#1d6fe0" />
      <path d="M2 15c3-1 4-6 8-6 3 0 4 3 2 5-1 1 1 2 3 1 2-1 3-1 5 0v7H2z" fill="#f5f8fb" />
      {/* betong */}
      <rect x="26" y="0" width="22" height="22" rx="3" fill="#8a8f94" />
      <path d="M30 4v14h14v-1c-7 0-11-4-11-11V4z" fill="#2a2c2f" />
      <rect x="29" y="3" width="5" height="1.6" fill="#f5f8fb" />
      {/* snö */}
      <rect x="0" y="26" width="22" height="22" rx="3" fill="#f5f8fb" />
      <path d="M2 45l7-12 3 4 3-6 5 14z" fill="#0d2240" />
      <path d="M9 33l1.6 2.7-1.6 1-1.4-1z M15 31l1.7 3.4-1.7-.8-1.4 1.2z" fill="#f5f8fb" />
      {/* eld */}
      <rect x="26" y="26" width="22" height="22" rx="3" fill="#e0242f" />
      <path d="M37 29c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 2 3 2 4 2-2 2-5 2-8z" fill="#f5f8fb" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark size={34} />
      <span className="flex flex-col font-skate text-[13px] leading-[0.95] tracking-[0.08em]">
        <span>ELEMENT</span>
        <span>ACTION</span>
      </span>
    </span>
  );
}
