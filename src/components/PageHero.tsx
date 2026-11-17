import type { ReactNode } from "react";

type PageHeroProps = {
  surtitre?: string;
  titre: string;
  texte?: ReactNode;
  /** "bordeaux" pour les pages de service, "clair" pour les pages pratiques. */
  ton?: "bordeaux" | "clair";
  children?: ReactNode;
};

/** En-tête commun à toutes les pages : surtitre, titre H1, accroche et actions. */
const PageHero = ({ surtitre, titre, texte, ton = "clair", children }: PageHeroProps) => {
  const bordeaux = ton === "bordeaux";
  return (
    <section
      data-hero
      className={bordeaux ? "relative overflow-hidden text-white" : "border-b border-border bg-muted/60"}
      style={bordeaux ? { background: "linear-gradient(150deg, #A12E3C, #6E172C)" } : undefined}
    >
      {bordeaux && (
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-4 h-32 w-full text-white/10"
        >
          <path
            d="M0 120 H760 l28 -18 l24 18 h60 l22 -92 l30 160 l26 -68 h70 l30 -26 l30 26 H1440"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className="ecg-trace"
          />
        </svg>
      )}
      <div className={`relative container mx-auto px-4 ${bordeaux ? "py-16 md:py-24" : "py-14 md:py-20"}`}>
        <div className="max-w-3xl" data-cascade>
          {surtitre && (
            <p className={`text-xs font-medium uppercase tracking-[0.18em] ${bordeaux ? "text-white/70" : "text-accent"}`}>
              {surtitre}
            </p>
          )}
          <h1 className={`mt-4 text-4xl md:text-5xl font-semibold leading-[1.08] ${bordeaux ? "" : "text-primary"}`}>
            {titre}
          </h1>
          {texte && (
            <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${bordeaux ? "text-white/85" : "text-muted-foreground"}`}>
              {texte}
            </p>
          )}
          {children && <div className="mt-8 flex flex-col sm:flex-row gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
