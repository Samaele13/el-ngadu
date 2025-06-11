import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { AboutSection } from "@/components/landing/AboutSection";
import { FlowSection } from "@/components/landing/FlowSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AboutSection />
        <FlowSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
