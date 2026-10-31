/**
 * "Buy me a coffee"-knappen. En vanlig länk till Martins PayPal.Me —
 * inga skript, inga cookies. Byt länk här om PayPal-adressen ändras.
 */
export const PAYPAL_URL = 'https://paypal.me/martinbjk1';

export function CoffeeButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <a
      href={PAYPAL_URL}
      target="_blank"
      rel="noreferrer noopener"
      className={`coffee-btn inline-flex items-center gap-2 rounded-full bg-[#f2c335] px-4 py-2 text-sm font-semibold text-[#1c1d1f] no-underline transition hover:bg-[#ffd451] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
        <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M8 3c0 1.2 1 1.6 1 2.8M12 3c0 1.2 1 1.6 1 2.8" />
      </svg>
      {label}
    </a>
  );
}
