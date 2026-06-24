import { personal } from "@/data/content";
import {
  GithubIcon,
  LinkedInIcon,
  CodeforcesIcon,
  LeetCodeIcon,
  MailIcon,
} from "./icons";
import { cn } from "@/lib/utils";

const links = [
  { label: "GitHub", href: personal.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: personal.linkedin, Icon: LinkedInIcon, external: true },
  { label: "Codeforces", href: personal.codeforces, Icon: CodeforcesIcon, external: true },
  { label: "LeetCode", href: personal.leetcode, Icon: LeetCodeIcon, external: true },
  { label: "Email", href: `mailto:${personal.email}`, Icon: MailIcon, external: false },
];

export function SocialLinks({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {links.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--panel)] text-[var(--text-2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--amber)] hover:text-[var(--amber)]"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
