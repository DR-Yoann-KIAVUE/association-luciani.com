import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ADHESIONS, INSCRIPTION } from "@/config/adhesions";

type Adhesion = (typeof ADHESIONS)[number];

/** Fait défiler un nombre de sa valeur précédente à la nouvelle. */
const useCompteur = (cible: number) => {
  const [valeur, setValeur] = useState(cible);
  const precedente = useRef(cible);

  useEffect(() => {
    const depart = precedente.current;
    precedente.current = cible;
    if (depart === cible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValeur(cible);
      return;
    }
    const debut = performance.now();
    let image = 0;
    const avancer = (maintenant: number) => {
      const progression = Math.min((maintenant - debut) / 550, 1);
      const adouci = 1 - Math.pow(1 - progression, 3);
      setValeur(Math.round(depart + (cible - depart) * adouci));
      if (progression < 1) image = requestAnimationFrame(avancer);
    };
    image = requestAnimationFrame(avancer);
    return () => cancelAnimationFrame(image);
  }, [cible]);

  return valeur;
};

/**
 * Carte d'adhésion interactive : elle s'incline vers le pointeur, un reflet
 * suit le mouvement, le prix défile et la jauge montre le rythme hebdomadaire.
 */
const CarteAdhesion = ({ adhesion, annuel, rang }: { adhesion: Adhesion; annuel: boolean; rang: number }) => {
  const carte = useRef<HTMLElement>(null);
  const offre = annuel ? adhesion.annuel : adhesion.mensuel;
  const prix = useCompteur(Number(offre.prix));
  const economie = Number(adhesion.mensuel.prix) * 12 - Number(adhesion.annuel.prix);
  const vedette = "populaire" in adhesion && adhesion.populaire;
  // Nombre de cours par semaine représentés sur la jauge (5 = illimité).
  const cours = [1, 2, 5][rang] ?? 1;

  const incliner = (evenement: PointerEvent<HTMLElement>) => {
    const element = carte.current;
    if (!element || evenement.pointerType !== "mouse") return;
    const cadre = element.getBoundingClientRect();
    const x = (evenement.clientX - cadre.left) / cadre.width;
    const y = (evenement.clientY - cadre.top) / cadre.height;
    element.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    element.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  };
  const redresser = () => {
    const element = carte.current;
    if (!element) return;
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--rx", "0deg");
  };

  return (
    <article
      ref={carte}
      onPointerMove={incliner}
      onPointerLeave={redresser}
      style={{ animationDelay: `${rang * 0.09}s` }}
      className={`carte-tarif group relative flex flex-col rounded-2xl p-7 md:p-8 ${
        vedette ? "carte-tarif-vedette text-white" : "border border-border bg-card"
      }`}
    >
      <span aria-hidden="true" className="carte-tarif-reflet" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm ${vedette ? "text-white/70" : "text-muted-foreground"}`}>Adhésion</p>
          <h3 className={`mt-1 text-2xl font-semibold ${vedette ? "" : "text-primary"}`}>{adhesion.nom}</h3>
        </div>
        {vedette && (
          <p className="rounded bg-jaune px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-jaune-foreground">
            Populaire
          </p>
        )}
      </div>
      <p className={`relative mt-1 ${vedette ? "text-white/80" : "text-muted-foreground"}`}>{adhesion.accroche}</p>

      <p className="relative mt-8 flex items-baseline gap-2">
        <span className={`text-6xl font-semibold tracking-tight tabular-nums ${vedette ? "" : "text-primary"}`}>
          {prix} €
        </span>
        <span className={vedette ? "text-white/70" : "text-muted-foreground"}>/ {annuel ? "an" : "mois"}</span>
      </p>
      <p className={`relative mt-2 min-h-5 text-sm ${vedette ? "text-white/70" : "text-muted-foreground"}`}>
        {annuel ? `Soit ${economie} € de moins que 12 mensualités` : `Soit ${Number(adhesion.mensuel.prix) * 12} € sur 12 mois`}
      </p>

      {/* Jauge du rythme hebdomadaire */}
      <div className="relative mt-7">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 70}ms` }}
              className={`jauge-cours h-1.5 flex-1 rounded-full ${
                i < cours ? (vedette ? "bg-jaune" : "bg-accent") : vedette ? "bg-white/20" : "bg-muted"
              } ${i < cours ? "jauge-pleine" : ""}`}
            />
          ))}
        </div>
        <p className={`mt-3 font-semibold ${vedette ? "" : "text-primary"}`}>{adhesion.rythme}</p>
        <p className={`text-sm ${vedette ? "text-white/70" : "text-muted-foreground"}`}>{adhesion.repere}</p>
      </div>

      <ul className={`relative mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm ${vedette ? "border-white/20" : "border-border"}`}>
        {["Club Prévention inclus", "Réservation en ligne et dans l'application"].map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <Check aria-hidden="true" className={`mt-0.5 h-4 w-4 flex-shrink-0 ${vedette ? "text-white" : "text-accent-texte"}`} />
            {point}
          </li>
        ))}
      </ul>

      <a
        href={`${INSCRIPTION}${offre.plan}`}
        aria-label={`S'inscrire à l'adhésion ${adhesion.nom}`}
        className={`relative mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-base font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.98] ${
          vedette
            ? "bg-jaune text-jaune-foreground hover:bg-jaune/90"
            : "border border-accent-texte text-accent-texte hover:border-accent hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        S'inscrire
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </article>
  );
};

export default CarteAdhesion;
