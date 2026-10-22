import type { Config } from 'tailwindcss';

/**
 * Två lager färger:
 *  - asphalt/chalk/concrete/spray/hazard/live: kvar från skateboard-
 *    eventcalendar så att de flyttade artikel-embeds (parkfinder,
 *    vågpool-listan, surfverktygen) ser ut exakt som förut.
 *  - sec-*: sektionens tema. Värdena sätts i globals.css per
 *    [data-section="…"], så samma komponent får rätt färger i alla
 *    fyra sektioner.
 */
const sec = (name: string) => `rgb(var(--sec-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sec: {
          bg: sec('bg'),
          deep: sec('deep'),
          ink: sec('ink'),
          muted: sec('muted'),
          accent: sec('accent'),
          'accent-ink': sec('accent-ink'),
          line: sec('line'),
          card: sec('card'),
          paper: sec('paper-accent')
        },
        ocean: { DEFAULT: '#1d6fe0', deep: '#06213f', mid: '#0b3d73', foam: '#cfe6ff' },
        cement: { DEFAULT: '#8a8f94', dark: '#2a2c2f', mid: '#5c6166', light: '#d4d6d8' },
        snow: { DEFAULT: '#f5f8fb', ice: '#dce8f3', ink: '#0d2240' },
        fire: { DEFAULT: '#e0242f', dark: '#a8121b', titanium: '#c9ced3', steel: '#8d959d' },
        asphalt: { 950: '#101012', 900: '#16161a', 800: '#1e1e22', 700: '#2c2b28', 600: '#3a3936' },
        chalk: { 100: '#f2f0eb', 300: '#c9c5ba', 500: '#9a968c' },
        concrete: { 100: '#edeae2', 200: '#e2ded3', 300: '#cfcabb' },
        spray: { DEFAULT: '#ff5a1f', dark: '#d94413', light: '#ff8a5c' },
        hazard: { DEFAULT: '#f5d90a', dark: '#c9b100' },
        live: '#22c55e'
      },
      fontFamily: {
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        head: ['var(--sec-font)', '"Inter Variable"', 'sans-serif'],
        surf: ['"Fraunces Variable"', 'Georgia', 'serif'],
        skate: ['"Archivo Black"', 'Impact', 'sans-serif'],
        snow: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        fire: ['"Syne Variable"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        'mono-tight': ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      keyframes: {
        'pulse-live': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        swell: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-600px)' } },
        fall: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(600px)' } }
      },
      animation: {
        'pulse-live': 'pulse-live 1.4s ease-in-out infinite',
        swell: 'swell 18s linear infinite',
        'swell-slow': 'swell 30s linear infinite',
        fall: 'fall 14s linear infinite'
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,16,18,.06), 0 6px 16px -4px rgba(16,16,18,.10)',
        'card-dark': '0 1px 2px rgba(0,0,0,.3), 0 8px 20px -4px rgba(0,0,0,.45)'
      },
      borderRadius: { stamp: '2px' }
    }
  },
  plugins: []
};

export default config;
