import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { personal } from "@/data/content";

export const alt = `${personal.name}: backend and C++ systems, plus CV and ML`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// workstation scheme tokens (keep in sync with globals.css)
const C = {
  bg: "#17161d",
  panel: "#201e29",
  panel2: "#272430",
  inset: "#1b1a22",
  border: "#2f2c3a",
  borderStrong: "#3d3a4b",
  text: "#ece9e2",
  text2: "#b7b2c2",
  muted: "#8a8599",
  amber: "#ffb454",
  coral: "#ff6b6b",
  mint: "#57d9a3",
  indigo: "#8c9aff",
  cyan: "#5cc6dd",
};

const ASKS: [string, number][] = [
  ["100.07", 42],
  ["100.06", 88],
  ["100.05", 30],
];
const BIDS: [string, number][] = [
  ["100.04", 64],
  ["100.03", 100],
  ["100.02", 48],
];

const CHIPS: [string, string][] = [
  ["c++", C.coral],
  ["postgres", C.amber],
  ["redis", C.mint],
  ["linux", C.cyan],
  ["sklearn", C.indigo],
];

function BookRow({ price, pct, side }: { price: string; pct: number; side: "ask" | "bid" }) {
  const color = side === "ask" ? C.coral : C.mint;
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        padding: "6px 14px",
        fontSize: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: `${pct}%`,
          background: color,
          opacity: 0.14,
        }}
      />
      <span style={{ color }}>{price}</span>
      <span style={{ color: C.text2 }}>{Math.round(pct * 31)}</span>
    </div>
  );
}

export default async function Image() {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/IBMPlexMono-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/IBMPlexMono-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
          padding: 44,
          fontFamily: "Plex",
        }}
      >
        {/* window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            background: C.panel,
            border: `2px solid ${C.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* winbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: C.panel2,
              borderBottom: `2px solid ${C.border}`,
              padding: "14px 22px",
            }}
          >
            <span style={{ color: C.amber, fontSize: 22 }}>~/whoami</span>
            <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 18,
                    border: `2px solid ${C.borderStrong}`,
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* body */}
          <div style={{ display: "flex", flex: 1, padding: 40, gap: 44 }}>
            {/* identity */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", fontSize: 26, color: C.text2 }}>
                <span style={{ color: C.amber }}>$&nbsp;</span>
                <span>whoami</span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  fontSize: 76,
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: -2,
                }}
              >
                {personal.name}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 6,
                  fontSize: 26,
                  color: C.muted,
                }}
              >
                aka&nbsp;<span style={{ color: C.amber }}>{personal.codeforcesHandle}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 26,
                  fontSize: 27,
                  color: C.text2,
                }}
              >
                Backend Engineer · Infrastructure &amp; AI Systems
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 21,
                  color: C.muted,
                }}
              >
                IIT Roorkee &#39;27 · backend infra · CV · ML
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
                {CHIPS.map(([label, color]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      color,
                      border: `2px solid ${color}66`,
                      background: `${color}1a`,
                      borderRadius: 8,
                      padding: "4px 16px",
                      fontSize: 21,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* order book */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 320,
                background: C.panel,
                border: `2px solid ${C.border}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: C.panel2,
                  borderBottom: `2px solid ${C.border}`,
                  padding: "10px 14px",
                  fontSize: 18,
                }}
              >
                <span style={{ color: C.coral }}>depth_of_market</span>
                <span style={{ color: C.muted, marginLeft: "auto" }}>L2</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
                {ASKS.map(([p, pct]) => (
                  <BookRow key={p} price={p} pct={pct} side="ask" />
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: C.inset,
                    borderTop: `2px solid ${C.border}`,
                    borderBottom: `2px solid ${C.border}`,
                    padding: "8px 14px",
                    fontSize: 18,
                    margin: "4px 0",
                  }}
                >
                  <span style={{ color: C.amber, fontWeight: 600 }}>
                    2.1M ops/s
                  </span>
                  <span style={{ color: C.cyan }}>p99 2.3µs</span>
                </div>
                {BIDS.map(([p, pct]) => (
                  <BookRow key={p} price={p} pct={pct} side="bid" />
                ))}
              </div>
            </div>
          </div>

          {/* statusline */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderTop: `2px solid ${C.border}`,
              fontSize: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: C.mint,
                color: C.bg,
                fontWeight: 600,
                padding: "10px 20px",
                letterSpacing: 2,
              }}
            >
              NORMAL
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: C.panel2,
                color: C.text2,
                padding: "10px 20px",
              }}
            >
              bitwise@arch:~/portfolio
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                background: C.amber,
                color: C.bg,
                fontWeight: 600,
                padding: "10px 20px",
              }}
            >
              {personal.siteUrl.replace("https://", "")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex", data: regular, weight: 400 as const, style: "normal" as const },
        { name: "Plex", data: semibold, weight: 600 as const, style: "normal" as const },
      ],
    },
  );
}
