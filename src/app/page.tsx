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

export default function Home() {
  return (
    <>
      <div className="bg-aura" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
      <BootSequence />
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
      <StatusLine />
    </>
  );
}
