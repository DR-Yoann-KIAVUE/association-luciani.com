import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Seo from "./components/Seo";
import BandeauCarteCoeur from "./components/BandeauCarteCoeur";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SportSante from "./pages/SportSante";
import Formations from "./pages/Formations";
import Tarifs from "./pages/Tarifs";
import PackPrevention from "./pages/PackPrevention";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import RGPD from "./pages/RGPD";
import EssaiGratuit from "./pages/EssaiGratuit";
import InscriptionClubPrevention from "./pages/InscriptionClubPrevention";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Révèle les blocs de chaque section quand ils entrent à l'écran (voir index.css). */
function Apparitions() {
  const { pathname } = useLocation();

  useEffect(() => {
    const blocs = document.querySelectorAll<HTMLElement>("section:not([data-hero]) > .container > *:not([data-vu])");
    if (!("IntersectionObserver" in window)) {
      blocs.forEach((bloc) => (bloc.dataset.vu = ""));
      return;
    }
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          // Visible, ou déjà dépassé lors d'un saut vers une ancre.
          if (!entree.isIntersecting && entree.boundingClientRect.bottom > 0) return;
          (entree.target as HTMLElement).dataset.vu = "";
          observateur.unobserve(entree.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    blocs.forEach((bloc) => observateur.observe(bloc));
    return () => observateur.disconnect();
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

/** Le routeur est fourni par main.tsx (navigateur) ou entry-server.tsx (pré-rendu). */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Analytics />
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Apparitions />
      <Seo />
      <BandeauCarteCoeur />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sport-sante" element={<SportSante />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/pack-prevention" element={<PackPrevention />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/rgpd" element={<RGPD />} />
        <Route path="/essai-gratuit" element={<EssaiGratuit />} />
        <Route path="/inscription-club-prevention" element={<InscriptionClubPrevention />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
