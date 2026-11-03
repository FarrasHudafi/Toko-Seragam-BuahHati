import type { GarmentType } from "@/data/catalog";

export type ArtView = "depan" | "belakang" | "detail" | "lipat";

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function Shirt({ fill, line, view, collar }: { fill: string; line: string; view: ArtView; collar: boolean }) {
  return (
    <g>
      <path d="M62 34 L82 24 H118 L138 34 L172 62 L154 92 L138 80 V176 H62 V80 L46 92 L28 62 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      {view === "belakang" ? (
        <path d="M82 24 Q100 34 118 24" fill="none" stroke={line} strokeWidth="2" />
      ) : (
        <>
          <path d="M82 24 Q100 52 118 24" fill="none" stroke={line} strokeWidth="2" />
          {collar && <path d="M82 24 L100 46 L90 56 L72 38 M118 24 L100 46 L110 56 L128 38" fill="none" stroke={line} strokeWidth="2" strokeLinejoin="round" />}
          <path d="M100 46 V176" stroke={line} strokeWidth="1.500" strokeDasharray="3 4" />
          {collar && <rect x="112" y="78" width="14" height="16" fill="none" stroke={line} strokeWidth="1.500" />}
        </>
      )}
    </g>
  );
}

function Pants({ fill, line, y = 0, s = 1 }: { fill: string; line: string; y?: number; s?: number }) {
  return (
    <g transform={`translate(${100 - 100 * s} ${y}) scale(${s})`}>
      <path d="M58 24 H142 L150 176 H108 L100 80 L92 176 H50 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M58 36 H142" stroke={line} strokeWidth="1.500" />
    </g>
  );
}

function Skirt({ fill, line }: { fill: string; line: string }) {
  return (
    <g>
      <path d="M62 30 H138 L164 172 H36 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M62 42 H138 M80 42 L68 172 M100 42 V172 M120 42 L132 172" stroke={line} strokeWidth="1.500" fill="none" />
    </g>
  );
}

function Tie({ fill, line }: { fill: string; line: string }) {
  return (
    <g>
      <path d="M88 20 H112 L108 50 L120 160 L100 184 L80 160 L92 50 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M92 50 H108" stroke={line} strokeWidth="1.500" />
    </g>
  );
}

function Cap({ fill, line }: { fill: string; line: string }) {
  return (
    <g>
      <path d="M38 118 C38 66 70 44 104 44 C138 44 164 70 164 118 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 118 H164 C176 118 184 126 182 132 C150 124 70 124 28 132 C26 126 24 118 28 118 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M104 44 V118" stroke={line} strokeWidth="1.500" />
    </g>
  );
}

function Belt({ fill, line }: { fill: string; line: string }) {
  return (
    <g>
      <rect x="20" y="86" width="160" height="26" fill={fill} stroke={line} strokeWidth="2" />
      <rect x="86" y="82" width="28" height="34" fill="none" stroke={line} strokeWidth="2.500" />
      <path d="M130 99 H170" stroke={line} strokeWidth="1.500" strokeDasharray="3 4" />
    </g>
  );
}

function Veil({ fill, line }: { fill: string; line: string }) {
  return (
    <g>
      <path d="M100 18 C50 18 36 70 40 116 C42 150 36 170 30 186 H170 C164 170 158 150 160 116 C164 70 150 18 100 18 Z" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M100 18 C76 34 70 78 76 120 M100 18 C124 34 130 78 124 120" fill="none" stroke={line} strokeWidth="1.500" />
    </g>
  );
}

export default function GarmentArt({
  type,
  color = "#ffffff",
  accent,
  view = "depan",
  className = "",
}: {
  type: GarmentType;
  color?: string;
  accent?: string;
  view?: ArtView;
  className?: string;
}) {
  const dark = luminance(color) < 0.45;
  const line = dark ? "rgba(255,255,255,0.55)" : "rgba(17,24,39,0.45)";
  const outline = luminance(color) > 0.92 ? "rgba(17,24,39,0.45)" : line;
  const transform =
    view === "detail" ? "translate(-90 -30) scale(1.9)" : view === "lipat" ? "translate(16 22) scale(0.84)" : "";

  let body: React.ReactNode;
  switch (type) {
    case "celana": body = <Pants fill={color} line={outline} />; break;
    case "rok": body = <Skirt fill={color} line={outline} />; break;
    case "dasi": body = <Tie fill={color} line={outline} />; break;
    case "topi": body = <Cap fill={color} line={outline} />; break;
    case "sabuk": body = <Belt fill={color} line={outline} />; break;
    case "kerudung": body = <Veil fill={color} line={outline} />; break;
    case "setelan":
      body = (
        <g>
          <g transform="translate(0 10) scale(0.94)"><Pants fill={accent ?? "#c1121f"} line={outline} y={0} s={1} /></g>
          <g transform="translate(38 2) scale(0.62)"><Shirt fill={color} line={outline} view={view} collar /></g>
        </g>
      );
      break;
    case "kaos":
    case "jaket":
      body = <Shirt fill={color} line={outline} view={view} collar={false} />;
      break;
    default:
      body = <Shirt fill={color} line={outline} view={view} collar />;
  }

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Ilustrasi produk, foto produk menyusul" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid meet">
      <rect width="200" height="200" fill="#f3f4f6" />
      <g transform={transform}>{body}</g>
    </svg>
  );
}

