import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero/Hero";
import AboutSection from "../components/sections/AboutSection";
import GaleriPerjalanan from "../components/sections/GaleriPerjalanan";
import KatalogProgram from "../components/sections/KatalogProgram";
import ProcessSection from "../components/sections/ProcessSection";
import ProposalSection from "../components/sections/ProposalSection";
import TestimonialsAndFaq from "../components/sections/TestimonialsAndFaq";
import LanguagePopup from "../components/LanguagePopup";
import SideRails from "../components/SideRails";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grain bg-cream text-primary-800">
      <LanguagePopup />
      <SideRails />
      <Hero />
      <main className="relative z-10">
        <AboutSection />
        <KatalogProgram />
        <ProcessSection />
        <GaleriPerjalanan />
        <ProposalSection />
        <TestimonialsAndFaq />
      </main>
    </div>
  );
}
