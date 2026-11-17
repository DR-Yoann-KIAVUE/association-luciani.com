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
      className={colore ? "relative flex min-h-[58vh] items-center overflow-hidden text-white" : "border-b border-border bg-muted"}
      style={colore ? { backgroundColor: FONDS[ton] } : undefined}
    >
      {colore && image && (
        <img src={image.src} alt={image.alt} width={2000} height={1131} decoding="async" className="photo-fond" style={{ objectPosition: "center 35%" }} />
      )}
      {colore && <FondVivant ton={ton} />}
      <div className={`relative container mx-auto px-4 text-center ${colore ? "py-16 md:py-20" : "py-14 md:py-20"}`}>
        <div className="mx-auto min-w-0 max-w-3xl" data-cascade>
          {surtitre && (
            <p className={`text-xs font-medium uppercase tracking-[0.18em] ${colore ? "text-white/85" : "text-accent-texte"}`}>
              {surtitre}
            </p>
          )}
          <h1 className={`mt-4 text-4xl md:text-6xl font-semibold leading-[1.06] ${colore ? "" : "text-primary"}`}>
            {titre}
          </h1>
          {texte && (
            <p className={`mx-auto mt-5 max-w-2xl text-lg md:text-xl leading-relaxed ${colore ? "text-white/95" : "text-muted-foreground"}`}>{texte}</p>
          )}
          {children && <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
