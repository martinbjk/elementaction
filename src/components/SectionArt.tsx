import type { SectionId } from '@/lib/sections';

/**
 * BILDVÄRLDEN för varje sektion — ritad i SVG (ingen fotografi behövs,
 * laddar direkt, skalar skarpt). Fyller sin förälder helt
 * (absolut positionerad, "slice" beskär som object-fit: cover).
 *
 *   surfing      dyningslinjer + en bärande våg, långsamt rullande
 *   skateboard   en bowl i profil med coping och formgjutningsfogar
 *   snowboard    bergskedjor i lager med fallande snö
 *   inspiration  böjda titanskal à la Guggenheim Bilbao, med ett rött plan
 *
 * Rörelsen stängs av automatiskt vid prefers-reduced-motion (globals.css).
 */
export function SectionArt({ section, className = '' }: { section: SectionId; className?: string }) {
  const common = {
    viewBox: '0 0 600 600',
    preserveAspectRatio: 'xMidYMid slice',
    className: `pointer-events-none absolute inset-0 h-full w-full ${className}`,
    'aria-hidden': true
  } as const;

  if (section === 'surfing') return <SurfArt {...common} />;
  if (section === 'skateboard') return <SkateArt {...common} />;
  if (section === 'snowboard') return <SnowArt {...common} />;
  return <FireArt {...common} />;
}

type SvgProps = React.SVGProps<SVGSVGElement>;

/**
 * En sinusvåg som är dubbelt så bred som vyn, så den kan rulla sömlöst.
 * Våglängden måste gå jämnt upp i 600 (animationen flyttar 600 enheter).
 */
function wave(y: number, amp: number, len: number, width = 1200) {
  let d = `M0 ${y}`;
  for (let x = 0; x < width; x += len) {
    d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
  }
  return d;
}

function SurfArt(props: SvgProps) {
  return (
    <svg {...props}>
      <defs>
        <linearGradient id="surf-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b3d73" />
          <stop offset="1" stopColor="#03142a" />
        </linearGradient>
        <linearGradient id="surf-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d6fe0" />
          <stop offset="1" stopColor="#06213f" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#surf-sea)" />
      {/* dyningslinjer, som på en vågkarta */}
      <g fill="none" stroke="#9fd0ff" strokeOpacity=".35" strokeWidth="1.2">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={wave(90 + i * 34, 6 + i * 0.8, [100, 120, 150, 200][i % 4] ?? 150)}
            className={i % 2 ? 'animate-swell-slow' : 'animate-swell'}
          />
        ))}
      </g>
      {/* den bärande vågen: vågfront, läpp som slår över och en tub (hålet) */}
      <path
        d="M0 600V478c120-8 230-58 310-148 60-68 120-105 180-102 70 4 110 62 100 122-6 40-38 60-65 50 25-20 27-55 5-78-30-32-90-22-125 28-45 65-75 120-75 250z"
        fill="url(#surf-face)"
      />
      <path
        d="M310 330c60-68 120-105 180-102 70 4 110 62 100 122-6 40-38 60-65 50"
        fill="none"
        stroke="#f5f8fb"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M0 560c120 0 230-30 330-90" fill="none" stroke="#f5f8fb" strokeOpacity=".45" strokeWidth="2" />
      <path d="M0 590c150-4 260-30 340-70" fill="none" stroke="#f5f8fb" strokeOpacity=".25" strokeWidth="2" />
    </svg>
  );
}

function SkateArt(props: SvgProps) {
  return (
    <svg {...props}>
      <rect width="600" height="600" fill="#2a2c2f" />
      {/* formgjutningsfogar i betongen */}
      <g stroke="#ffffff" strokeOpacity=".07">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="600" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 120} x2="600" y2={i * 120} />
        ))}
      </g>
      {/* bowlen i profil: väggar, transition, flatbotten */}
      <path
        d="M40 150v120c0 150 70 230 200 230h120c130 0 200-80 200-230V150"
        fill="#3a3d41"
        stroke="#d4d6d8"
        strokeWidth="3"
      />
      <path d="M40 150v120c0 150 70 230 200 230h120c130 0 200-80 200-230V150H40z" fill="#5c6166" opacity=".35" />
      {/* coping: rör längs kanten */}
      <circle cx="40" cy="150" r="9" fill="#d4d6d8" />
      <circle cx="560" cy="150" r="9" fill="#d4d6d8" />
      <rect x="0" y="140" width="40" height="10" fill="#d4d6d8" opacity=".6" />
      <rect x="560" y="140" width="40" height="10" fill="#d4d6d8" opacity=".6" />
      {/* brädan, sedd underifrån: deck, truckar, hjul och en röd grafik */}
      <g transform="translate(300 330) rotate(-28) scale(0.8) translate(-300 -330)">
        <rect x="235" y="110" width="130" height="440" rx="65" fill="#16171a" stroke="#d4d6d8" strokeWidth="3" />
        <path d="M262 200h76v200h-76z" fill="#e0242f" />
        <path d="M262 250h76M262 300h76M262 350h76" stroke="#16171a" strokeWidth="10" />
        {[175, 485].map((y) => (
          <g key={y}>
            <rect x="225" y={y - 7} width="150" height="14" rx="7" fill="#b7bbbf" />
            <rect x="205" y={y - 16} width="30" height="32" rx="8" fill="#f2f2f0" />
            <rect x="365" y={y - 16} width="30" height="32" rx="8" fill="#f2f2f0" />
            <circle cx="300" cy={y} r="9" fill="#5c6166" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function SnowArt(props: SvgProps) {
  return (
    <svg {...props}>
      <defs>
        <linearGradient id="snow-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dce8f3" />
          <stop offset="1" stopColor="#f5f8fb" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#snow-sky)" />
      <circle cx="450" cy="120" r="46" fill="#ffffff" />
      {/* bakre kedja */}
      <path d="M0 360l90-120 60 70 110-170 90 130 70-80 180 190v220H0z" fill="#b9cde2" />
      {/* främre kedja med snöfält */}
      <path d="M0 470l150-200 70 90 120-180 140 200 60-50 60 90v180H0z" fill="#0d2240" />
      <path
        d="M150 270l-34 46 22-6 12 18 16-24 18 16zM340 180l-40 58 24-10 16 22 20-30 22 16z"
        fill="#f5f8fb"
      />
      {/* snowboardspår nerför fältet */}
      <path d="M350 250c-40 60 40 90 0 150s40 90 10 200" fill="none" stroke="#f5f8fb" strokeWidth="3" strokeOpacity=".7" />
      {/* fallande snö */}
      <g fill="#ffffff" className="animate-fall">
        {[0, -600].map((offset) =>
          Array.from({ length: 46 }, (_, i) => (
            <circle
              key={`${offset}-${i}`}
              cx={(i * 137) % 600}
              cy={((i * 89) % 600) + offset}
              r={1 + (i % 3)}
              opacity={0.5 + (i % 4) * 0.12}
            />
          ))
        )}
      </g>
    </svg>
  );
}

function FireArt(props: SvgProps) {
  // Titanvolymer som böjer sig som Gehrys Guggenheim i Bilbao: varje
  // volym har en metallgradient och tunna skarvlinjer som följer kurvan
  // (fasadens titanplåtar). Den röda volymen är elden.
  const seams = (d: string, n: number, dx: number, dy: number) =>
    Array.from({ length: n }, (_, i) => (
      <path key={i} d={d} transform={`translate(${dx * (i + 1)} ${dy * (i + 1)})`} />
    ));
  return (
    <svg {...props}>
      <defs>
        <linearGradient id="ti-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef1f3" />
          <stop offset="1" stopColor="#c3c9ce" />
        </linearGradient>
        <linearGradient id="ti-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfcfd" />
          <stop offset=".45" stopColor="#c6ccd2" />
          <stop offset="1" stopColor="#6f7882" />
        </linearGradient>
        <linearGradient id="ti-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset=".6" stopColor="#a9b1b9" />
          <stop offset="1" stopColor="#5f6871" />
        </linearGradient>
        <linearGradient id="ti-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8af276" />
          <stop offset=".55" stopColor="#44d62c" />
          <stop offset="1" stopColor="#1a7a10" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#ti-sky)" />
      {/* glasfasad i bakgrunden */}
      <g fill="#9fb3c4" opacity=".35">
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={40 + i * 26} y={330} width="16" height="270" />
        ))}
      </g>
      {/* höger volym */}
      <path d="M340 600c20-170 110-290 300-330v330z" fill="url(#ti-a)" />
      {/* mittvolym */}
      <path d="M190 600c-30-180 20-370 160-490 60-50 120-60 160-40-80 50-140 150-150 290-8 100 10 180 30 240z" fill="url(#ti-b)" />
      {/* den gröna volymen — mind (Pantone 802) */}
      <path d="M290 340c30-130 120-225 290-270-75 75-115 170-120 300-55-17-110-27-170-30z" fill="url(#ti-red)" />
      <path d="M300 335c40-120 130-210 270-255" fill="none" stroke="#ffffff" strokeOpacity=".45" strokeWidth="1.2" />
      {/* vänster volym */}
      <path d="M-40 520C40 300 150 180 300 150c-60 90-80 230-40 450H-40z" fill="url(#ti-a)" />
      {/* skarvlinjer */}
      <g fill="none" stroke="#ffffff" strokeOpacity=".6" strokeWidth="1.1">
        {seams('M-40 540C40 330 150 210 290 180', 6, 8, 40)}
        {seams('M350 110c60-50 120-60 160-40', 5, -10, 45)}
        {seams('M360 600c20-150 100-260 280-300', 4, 10, 40)}
      </g>
    </svg>
  );
}
