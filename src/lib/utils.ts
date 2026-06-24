/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Codeforces rank tier + display color for a given rating. */
export function cfTier(rating: number): { name: string; color: string } {
  if (rating >= 3000) return { name: "Legendary GM", color: "#ff0000" };
  if (rating >= 2600) return { name: "Int'l GM", color: "#ff0000" };
  if (rating >= 2400) return { name: "Grandmaster", color: "#ff0000" };
  if (rating >= 2300) return { name: "Int'l Master", color: "#ff8c00" };
  if (rating >= 2100) return { name: "Master", color: "#ff8c00" };
  if (rating >= 1900) return { name: "Candidate Master", color: "#aa00aa" };
  if (rating >= 1600) return { name: "Expert", color: "#0000ff" };
  if (rating >= 1400) return { name: "Specialist", color: "#03a89e" };
  if (rating >= 1200) return { name: "Pundit", color: "#008000" };
  return { name: "Newbie", color: "#808080" };
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
