// ============================================================
// Custom thin-stroke SVG icon set — phosphor terminal aesthetic.
// All icons inherit `currentColor`, 24x24 viewBox, 1.5px stroke.
// ============================================================
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5.4v-3.3c0-.9.1-1.3-.5-1.9 2.6-.3 5.3-1.3 5.3-5.7a4.4 4.4 0 0 0-1.2-3.1 4.1 4.1 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.9 4.5 5.9 4.8 5.9 4.8a4.1 4.1 0 0 0-.1 3.1A4.4 4.4 0 0 0 4.5 11c0 4.4 2.7 5.4 5.3 5.7-.4.4-.5.9-.5 1.6v3.1" />
    </Svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-3.2c0-1 .6-1.8 1.7-1.8s1.8.8 1.8 2v3M11.5 16.5v-6" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

// Codeforces — stylised three-bar mark
export function CodeforcesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="11" width="4" height="9" rx="1" />
      <rect x="10" y="5" width="4" height="15" rx="1" />
      <rect x="17" y="8" width="4" height="12" rx="1" />
    </Svg>
  );
}

// LeetCode — angular bracket node mark
export function LeetCodeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4 6.5 11.5a2 2 0 0 0 0 2.8L13 21" />
      <path d="M8.5 13.5H19" />
      <path d="m16.5 7.5 1.5-1.5" />
    </Svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.2 6.2 0 0 0 10.5 10.5Z" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

// CRT monitor with scanlines
export function CrtIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M6.5 8h11M6.5 11h11M6.5 14h7" />
      <path d="M9 20.5h6" />
    </Svg>
  );
}

export function EnterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 10 5 14l4 4" />
      <path d="M5 14h11a3 3 0 0 0 3-3V6" />
    </Svg>
  );
}
