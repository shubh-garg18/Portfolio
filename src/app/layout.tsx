import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { personal } from "@/data/content";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Browser-tab title leads with the handle; share/OG title stays descriptive.
const tabTitle = `Bitwise — ${personal.name}`;
const shareTitle = `${personal.name} · Backend Engineer`;
const description =
  "IIT Roorkee '27. Backend engineer focused on low-latency systems, matching engines, and agentic AI. Interning at AutoCash.ai.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shubh-garg18.vercel.app"),
  title: tabTitle,
  description,
  keywords: [
    "Shubh Garg",
    "bitwise",
    "Backend Engineer",
    "Low-latency systems",
    "HFT",
    "IIT Roorkee",
    "C++",
    "Order Matching Engine",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    title: shareTitle,
    description,
    type: "website",
    url: "https://shubh-garg18.vercel.app",
    images: [{ url: personal.avatar, width: 460, height: 460, alt: personal.name }],
  },
  twitter: { card: "summary", title: shareTitle, description, images: [personal.avatar] },
};

// Set the theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${plexMono.variable} ${plexSans.variable} antialiased`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
