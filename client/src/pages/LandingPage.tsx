import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { AboutSection } from "@/components/landing/AboutSection";
import { FlowSection } from "@/components/landing/FlowSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  useEffect(() => {
    const handleNavLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      if (target.tagName === "A" && target.hash) {
        event.preventDefault();

        const targetId = target.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Cari elemen navbar untuk menghitung tingginya
          const navbarElement = document.querySelector("nav");
          const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;

          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight - 20; // 20px offset tambahan

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleNavLinkClick);

    return () => {
      document.removeEventListener("click", handleNavLinkClick);
    };
  }, []);

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
