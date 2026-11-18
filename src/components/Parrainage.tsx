import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Programme de parrainage : on choisit un nombre de filleuls, la récompense se révèle. */

const PALIERS = [
  { filleuls: 1, titre: "30 €", detail: "Carte cadeau chez Décathlon", condition: "Parrainez 1 ami qui devient adhérent payant" },
  { filleuls: 2, titre: "60 €", detail: "Carte cadeau chez Décathlon", condition: "Parrainez 2 amis qui deviennent adhérents payants" },
  { filleuls: 3, titre: "Adhésion remboursée", detail: "Votre année vous est offerte", condition: "Parrainez 3 amis qui deviennent adhérents payants" },
];

const Parrainage = () => {
  const [palier, setPalier] = useState(0);
  const [automatique, setAutomatique] = useState(true);

  // Les paliers défilent seuls tant que le visiteur n'a pas choisi.
  useEffect(() => {
    if (!automatique || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const minuterie = setInterval(() => setPalier((actuel) => (actuel + 1) % PALIERS.length), 3200);
    return () => clearInterval(minuterie);
  }, [automatique]);

  const choisir = (index: number) => {
    setAutomatique(false);
    setPalier(index);
  };
  const actuel = PALIERS[palier];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary text-white shadow-[0_40px_80px_-40px_rgba(4,31,73,0.6)]">
      <span aria-hidden="true" className="absolute -right-20 -top-28 hidden h-56 w-56 rounded-full bg-jaune/90 lg:block" />
      <span aria-hidden="true" className="absolute -bottom-32 -left-20 hidden h-56 w-56 rounded-full bg-accent/70 lg:block" />

      <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-jaune">Parrainage</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Programme de parrainage</h2>
          <p className="mt-4 text-lg text-white/80">Parrainez vos proches et bénéficiez de récompenses exceptionnelles.</p>

          {/* Choix du nombre de filleuls */}
          <div className="mt-8" role="group" aria-label="Nombre de filleuls">
            <div className="flex items-center">
              {PALIERS.map((p, index) => {
                const atteint = index <= palier;
                return (
                  <div key={p.filleuls} className="flex flex-1 items-center last:flex-none">
                    <button
                      type="button"
                      onClick={() => choisir(index)}
                      aria-pressed={index === palier}
                      aria-label={`${p.filleuls} filleul${p.filleuls > 1 ? "s" : ""} : ${p.titre}`}
                      className={`relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,border-color,transform,color] duration-300 hover:scale-110 ${
                        atteint ? "border-jaune bg-jaune text-jaune-foreground" : "border-white/30 bg-white/5 text-white/60"
                      } ${index === palier ? "scale-110" : ""}`}
                    >
                      <UserRound aria-hidden="true" className="h-7 w-7" />
                      <span className="absolute -bottom-7 whitespace-nowrap text-sm font-semibold text-white">
                        {p.filleuls} filleul{p.filleuls > 1 ? "s" : ""}
                      </span>
                    </button>
                    {index < PALIERS.length - 1 && (
                      <span className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                        <span
                          className="block h-full origin-left rounded-full bg-jaune transition-transform duration-500 ease-out"
                          style={{ transform: `scaleX(${index < palier ? 1 : 0})` }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-14 text-sm text-white/65">
            Valable 3 mois après votre inscription, hors offre 1 mois offert. Pour en bénéficier, contactez-nous avec les
            coordonnées de vos filleuls.
          </p>
        </div>

        {/* Récompense */}
        <div className="flex flex-col rounded-2xl bg-white p-6 text-primary md:p-8" aria-live="polite">
          <div key={palier} className="etape-anime flex-1">
            <span className="cadeau-anime inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
              <Gift aria-hidden="true" className="h-7 w-7" />
            </span>
            <p className="mt-5 text-sm font-medium text-muted-foreground">Votre récompense</p>
            <p className={`mt-1 font-semibold leading-tight tracking-tight ${palier === 2 ? "text-4xl" : "text-6xl tabular-nums"}`}>
              {actuel.titre}
            </p>
            <p className="mt-2 text-lg font-medium">{actuel.detail}</p>
            <p className="mt-4 border-t border-border pt-4 text-muted-foreground">{actuel.condition}</p>
          </div>
          <Button asChild variant="cta" size="lg" className="mt-6 w-full">
            <Link to="/contact">
              Parrainer un proche
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Parrainage;
