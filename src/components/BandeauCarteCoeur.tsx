import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LIEN_OFFRIR, aujourdhuiAParis, campagneDuJour } from "@/config/carteCoeur";

const CLE = "bandeau-carte-coeur-ferme";

/** Jour d'aperçu demandé par ?apercu=AAAA-MM-JJ, pour vérifier une campagne à l'avance. */
const jourApercu = (): string | null => {
  const apercu = new URLSearchParams(window.location.search).get("apercu");
  return apercu && /^\d{4}-\d{2}-\d{2}$/.test(apercu) ? apercu : null;
};

const dejaFerme = (id: string): boolean => {
  try {
    return window.sessionStorage.getItem(CLE) === id;
  } catch {
    return false;
  }
};

/** Bandeau saisonnier affiché en haut de toutes les pages pendant une campagne active. */
const BandeauCarteCoeur = () => {
  // Premier rendu identique au pré-rendu ; l'aperçu et la fermeture sont lus une fois la page chargée.
  const [jour, setJour] = useState(aujourdhuiAParis);
  const [ferme, setFerme] = useState(false);
  const campagne = campagneDuJour(jour);

  useEffect(() => {
    const apercu = jourApercu();
    if (apercu) setJour(apercu);
  }, []);

  useEffect(() => {
    if (campagne) setFerme(dejaFerme(campagne.id));
  }, [campagne]);

  if (!campagne || ferme) return null;

  const fermer = () => {
    setFerme(true);
    try {
      window.sessionStorage.setItem(CLE, campagne.id);
    } catch {
      // Stockage indisponible : le bandeau reviendra à la prochaine page.
    }
  };

  return (
    <div
      role="region"
      aria-label="Offre de saison"
      className="relative bg-[#F7ECEE] border-b border-[#E9D3D7] text-[#161616] font-['Geist',sans-serif]"
    >
      <div className="container mx-auto px-12 py-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-center">
        {campagne.image && (
          <picture className="hidden sm:block">
            <source srcSet={campagne.image.webp} type="image/webp" />
            <img src={campagne.image.png} alt={campagne.image.alt} width={900} height={596} className="h-14 w-auto -my-1" />
          </picture>
        )}
        <span className="font-medium">{campagne.message}</span>
        <a
          href={LIEN_OFFRIR}
          className="font-semibold text-[#A12E3C] underline underline-offset-4 hover:no-underline"
        >
          Offrir la Carte Cœur
        </a>
      </div>
      <button
        type="button"
        onClick={fermer}
        aria-label="Fermer le bandeau"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-[#5E5E5E] hover:bg-[#A12E3C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A12E3C]"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default BandeauCarteCoeur;
