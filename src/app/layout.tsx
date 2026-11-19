import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { personal } from "@/data/content";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// Only the weights actually used: mono 400/600/700, sans 400.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Browser-tab title leads with the handle; share/OG title stays descriptive.
const tabTitle = `Bitwise — ${personal.name}`;
const shareTitle = `${personal.name} · Backend Engineer`;
const description =
  "IIT Roorkee '27. I build backends and C++ systems, and lately computer vision and ML. Interned at AutoCash.ai in 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitwise-rouge.vercel.app"),
  title: tabTitle,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "Shubh Garg",
    "bitwise",
    "Backend Engineer",
    "Backend Infrastructure",
    "Machine Learning",
    "Computer Vision",
    "Distributed Systems",
    "IIT Roorkee",
    "C++",
    "Order Matching Engine",
  ],
  authors: [{ name: personal.name }],
  // og:image / twitter:image come from app/opengraph-image.tsx
  openGraph: {
    title: shareTitle,
    description,
    type: "website",
    url: "https://bitwise-rouge.vercel.app",
  },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export const viewport: Viewport = {
  themeColor: "#17161d",
  colorScheme: "dark light",
};

// Set the colorscheme before first paint to avoid a flash of the wrong theme.
// Migrates the old 'dark'/'light' stored values to their scheme names.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')t='workstation';if(t==='light')t='paper';var ok=['workstation','paper','gruvbox','catppuccin','nord','rose-pine','tokyonight','kanagawa','everforest'];if(ok.indexOf(t)<0)t='workstation';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','workstation');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="workstation"
      suppressHydrationWarning
      className={`${plexMono.variable} ${plexSans.variable} antialiased`}
    >
      {/* suppress attribute-only mismatches from extensions (Grammarly etc.)
          that mutate <body> before hydration; children are still validated */}
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
