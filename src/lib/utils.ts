/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Codeforces rank tier + display color for a given rating.
 * Colors are CF-inspired but tuned so large text holds >= 3:1 contrast on
 * every scheme surface (light and dark) — canonical CF hexes don't.
 */
export function cfTier(rating: number): { name: string; color: string } {
  if (rating >= 3000) return { name: "Legendary GM", color: "#e84f4f" };
  if (rating >= 2600) return { name: "Int'l GM", color: "#e84f4f" };
  if (rating >= 2400) return { name: "Grandmaster", color: "#e84f4f" };
  if (rating >= 2300) return { name: "Int'l Master", color: "#c9761b" };
  if (rating >= 2100) return { name: "Master", color: "#c9761b" };
  if (rating >= 1900) return { name: "Candidate Master", color: "#b558d6" };
  if (rating >= 1600) return { name: "Expert", color: "#5b7cfa" };
  if (rating >= 1400) return { name: "Specialist", color: "#1d9aa5" };
  if (rating >= 1200) return { name: "Pupil", color: "#2f9646" };
  return { name: "Newbie", color: "#7b868d" };
}

/**
 * Build an SVG polyline `points` string from a numeric series, normalized
 * into the given viewBox with vertical padding.
 */
export function sparklinePoints(
  values: number[],
  width: number,
  height: number,
  pad = 6,
): string {
  if (values.length === 0) return "";
  if (values.length === 1) {
    const y = height / 2;
    return `0,${y} ${width},${y}`;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerH = height - pad * 2;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = pad + innerH - ((v - min) / span) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

// Braille cell layout: dots 1-3 + 7 fill column one top-to-bottom, dots
// 4-6 + 8 fill column two. Masks below are bottom-up fill heights 0..4.
const BRAILLE_COL1 = [0, 0x40, 0x44, 0x46, 0x47];
const BRAILLE_COL2 = [0, 0x80, 0xa0, 0xb0, 0xb8];

/**
 * Render a numeric series as a braille-dot sparkline (the btop/htop trick):
 * two samples per character, four vertical levels, pure themeable text.
 */
export function brailleSparkline(values: number[]): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  // 1..4 so a flat series still draws a baseline
  const level = (v: number) => 1 + Math.round(((v - min) / span) * 3);
  let out = "";
  for (let i = 0; i < values.length; i += 2) {
    const a = level(values[i]);
    const b = i + 1 < values.length ? level(values[i + 1]) : 0;
    out += String.fromCharCode(0x2800 | BRAILLE_COL1[a] | BRAILLE_COL2[b]);
  }
  return out;
}
