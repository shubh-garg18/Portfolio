import { StatusBar } from "@/components/layout/StatusBar";
import { StatusLine } from "@/components/layout/StatusLine";
import { BootSequence } from "@/components/effects/BootSequence";
import { VimNav } from "@/components/effects/VimNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CPStats } from "@/components/sections/CPStats";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { personal } from "@/data/content";
import pkg from "../../package.json";

// schema.org Person — rich-result food for a page whose job is being found
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  alternateName: personal.alias,
  url: "https://bitwise-rouge.vercel.app",
  image: personal.avatar,
  email: `mailto:${personal.email}`,
  jobTitle: "Backend Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Roorkee",
  },
  knowsAbout: [
    "Backend infrastructure",
    "Distributed systems",
    "Machine learning",
    "Computer vision",
    "Order matching engines",
    "C++",
    "Competitive programming",
  ],
  sameAs: [
    personal.github,
    personal.linkedin,
    personal.codeforces,
    personal.leetcode,
  ],
};

export default function Home() {
  // real build facts, threaded into the chrome
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const nextVersion = pkg.dependencies.next;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* without JS: skip the boot screen and neutralize animation-hidden states */}
      <noscript>
        <style>{`[data-boot]{display:none!important}main [style*="opacity:0"],main [style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div className="bg-aura" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
      <BootSequence nextVersion={nextVersion} />
      <VimNav />
      <StatusBar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <CPStats />
        <Achievements />
        <Contact />
      </main>
      <StatusLine commit={commit} />
    </>
  );
}
