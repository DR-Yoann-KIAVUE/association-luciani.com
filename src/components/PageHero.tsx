import type { ReactNode } from "react";
import FondVivant from "@/components/FondVivant";

/** Couleur de fond de chaque ton. « clair » : pages pratiques, sans fond animé. */
const FONDS = { rouge: "hsl(354 51% 59%)", sport: "hsl(196 93% 27%)", marine: "hsl(215 90% 15%)" } as const;

type PageHeroProps = {
  surtitre?: string;
  titre: string;
  texte?: ReactNode;
  ton?: keyof typeof FONDS | "clair";
  /** Photo fondue dans le fond, à droite du texte. */
  image?: { src: string; alt: string };
  children?: ReactNode;
};

/** En-tête commun à toutes les pages : surtitre, titre H1, accroche et actions. */
const PageHero = ({ surtitre, titre, texte, ton = "clair", image, children }: PageHeroProps) => {
  const colore = ton !== "clair";
  return (
    <section
      data-hero
      className={colore ? "relative overflow-hidden text-white" : "border-b border-border bg-muted"}
      style={colore ? { backgroundColor: FONDS[ton] } : undefined}
    >
      {colore && image && <img src={image.src} alt={image.alt} width={2048} height={1152} decoding="async" className="photo-hero" />}
      {colore && <FondVivant ton={ton} />}
      <div className={`relative container mx-auto px-4 ${colore ? "py-20 md:py-28" : "py-14 md:py-20"}`}>
        <div className="min-w-0 max-w-2xl" data-cascade>
          {surtitre && (
            <p className={`text-xs font-medium uppercase tracking-[0.18em] ${colore ? "text-white/85" : "text-accent-texte"}`}>
              {surtitre}
            </p>
          )}
          <h1 className={`mt-4 text-4xl md:text-5xl font-semibold leading-[1.08] ${colore ? "" : "text-primary"}`}>
            {titre}
          </h1>
          {texte && (
            <p className={`mt-5 text-lg leading-relaxed ${colore ? "text-white/95" : "text-muted-foreground"}`}>{texte}</p>
          )}
          {children && <div className="mt-8 flex flex-col sm:flex-row gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
